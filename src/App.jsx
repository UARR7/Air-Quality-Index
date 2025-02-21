import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AQICard from './components/AQICard';
import DiseaseCards from './components/DiseaseCards';
import PreventionCards from './components/PreventionCards';

const cities = [
  { name: "Coimbatore", lat: 11.0168, lon: 76.9558 },
  { name: "Delhi", lat: 28.6139, lon: 77.2090 },
  { name: "Mumbai", lat: 19.0760, lon: 72.8777 },
  { name: "Bangalore", lat: 12.9716, lon: 77.5946 },
  { name: "Chennai", lat: 13.0827, lon: 80.2707 },
  { name: "Kolkata", lat: 22.5726, lon: 88.3639 },
  { name: "Hyderabad", lat: 17.3850, lon: 78.4867 },
  { name: "Ahmedabad", lat: 23.0225, lon: 72.5714 },
  { name: "Pune", lat: 18.5204, lon: 73.8567 },
  { name: "Jaipur", lat: 26.9124, lon: 75.7873 }
];

function App() {
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    fetchAllCitiesData();
  }, []);

  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      setCurrentCityIndex((prev) => (prev + 1) % cities.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  const fetchAllCitiesData = async () => {
    try {
      const promises = cities.map(async (city) => {
        const response = await fetch(
          `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${city.lat}&longitude=${city.lon}&current=us_aqi,pm10,pm2_5,nitrogen_dioxide,ozone`
        );
        const data = await response.json();
        
        let mainPollutant = "PM2.5";
        const pollutants = {
          "PM2.5": data.current.pm2_5,
          "PM10": data.current.pm10,
          "NO2": data.current.nitrogen_dioxide,
          "O3": data.current.ozone
        };

        // Determine main pollutant based on highest value relative to standard limits
        const pollutantRatios = {
          "PM2.5": pollutants["PM2.5"] / 25, // WHO guideline
          "PM10": pollutants["PM10"] / 50,
          "NO2": pollutants["NO2"] / 40,
          "O3": pollutants["O3"] / 100
        };

        mainPollutant = Object.entries(pollutantRatios)
          .sort(([,a], [,b]) => b - a)[0][0];

        return {
          name: city.name,
          aqi: Math.round(data.current.us_aqi), // Changed to US AQI (global standard)
          mainPollutant
        };
      });

      const results = await Promise.all(promises);
      setCityData(results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching AQI data:", error);
      setLoading(false);
    }
  };

  // Refresh data every 2 minutes
  useEffect(() => {
    const refreshInterval = setInterval(fetchAllCitiesData, 2 * 60 * 1000);
    return () => clearInterval(refreshInterval);
  }, []);

  const currentCity = cityData[currentCityIndex] || { name: "Loading...", aqi: 0, mainPollutant: "..." };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-white">Loading air quality data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: mounted ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text bg-[size:400%] animate-gradient">
          Air Quality Dashboard
        </h1>
        
        <div className="flex items-center justify-center mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCityIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="w-96"
            >
              <AQICard {...currentCity} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <DiseaseCards aqi={currentCity.aqi} />
          <PreventionCards aqi={currentCity.aqi} />
        </div>
      </motion.div>
    </div>
  );
}

export default App;
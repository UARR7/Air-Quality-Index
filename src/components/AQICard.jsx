import { motion } from 'framer-motion';
import { FaWind } from 'react-icons/fa';

const getAQIColor = (aqi) => {
  if (aqi <= 50) return 'bg-green-500';
  if (aqi <= 100) return 'bg-yellow-500';
  if (aqi <= 150) return 'bg-orange-500';
  if (aqi <= 200) return 'bg-red-500';
  return 'bg-purple-500';
};

const AQICard = ({ name, aqi, mainPollutant }) => {
  return (
    <motion.div
      className="p-8 rounded-2xl backdrop-blur-md bg-gradient-to-br from-white/20 to-white/5 shadow-xl"
    >
      <h3 className="text-3xl font-bold mb-6 text-center">{name}</h3>
      <div className="flex flex-col items-center gap-4">
        <div className={`px-6 py-3 rounded-full ${getAQIColor(aqi)} text-white font-bold text-xl`}>
          AQI: {aqi}
        </div>
        <div className="flex items-center gap-3 text-lg">
          <FaWind className="text-2xl text-blue-400" />
          <span>Main Pollutant: {mainPollutant}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default AQICard;
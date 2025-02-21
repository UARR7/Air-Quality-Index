import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const healthData = [
  {
    disease: "Respiratory Infections",
    symptoms: "Coughing, wheezing, shortness of breath",
    prevention: "Use air purifiers, wear masks outdoors"
  },
  {
    disease: "Asthma",
    symptoms: "Difficulty breathing, chest tightness",
    prevention: "Stay indoors during high pollution, regular medication"
  },
  {
    disease: "Cardiovascular Issues",
    symptoms: "Chest pain, irregular heartbeat",
    prevention: "Regular exercise in clean air, healthy diet"
  },
  {
    disease: "Eye Irritation",
    symptoms: "Redness, itching, watering",
    prevention: "Wear protective eyewear, use eye drops"
  }
];

const HealthSlider = () => {
  return (
    <div className="w-full bg-white/5 rounded-xl p-6 backdrop-blur-md">
      <h2 className="text-2xl font-bold mb-6">Health Impacts & Prevention</h2>
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000 }}
        loop={true}
        className="w-full"
      >
        {healthData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-yellow-400">{item.disease}</h3>
              <p className="mt-2"><span className="font-bold">Symptoms:</span> {item.symptoms}</p>
              <p className="mt-2"><span className="font-bold">Prevention:</span> {item.prevention}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HealthSlider;
import { motion } from 'framer-motion';
import { FaMask, FaHome, FaLeaf, FaShieldAlt, FaClock, FaRunning, FaHospital, FaExclamationTriangle } from 'react-icons/fa';

const getPreventionsForAQI = (aqi) => {
  if (aqi <= 50) {
    return [
      {
        title: "Normal Activity",
        description: "Continue regular outdoor activities with normal precautions",
        icon: FaRunning,
        color: "from-green-400 to-green-600"
      },
      {
        title: "Monitor AQI",
        description: "Keep track of air quality changes, especially if sensitive to pollution",
        icon: FaLeaf,
        color: "from-green-400 to-green-600"
      }
    ];
  } else if (aqi <= 100) {
    return [
      {
        title: "Reduce Exposure",
        description: "Consider reducing prolonged outdoor activities if sensitive to pollution",
        icon: FaClock,
        color: "from-yellow-400 to-yellow-600"
      },
      {
        title: "Use Protection",
        description: "Consider wearing masks during peak pollution hours",
        icon: FaMask,
        color: "from-yellow-400 to-yellow-600"
      },
      {
        title: "Ventilation",
        description: "Ensure good indoor ventilation, use air purifiers if available",
        icon: FaLeaf,
        color: "from-yellow-400 to-yellow-600"
      }
    ];
  } else if (aqi <= 150) {
    return [
      {
        title: "Limit Outdoor Activity",
        description: "Avoid prolonged outdoor exposure, especially during peak hours",
        icon: FaHome,
        color: "from-orange-400 to-orange-600"
      },
      {
        title: "Protective Equipment",
        description: "Wear N95 masks when outdoors, use air purifiers indoors",
        icon: FaMask,
        color: "from-orange-400 to-orange-600"
      },
      {
        title: "Medical Attention",
        description: "Keep emergency medication handy if you have respiratory conditions",
        icon: FaHospital,
        color: "from-orange-400 to-orange-600"
      }
    ];
  } else {
    return [
      {
        title: "Emergency Measures",
        description: "Stay indoors, seal windows and doors if possible",
        icon: FaExclamationTriangle,
        color: "from-red-400 to-red-600"
      },
      {
        title: "Medical Preparedness",
        description: "Keep emergency contacts ready, monitor symptoms closely",
        icon: FaHospital,
        color: "from-red-400 to-red-600"
      },
      {
        title: "Air Purification",
        description: "Run air purifiers continuously, maintain clean air zones",
        icon: FaLeaf,
        color: "from-red-400 to-red-600"
      },
      {
        title: "Seek Medical Help",
        description: "Contact healthcare provider if experiencing severe symptoms",
        icon: FaShieldAlt,
        color: "from-red-400 to-red-600"
      }
    ];
  }
};

const PreventionCards = ({ aqi }) => {
  const preventions = getPreventionsForAQI(aqi);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Recommended Actions</h2>
      <div className="grid gap-4">
        {preventions.map((prevention, index) => {
          const Icon = prevention.icon;
          return (
            <motion.div
              key={prevention.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-xl bg-gradient-to-r ${prevention.color} text-white shadow-lg`}
            >
              <div className="flex items-center gap-4">
                <Icon className="text-3xl" />
                <div>
                  <h3 className="text-xl font-bold">{prevention.title}</h3>
                  <p className="mt-2 opacity-90">{prevention.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default PreventionCards;
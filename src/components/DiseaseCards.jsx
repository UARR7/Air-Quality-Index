import { motion } from 'framer-motion';
import { FaLungs, FaHeartbeat, FaEye, FaBrain, FaAllergies, FaChild } from 'react-icons/fa';

const getDiseasesForAQI = (aqi) => {
  if (aqi <= 50) {
    return [
      {
        name: "Mild Allergies",
        symptoms: "Occasional sneezing, mild throat irritation",
        icon: FaAllergies,
        color: "from-green-400 to-green-600",
        severity: "Low Risk"
      }
    ];
  } else if (aqi <= 100) {
    return [
      {
        name: "Respiratory Sensitivity",
        symptoms: "Mild coughing, slight discomfort for sensitive groups",
        icon: FaLungs,
        color: "from-yellow-400 to-yellow-600",
        severity: "Moderate Risk"
      },
      {
        name: "Eye Irritation",
        symptoms: "Mild eye discomfort, occasional watering",
        icon: FaEye,
        color: "from-yellow-400 to-yellow-600",
        severity: "Moderate Risk"
      }
    ];
  } else if (aqi <= 150) {
    return [
      {
        name: "Acute Respiratory Issues",
        symptoms: "Frequent coughing, wheezing in sensitive individuals",
        icon: FaLungs,
        color: "from-orange-400 to-orange-600",
        severity: "High Risk"
      },
      {
        name: "Cardiovascular Strain",
        symptoms: "Increased blood pressure, irregular heartbeat",
        icon: FaHeartbeat,
        color: "from-orange-400 to-orange-600",
        severity: "High Risk"
      },
      {
        name: "Children's Health",
        symptoms: "Reduced lung function, increased asthma attacks",
        icon: FaChild,
        color: "from-orange-400 to-orange-600",
        severity: "High Risk"
      }
    ];
  } else {
    return [
      {
        name: "Severe Respiratory Disease",
        symptoms: "Chronic bronchitis, reduced lung capacity, severe asthma",
        icon: FaLungs,
        color: "from-red-400 to-red-600",
        severity: "Very High Risk"
      },
      {
        name: "Heart Complications",
        symptoms: "Chest pain, palpitations, increased risk of heart attack",
        icon: FaHeartbeat,
        color: "from-red-400 to-red-600",
        severity: "Very High Risk"
      },
      {
        name: "Neurological Effects",
        symptoms: "Severe headaches, dizziness, cognitive impairment",
        icon: FaBrain,
        color: "from-red-400 to-red-600",
        severity: "Very High Risk"
      }
    ];
  }
};

const DiseaseCards = ({ aqi }) => {
  const diseases = getDiseasesForAQI(aqi);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Potential Health Risks</h2>
      <div className="grid gap-4">
        {diseases.map((disease, index) => {
          const Icon = disease.icon;
          return (
            <motion.div
              key={disease.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-xl bg-gradient-to-r ${disease.color} text-white shadow-lg`}
            >
              <div className="flex items-center gap-4">
                <Icon className="text-3xl" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">{disease.name}</h3>
                    <span className="text-sm px-3 py-1 bg-black/20 rounded-full">
                      {disease.severity}
                    </span>
                  </div>
                  <p className="mt-2 opacity-90">{disease.symptoms}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default DiseaseCards;
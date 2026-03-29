import React from "react";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaMoneyBillWave,
  FaGlobe,
  FaStar,
  FaArrowRight,
  FaArrowDown,
} from "react-icons/fa";

const SmartRecommendations = () => {
  const recommendations = [
    {
      icon: <FaGraduationCap size={26} className="text-white" />,
      title: "Merit-Based Matches",
      description:
        "Scholarships matched using GPA, academic performance, and achievements.",
      color: "bg-indigo-500",
      match: 85,
    },
    {
      icon: <FaMoneyBillWave size={26} className="text-white" />,
      title: "Need-Based Opportunities",
      description:
        "Recommendations based on financial background and support needs.",
      color: "bg-emerald-500",
      match: 78,
    },
    {
      icon: <FaGlobe size={26} className="text-white" />,
      title: "International Programs",
      description:
        "Global scholarships aligned with your preferred country and degree.",
      color: "bg-purple-500",
      match: 90,
    },
    {
      icon: <FaStar size={26} className="text-white" />,
      title: "Best Match Score",
      description:
        "Top-ranked scholarships with the highest success probability.",
      color: "bg-amber-500",
      match: 95,
    },
  ];

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-primary text-4xl md:text-5xl font-semibold"><span className="bg-linear-to-r from-pink-500 to-blue-600 bg-clip-text text-transparent">Smart Scholarship Recommendations</span></h2>
          
          <p className='my-3 text-lg md:text-xl text-base-100'>A visual representation of how ScholarStream intelligently matches students with the most relevant scholarships</p>
        </div>

        {/* Timeline */}
        <div className="flex flex-col lg:flex-row lg:justify-between items-center">
          {recommendations.map((item, index) => (
            <React.Fragment key={index}>
              {/* Card */}
              <motion.div
                className="w-full lg:w-1/4 flex flex-col items-center text-center mb-6 lg:mb-0"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-full ${item.color} shadow-xl mb-4`}
                >
                  {item.icon}
                </div>

                <h3 className="text-lg font-semibold text-base-100 mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm mb-4">
                  {item.description}
                </p>

                {/* Progress Bar */}
                <div className="w-full max-w-xs bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-2 bg-blue-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.match}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </div>
                <span className="text-xs font-semibold text-base-100 mt-2">
                  {item.match}% Match
                </span>
              </motion.div>

              {/* Desktop Arrow */}
              {index < recommendations.length - 1 && (
                <motion.div
                  className="hidden lg:flex items-center mx-6 text-blue-500"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <FaArrowRight size={22} />
                </motion.div>
              )}

              {/* Mobile Arrow (DOWN) */}
              {index < recommendations.length - 1 && (
                <motion.div
                  className="flex lg:hidden justify-center my-6 text-blue-500"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <FaArrowDown size={20} />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmartRecommendations;

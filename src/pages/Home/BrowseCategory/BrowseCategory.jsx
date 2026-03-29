import React from "react";
import { motion } from "framer-motion";
import {
  FaUniversity,
  FaUserGraduate,
  FaGlobe,
  FaHandHoldingUsd,
  FaAward,
  FaBriefcase,
} from "react-icons/fa";

const BrowseCategory = () => {
  const categories = [
    {
      title: "Undergraduate",
      description: "Scholarships for diploma and bachelor level students.",
      icon: <FaUserGraduate size={28} />,
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      title: "Postgraduate",
      description: "Opportunities for masters and PhD level studies.",
      icon: <FaUniversity size={28} />,
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      title: "International",
      description: "Study abroad scholarships across global institutions.",
      icon: <FaGlobe size={28} />,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Need-Based",
      description: "Financial assistance based on economic background.",
      icon: <FaHandHoldingUsd size={28} />,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Merit-Based",
      description: "Awards for academic excellence and achievements.",
      icon: <FaAward size={28} />,
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      title: "Professional & Skill-Based",
      description: "Scholarships for career-focused and skill programs.",
      icon: <FaBriefcase size={28} />,
      gradient: "from-red-500 to-rose-500",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.12,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="py-14">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-primary text-4xl md:text-5xl font-semibold"><span className="bg-linear-to-r from-pink-500 to-blue-600 bg-clip-text text-transparent">Browse Scholarships by Category</span></h2>
          
          <p className='my-3 text-lg md:text-xl text-base-100'>Explore scholarships tailored to different academic levels, financial needs, and study destinations</p>
          
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="relative group bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition cursor-pointer overflow-hidden"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={index}
              whileHover={{ y: -10 }}
            >
              {/* Gradient Hover Overlay */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-linear-to-br ${category.gradient}`}
              />

              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Icon Circle */}
                <div
                  className={`w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-linear-to-br ${category.gradient} text-white shadow-lg mb-4 transform group-hover:scale-110 transition duration-300`}
                >
                  {category.icon}
                </div>

                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-white mb-2 transition">
                  {category.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-100 text-sm transition">
                  {category.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseCategory;

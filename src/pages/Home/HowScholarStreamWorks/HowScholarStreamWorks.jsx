import React from "react";
import { motion } from "framer-motion";
import { FaUserGraduate, FaSearch, FaFileUpload, FaChartLine } from "react-icons/fa";

const HowScholarStreamWorks = () => {
  const steps = [
    {
      icon: <FaUserGraduate size={30} className="text-blue-600" />,
      title: "Create Your Profile",
      description:
        "Sign up and complete your student profile with academic details, interests, and preferences to get personalized scholarship recommendations.",
    },
    {
      icon: <FaSearch size={30} className="text-blue-600" />,
      title: "Find Matching Scholarships",
      description:
        "Browse or search scholarships that match your profile, eligibility, and academic goals using smart filters.",
    },
    {
      icon: <FaFileUpload size={30} className="text-blue-600" />,
      title: "Apply Easily",
      description:
        "Submit applications online by uploading required documents such as transcripts, CVs, and personal statements.",
    },
    {
      icon: <FaChartLine size={30} className="text-blue-600" />,
      title: "Track Your Progress",
      description:
        "Monitor application status in real time—from submission to review, shortlisting, and final decision.",
    },
  ];

  const slideInVariants = {
    hiddenLeft: { opacity: 0, x: -50 },
    hiddenRight: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-primary text-4xl md:text-5xl font-semibold"><span className="bg-linear-to-r from-pink-500 to-blue-600 bg-clip-text text-transparent">How ScholarStream Works</span></h2>
          
          <p className='my-3 text-lg md:text-xl text-base-100'>A simple and transparent process designed to help students discover, apply for, and manage scholarships with ease</p>
          
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              className="bg-linear-to-r from-blue-50 to-purple-50 rounded-xl shadow-md p-6 text-center hover:shadow-lg transition"
              initial={index % 2 === 0 ? "hiddenLeft" : "hiddenRight"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideInVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-100">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowScholarStreamWorks;

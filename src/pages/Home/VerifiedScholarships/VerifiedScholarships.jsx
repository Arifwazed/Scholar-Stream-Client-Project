import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaUniversity } from "react-icons/fa";

const VerifiedScholarships = () => {
  const scholarships = [
    {
      title: "Global Excellence Scholarship",
      provider: "University of Melbourne",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
      amount: "$15,000",
      deadline: "30 June 2026",
    },
    {
      title: "STEM Innovators Grant",
      provider: "MIT",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d",
      amount: "$10,000",
      deadline: "15 July 2026",
    },
    {
      title: "Future Leaders Program",
      provider: "Oxford University",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
      amount: "$12,500",
      deadline: "01 August 2026",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.15,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-800">
            Verified Scholarships
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            All listed scholarships are reviewed and verified by ScholarStream
            to ensure authenticity and transparency.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {scholarships.map((item, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden group"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={index}
              whileHover={{ y: -8 }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                {/* Verified Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-medium text-green-600 shadow">
                  <FaCheckCircle />
                  Verified
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {item.title}
                </h3>

                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                  <FaUniversity />
                  {item.provider}
                </div>

                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <span>
                    <strong>Amount:</strong> {item.amount}
                  </span>
                  <span>
                    <strong>Deadline:</strong> {item.deadline}
                  </span>
                </div>

                <button className="w-full py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VerifiedScholarships;

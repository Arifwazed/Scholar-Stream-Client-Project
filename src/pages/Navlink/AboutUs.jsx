import React from "react";
import { motion } from "framer-motion";
import {
  FaBullseye,
  FaLightbulb,
  FaUsers,
  FaShieldAlt,
} from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="pb-20 pt-30 bg-linear-to-tr from-(--color-gradient-start) to-(--color-gradient-end)">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-base-100"><span className="bg-linear-to-r from-pink-500 to-blue-600 bg-clip-text text-transparent">About ScholarStream</span>
          </h2>
          <p className="mt-4 text-base-100 max-w-2xl mx-auto">
            ScholarStream is a scholarship discovery and management platform
            designed to simplify access to verified educational opportunities
            for students worldwide.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-semibold text-base-100 mb-4">
              Who We Are
            </h3>
            <p className="text-base-100 mb-4 leading-relaxed">
              We built ScholarStream with one clear goal: to remove the
              confusion, misinformation, and barriers that students face when
              searching for scholarships. Many talented students miss
              life-changing opportunities simply because they don’t know where
              to look or whom to trust.
            </p>
            <p className="text-base-100 mb-6 leading-relaxed">
              ScholarStream brings verified scholarships, transparent
              application processes, and smart recommendations into one
              easy-to-use platform—so students can focus on their future, not
              paperwork.
            </p>

            <div className="flex items-center gap-3 text-blue-600 font-medium">
              <FaShieldAlt />
              Trusted • Verified • Student-Focused
            </div>
          </motion.div>

          {/* Right: Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Mission */}
            <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl p-6 shadow hover:shadow-lg transition">
              <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <FaBullseye />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Our Mission
              </h4>
              <p className="text-gray-600 text-sm">
                To make scholarships accessible, transparent, and trustworthy
                for every student—regardless of background or location.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl p-6 shadow hover:shadow-lg transition">
              <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <FaLightbulb />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Our Vision
              </h4>
              <p className="text-gray-600 text-sm">
                A world where financial limitations never prevent deserving
                students from pursuing higher education.
              </p>
            </div>

            {/* Community */}
            <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl p-6 shadow hover:shadow-lg transition">
              <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                <FaUsers />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Our Community
              </h4>
              <p className="text-gray-600 text-sm">
                We support students, educators, and institutions by creating a
                connected ecosystem built on trust and opportunity.
              </p>
            </div>

            {/* Security */}
            <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl p-6 shadow hover:shadow-lg transition">
              <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-red-100 text-red-600">
                <FaShieldAlt />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Trust & Security
              </h4>
              <p className="text-gray-600 text-sm">
                Every scholarship goes through a verification process to
                protect students from scams and false information.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="pb-20 pt-30 bg-linear-to-tr from-(--color-gradient-start) to-(--color-gradient-end)">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          
          <h2 className="text-3xl md:text-4xl font-bold text-base-100"><span className="bg-linear-to-r from-pink-500 to-blue-600 bg-clip-text text-transparent">Contact Us</span>
          </h2>
          <p className="mt-4 text-base-100 max-w-2xl mx-auto">
            Have questions, feedback, or partnership inquiries? Our team is
            here to help you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl shadow p-8"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-gray-800">
              Send Us a Message
            </h3>

            <form className="space-y-5">
              <div>
                <label className="text-sm text-gray-600">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full text-gray-800 mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full text-gray-800 mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Message</label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  className="w-full text-gray-800 mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-3 rounded-xl bg-[#4F5CC3] text-white font-semibold hover:bg-blue-700 transition"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Email */}
            <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl shadow p-6 flex gap-4 items-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <FaEnvelope />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Email</h4>
                <p className="text-gray-600 text-sm">
                  support@scholarstream.com
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl shadow p-6 flex gap-4 items-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                <FaPhoneAlt />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Phone</h4>
                <p className="text-gray-600 text-sm">
                  +880 1234 567890
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl shadow p-6 flex gap-4 items-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Location</h4>
                <p className="text-gray-600 text-sm">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>

            {/* Extra Message */}
            <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
              <p className="text-sm text-[#4F5CC3]">
                We usually respond within 24 hours. Your feedback helps us
                improve ScholarStream for students worldwide.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
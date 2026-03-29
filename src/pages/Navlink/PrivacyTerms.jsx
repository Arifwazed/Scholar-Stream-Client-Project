import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUserShield,
  FaFileContract,
  FaLock,
  FaGavel,
} from "react-icons/fa";

const PrivacyTerms = () => {
  const [activeTab, setActiveTab] = useState("privacy");

  return (
    <section className="pb-20 pt-30 bg-linear-to-tr from-(--color-gradient-start) to-(--color-gradient-end)">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-base-100"><span className="bg-linear-to-r from-pink-500 to-blue-600 bg-clip-text text-transparent">Privacy Policy & Terms</span>
          </h2>
          <p className="mt-4 text-base-100 max-w-2xl mx-auto">
            Your privacy and trust matter to us. Learn how ScholarStream
            protects your data and governs platform usage.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab("privacy")}
            className={`px-6 py-2 rounded-full font-medium transition ${
              activeTab === "privacy"
                ? "bg-[#4F5CC3] text-white"
                : "bg-white text-gray-600 shadow"
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab("terms")}
            className={`px-6 py-2 rounded-full font-medium transition ${
              activeTab === "terms"
                ? "bg-[#4F5CC3] text-white"
                : "bg-white text-gray-600 shadow"
            }`}
          >
            Terms of Service
          </button>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl shadow p-8 space-y-8"
        >
          {activeTab === "privacy" && (
            <>
              <Section
                icon={<FaUserShield />}
                title="Information We Collect"
                text="We collect basic profile information such as name, email, academic details, and preferences to personalize scholarship recommendations and improve platform functionality."
              />

              <Section
                icon={<FaLock />}
                title="How We Use Your Data"
                text="Your data is used to match you with relevant scholarships, track applications, and communicate important updates. We never sell your personal information."
              />

              <Section
                icon={<FaUserShield />}
                title="Data Protection"
                text="We implement security measures to protect your data against unauthorized access, alteration, or disclosure. Only authorized personnel can access sensitive information."
              />

              <Section
                icon={<FaGavel />}
                title="Your Rights"
                text="You have the right to access, update, or delete your personal information at any time. You may also request account deletion by contacting our support team."
              />
            </>
          )}

          {activeTab === "terms" && (
            <>
              <Section
                icon={<FaFileContract />}
                title="Platform Usage"
                text="By using ScholarStream, you agree to provide accurate information and use the platform only for lawful educational purposes."
              />

              <Section
                icon={<FaGavel />}
                title="Scholarship Listings"
                text="ScholarStream acts as an information platform. While we verify listings, we are not responsible for final scholarship decisions made by providers."
              />

              <Section
                icon={<FaUserShield />}
                title="Account Responsibility"
                text="Users are responsible for maintaining the confidentiality of their account credentials and any activities conducted under their account."
              />

              <Section
                icon={<FaFileContract />}
                title="Policy Updates"
                text="We may update these terms and policies from time to time. Continued use of the platform indicates acceptance of the updated policies."
              />
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

const Section = ({ icon, title, text }) => (
  <div className="flex gap-4 items-start">
    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-lg">
      {icon}
    </div>
    <div>
      <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
      <p className="text-gray-600 mt-1 leading-relaxed text-sm">{text}</p>
    </div>
  </div>
);

export default PrivacyTerms;

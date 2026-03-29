import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaUserGraduate, FaClock } from "react-icons/fa";
import { Link } from "react-router";

const CallToAction = () => {
  // ⏳ Set deadline (example: 7 days from now)
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 7);

  const calculateTimeLeft = () => {
    const difference = deadline - new Date();
    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000); // update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" />

      {/* Glow */}
      {/* <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/20 rounded-full blur-3xl" /> */}
      {/* <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/20 rounded-full blur-3xl" /> */}

      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div
          className="border bg-linear-to-br from-indigo-500 to-purple-500 border-base-200/40  rounded-3xl p-10 md:p-14 text-center text-white shadow-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Icon */}
          <motion.div
            className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-white/20"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <FaUserGraduate size={28} />
          </motion.div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Take the Next Step Toward Your Future
          </h2>

          {/* Description */}
          <p className="text-blue-100 max-w-2xl mx-auto mb-6">
            Discover verified scholarships and apply with confidence. Thousands
            of opportunities are waiting for you on ScholarStream.
          </p>

          {/* Countdown */}
          {timeLeft && (
            <motion.div
              className="flex justify-center items-center gap-2 mb-8 text-sm bg-white/15 rounded-full px-5 py-2 w-fit mx-auto"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaClock />
              <span>
                Applications closing in{" "}
                <strong>
                  {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
                </strong>
              </span>
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-white text-blue-700 font-semibold hover:bg-gray-100 transition"
              >
                Get Started Free
                <FaArrowRight />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/allScholarships"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl border border-white/40 text-white hover:bg-white/10 transition"
              >
                Browse Scholarships
              </Link>
            </motion.div>
          </div>

          {/* Trust Line */}
          <p className="mt-6 text-xs text-blue-100">
            100% free • Verified opportunities • Secure applications
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;

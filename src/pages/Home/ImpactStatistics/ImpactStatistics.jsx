import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaUserGraduate,
  FaAward,
  FaUniversity,
  FaGlobe,
} from "react-icons/fa";

/* CountUp */
const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const start = useRef(null);

  useEffect(() => {
    let raf;
    const animate = (t) => {
      if (!start.current) start.current = t;
      const progress = Math.min((t - start.current) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
};

const ImpactStatistics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [activeCountry, setActiveCountry] = useState(null);

  /* Country Points */
  const points = {
    USA: { x: 24, y: 38 },
    UK: { x: 45, y: 30 },
    Germany: { x: 50, y: 32 },
    India: { x: 60, y: 45 },
    Bangladesh: { x: 63, y: 48 },
    Australia: { x: 78, y: 65 },
  };

  /* Connections */
  const connections = [
    ["USA", "UK"],
    ["UK", "India"],
    ["Germany", "Bangladesh"],
    ["India", "Australia"],
  ];

  const stats = [
    { icon: <FaUserGraduate />, value: 25000, label: "Students Helped" },
    { icon: <FaAward />, value: 3500, label: "Scholarships Listed" },
    { icon: <FaUniversity />, value: 800, label: "Partner Institutions" },
    { icon: <FaGlobe />, value: 60, label: "Countries Reached" },
  ];

  /* Arc Path Generator */
  const arcPath = (p1, p2) => {
    const mx = (p1.x + p2.x) / 2;
    const my = Math.min(p1.y, p2.y) - 12;
    return `M ${p1.x}% ${p1.y}% Q ${mx}% ${my}% ${p2.x}% ${p2.y}%`;
  };

  return (
    <section className="relative py-12 overflow-hidden text-white">
      {/* World Map */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-10 "
        style={{
          backgroundImage:
            "url(https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg)",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 " />

      {/* SVG Connections */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {connections.map(([from, to], index) => {
          const path = arcPath(points[from], points[to]);
          return (
            <g key={index}>
              {/* Arc */}
              <motion.path
                d={path}
                fill="none"
                stroke="rgba(56,189,248,0.6)"
                strokeWidth="0.3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2,
                  delay: index * 0.6,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />

              {/* Moving Particle */}
              <motion.circle
                r="0.5"
                fill="#67e8f9"
                animate={{
                  offsetDistance: ["0%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.5,
                }}
                style={{
                  offsetPath: `path("${path}")`,
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Clickable Country Dots */}
      <div className="absolute inset-0">
        {Object.entries(points).map(([name, p]) => (
          <motion.button
            key={name}
            className="absolute w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-cyan-300 focus:outline-none"
            style={{ top: `${p.y}%`, left: `${p.x}%` }}
            onClick={() =>
              setActiveCountry(activeCountry === name ? null : name)
            }
            animate={{
              scale: [1, 1.6, 1],
              boxShadow: [
                "0 0 0 rgba(34,211,238,0)",
                "0 0 20px rgba(34,211,238,1)",
                "0 0 0 rgba(34,211,238,0)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            {/* Tooltip */}
            {activeCountry === name && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-gray-800 text-xs px-3 py-1 rounded-full shadow">
                {name}
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <div ref={ref} className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-primary text-4xl md:text-5xl font-semibold">
            <span className="bg-linear-to-r from-pink-500 to-blue-600 bg-clip-text text-transparent">Our Global Impact</span>
          </h2>
          <p className="my-3 text-lg md:text-xl text-base-100">
            Real-time connections between students and institutions worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="backdrop-blur-md rounded-2xl p-8 text-center border bg-base-100/40 border-base-200/40"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-white/20 text-xl">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold mb-1">
                {isInView && <CountUp end={stat.value} />}+
              </h3>
              <p className="text-blue-100 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStatistics;

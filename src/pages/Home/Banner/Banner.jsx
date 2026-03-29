import React, { useEffect, useState} from 'react';
import heroImg from '../../../assets/hero3.png'
import heroImg1 from '../../../assets/banner2.png'
import heroImg2 from '../../../assets/banner3.png'
import { ReactTyped } from 'react-typed';
import { AnimatePresence, motion } from "framer-motion";
import { Link } from 'react-router';

const images = [
  heroImg,
  heroImg1,
  heroImg2
];

const Banner = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % images.length);
        }, 4000); // change image every 4s

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='pt-24 flex flex-col md:flex-row p-5 md:px-16 items-center'>
            {/* Animated Background Circles */}
            <motion.div
                className="absolute w-15 h-15 bg-blue-400/30 rounded-full blur-xs top-40 left-10"
                animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.8, 0.4],
                y: [0, -20, 0]
                }}
                transition={{ duration: 6, repeat: Infinity }}
            />

            {/* 🟣 Circle 2 */}
            <motion.div
                className="absolute w-15 h-15 bg-purple-400 rounded-full blur-xs bottom-1/3 right-20"
                animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.7, 0.3],
                x: [0, 20, 0]
                }}
                transition={{ duration: 7, repeat: Infinity }}
            />

            {/* 🔴 Circle 3 */}
            <motion.div
                className="absolute w-15 h-15 bg-pink-400 rounded-full blur-xs top-1/2 left-1/3"
                animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 5, repeat: Infinity }}
            />

            {/* 🟢 Circle 4 */}
            <motion.div
                className="absolute w-15 h-15 bg-indigo-400 rounded-full blur-xs top-1/5 right-1/3"
                animate={{
                scale: [1, 1.25, 1],
                opacity: [0.2, 0.6, 0.2],
                y: [0, 15, 0]
                }}
                transition={{ duration: 8, repeat: Infinity }}
            />

            <div className='flex-2 space-y-7'>
                <h1 className="font-semibold text-3xl md:text-5xl max-w-180">
                    <ReactTyped
                        strings={[
                        "Unlock Your Future with Global",
                        "Unlock Your Future with Global <span class='bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>Scholarship Opportunities</span>"
                        ]}
                        typeSpeed={30}
                        backSpeed={50}
                        loop
                    />
                </h1>

                <p className=' md:text-xl max-w-180'>
                    <ReactTyped
                        strings={[
                            "Discover top scholarship programs from around the world. Explore, apply, and take the next step toward your academic success—all in one place."
                        ]}
                        typeSpeed={40}
                        backSpeed={30}
                        loop
                    />
                    
                    </p>
                <Link to="/allScholarships" className="btn md:w-90 h-12 bg-[#4F5CC3] hover:bg-gray-200 hover:text-primary text-white text-lg border-none shadow-none rounded-2xl">Search Scholarship</Link>
            </div>

            <AnimatePresence mode="wait">
                <motion.img
                key={images[index]}
                src={images[index]}
                className="h-140 flex-1 "
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0, y: [0, -15, 0] }}
                exit={{ opacity: 0, x: -100 }}
                transition={{
                    duration: 1,
                    y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                    }
                }}
                />
            </AnimatePresence>

            {/* <motion.img
                src={heroImg}
                alt="Scholarship"
                className=" h-140 flex-1 "
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: [0, -15, 0] }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            /> */}
            {/* <img src={heroImg} className='h-140 flex-1 ' alt="" /> */}
        </div>
    );
};

export default Banner;
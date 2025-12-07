import React from 'react';
import heroImg from '../../../assets/hero3.png'

const Banner = () => {
    return (
        <div className='border-2 flex flex-col md:flex-row p-5 md:px-16 bg-[#B1BFE8] items-center'>
            <div className='flex-2 space-y-7'>
                <h1 className='font-semibold text-3xl md:text-5xl max-w-180'>Unlock Your Future with Global <span className='text-[#4F5CC3]'>Scholarship Opportunities</span></h1>
                <p className=' md:text-xl max-w-180'>Discover top scholarship programs from around the world. Explore, apply, and take the next step toward your academic success—all in one place.</p>
                <a className="btn md:w-90 h-12 bg-primary hover:bg-gray-200 hover:text-primary text-white text-lg border-none shadow-none rounded-2xl">Search Scholarship</a>
            </div>
            <img src={heroImg} className='h-140 flex-1 ' alt="" />
        </div>
    );
};

export default Banner;
import React from 'react';
import { useLoaderData } from 'react-router';
import AllScholarshipsCard from './AllScholarshipsCard';

const AllScholarships = () => {
    const scholarships = useLoaderData();
    console.log("from all scholarship: ", scholarships)
    return (
        <div className='bg-[#e7f4ff] py-10'>
            <div className='text-center mb-8'>
                <h2 className="text-primary text-4xl  font-semibold">Featured Scholarships</h2>
                <p className='my-3 text-lg text-gray-600'>Explore top scholarship opportunities selected to help you achieve your academic goals.</p>
            </div>
            {/* card section */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mx-5 md:mx-10'>
                {
                    scholarships.map((scholarship,index) =>
                        <AllScholarshipsCard key={index} scholarship={scholarship}></AllScholarshipsCard>
                    )
                }
            </div>
        </div>
    );
};

export default AllScholarships;
import React from 'react';
import { useLoaderData } from 'react-router';
import AllScholarshipsCard from './AllScholarshipsCard';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading/Loading';

const AllScholarships = () => {
    const scholarships = useLoaderData();
    const axiosSecure = useAxiosSecure()

    const {data : allScholarship = [],isLoading} = useQuery({
        queryKey: ['allScholarship'],
        queryFn: async () => {
            const res = await axiosSecure.get('/scholarships');
            return res.data;
        }
    })
    if(isLoading){
        <Loading></Loading>
    }
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
                    allScholarship.map((scholarship,index) =>
                        <AllScholarshipsCard key={index} scholarship={scholarship}></AllScholarshipsCard>
                    )
                }
            </div>
        </div>
    );
};

export default AllScholarships;
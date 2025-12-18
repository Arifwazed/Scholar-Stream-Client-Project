import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading/Loading';
import AllScholarshipsCard from '../../AllScholarships/AllScholarshipsCard';

const TopScholarships = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allScholarship = [], isLoading, isError } = useQuery({
        queryKey: ['topScholarships'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/scholarships`);
            return res.data;
        },
    });

    if (isLoading) return <Loading />;
    if (isError) return <p className='text-center text-red-500 py-10'>Failed to load scholarships</p>;

    // sort by lowest fee first, then latest
    const topSix = [...allScholarship]
    .sort((a, b) => {
        const feeA = Number(a.applicationFees) || 0;
        const feeB = Number(b.applicationFees) || 0;

        if (feeA === feeB) {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }

        return feeA - feeB;
    })
    .slice(0, 6);


    return (
        <div className='bg-[#e7f4ff] py-12'>
            <div className='text-center mb-8'>
                <h2 className="text-primary text-4xl md:text-5xl font-semibold">Top Scholarships</h2>
                <p className='my-3 text-lg md:text-xl text-gray-600'>Explore top scholarship opportunities selected to help you achieve your academic goals.</p>
            </div>

            {/* card section */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mx-5 md:mx-10'>
                {topSix.map((scholarship, index) => (
                    <AllScholarshipsCard key={index} scholarship={scholarship} />
                ))}
            </div>
        </div>
    );
};

export default TopScholarships;

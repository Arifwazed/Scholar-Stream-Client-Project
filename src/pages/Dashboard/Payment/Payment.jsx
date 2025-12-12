import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Payment = () => {
    const {scholarshipId} = useParams();
    const axiosSecure = useAxiosSecure()

    const {data : payScholarship = []} = useQuery({
        queryKey: ['payScholarship',scholarshipId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/scholarships/${scholarshipId}`)
            return res.data;
        }
    })
    return (
        <div>
            <h1 className="text-4xl font-semibold text-center">Please Payment: <span className='text-blue-600'>{scholarshipId}</span> </h1>
            <h1 className="text-4xl text-center">Scholarship Name: {payScholarship.scholarshipName}</h1>
        </div>
    );
};

export default Payment;
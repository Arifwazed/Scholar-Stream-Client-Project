import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const Payment = () => {
    const {scholarshipId} = useParams();
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const {data : payScholarship = []} = useQuery({
        queryKey: ['payScholarship',scholarshipId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/scholarships/${scholarshipId}`)
            return res.data;
        }
    })

    console.log('from payment, id:',scholarshipId)
    console.log('from payment, user:',user.email)


    const handlePayment = async () => {
        const paymentInfo = {
            scholarshipName : payScholarship.scholarshipName,
            cost : payScholarship.applicationFees,
            userEmail: user.email,
            scholarshipId: payScholarship._id
        }
        // const res = await axiosSecure.post('/create-checkout-session',paymentInfo);
        const res = await axiosSecure.post('/create-checkout-session',paymentInfo)
        console.log('Payment Info:',paymentInfo)
        console.log('Payment Info:',res.data.url)
        window.location.href = res.data.url;
    }
    return (
        <div>
            <h1 className="text-4xl font-semibold text-center">Please Payment: <span className='text-blue-600'>{scholarshipId}</span> </h1>
            <h1 className="text-4xl text-center">Scholarship Name: {payScholarship.scholarshipName}</h1>
            <button onClick={handlePayment} className='btn btn-primary'>Pay Now</button>
        </div>
    );
};

export default Payment;
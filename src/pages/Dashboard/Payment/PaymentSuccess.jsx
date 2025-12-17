import React, { useEffect, useState } from 'react';
import bgSuccess from '../../../assets/bg-success.jpg'
import icon from '../../../assets/check.png'
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [paymentInfo,setPaymentInfo] = useState(null);
    const axiosSecure = useAxiosSecure()
    console.log('sessionId: ',sessionId);

    useEffect(()=>{
        if(sessionId){
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
            .then(res => {
                const info = {
                    scholarshipName: res.data.scholarshipName,
                    universityName: res.data.universityName,
                    paid: res.data.cost,
                    transactionId: res.data.transaction_Id,
                    date: res.data.date
                }
                setPaymentInfo(info
                //     {
                //     // scholarshipName: res.data.scholarshipName,
                //     // universityName: res.data.universityName,
                //     // paid: res.data.cost,
                //     // transactionId: res.data.transaction_Id,
                //     // date: res.data.date
                // }
            );
                console.log(info);
            })
        }
    },[sessionId,axiosSecure,paymentInfo])

    return (
        <div>
            
            <div className='flex flex-col items-center py-5 rounded-t-2xl bg-cover bg-center' style={{backgroundImage: `url(${bgSuccess})`}}>
                <img src={icon} className='h-30 w-30' alt="" />
                <h1 className="text-3xl font-semibold text-white my-3">Payment SuccessFul</h1>
            </div>
            <div className='bg-linear-to-r from-blue-50 to-purple-50 rounded-b-2xl shadow p-5 space-y-2'>
                <h2 className="text-2xl text-center font-semibold">Payment Details</h2>
                <div className='flex justify-between'>
                    <p className='text-gray-700'>Scholarship Name:</p>
                    <p className='font-semibold'>{paymentInfo?.scholarshipName}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-gray-700'>University Name:</p>
                    <p className='font-semibold'>{paymentInfo?.universityName}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-gray-700'>Amount Paid:</p>
                    <p className='font-semibold text-blue-600'>{paymentInfo?.paid}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-gray-700'>Transaction ID:</p>
                    <p className='font-semibold'>{paymentInfo?.transactionId}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-gray-700'>Transaction Date:</p>
                    <p className='font-semibold'>{paymentInfo?.date}</p>
                </div>
            </div>

            {/* <Link to='' className='px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-blue-700 text-lg shadow-lg hover:shadow-xl'>Go to My Applications</Link> */}

            <div className="mt-6 text-center">
                <Link to='/dashboard/my-applications'>
                    <button className="px-8 py-3 bg-primary text-white hover:text-primary border-2 border-primary rounded-full font-semibold hover:bg-white transition text-lg shadow-lg hover:shadow-xl">
                    Go to My Applications
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;
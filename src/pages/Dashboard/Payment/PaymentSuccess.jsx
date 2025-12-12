import React from 'react';
import bgSuccess from '../../../assets/bg-success.jpg'
import icon from '../../../assets/check.png'
import { Link } from 'react-router';

const PaymentSuccess = () => {
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
                    <p className='font-semibold'>Du</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-gray-700'>University Name:</p>
                    <p className='font-semibold'>Du</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-gray-700'>Amount Paid:</p>
                    <p className='font-semibold'>100</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-gray-700'>Transaction ID:</p>
                    <p className='font-semibold'>100</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-gray-700'>Transaction Date:</p>
                    <p className='font-semibold'>100</p>
                </div>
            </div>

            {/* <Link to='' className='px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-blue-700 text-lg shadow-lg hover:shadow-xl'>Go to My Applications</Link> */}

            <div className="mt-6 text-center">
                <Link to=''>
                    <button className="px-8 py-3 bg-primary text-white hover:text-primary border-2 border-primary rounded-full font-semibold hover:bg-white transition text-lg shadow-lg hover:shadow-xl">
                    Go to My Applications
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;
"use client";
import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import { Eye, MessageSquarePlus, RefreshCcw, XCircle } from 'lucide-react';
import { FaEdit } from 'react-icons/fa';
import { MdPaid } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const MyApplications = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const [selectedApplication,setSelectedApplication] = useState(null);
    const {register: registerEdit,handleSubmit: handleEditSubmit,reset: resetEdit} = useForm();
    const {register: registerReview,handleSubmit: handleReviewSubmit,reset: resetReview} = useForm();
    const {data : myApplications = [],refetch} = useQuery({
        queryKey: ['myApplications'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications?email=${user.email}`)
            return res.data;
        }
    })
    // console.log("user info:",user)
    const handleEdit =async (data) => {
        console.log("from edit:",data)
        console.log("from edit id:",selectedApplication);
        await axiosSecure.patch(`/applications/${selectedApplication._id}`,data)
        .then(res => {
            console.log(res.data)
            if(res.data.modifiedCount){
                refetch()
                Swal.fire({
                    title: "Added Successfully!",
                    text: ``,
                    icon: "success"
                });
            }
        })
        resetEdit(); 
        document.getElementById("editModal").close();
    }

    // const handlePayment = async (application) => {
    //     // trackingId,applicationId
    //     console.log("Pay button clicked", application);
    // const paymentInfo = {
    //     scholarshipName : application.scholarshipName,
    //     universityName : application.universityName,
    //     cost : application.applicationFees,
    //     userEmail: user.email,
    //     scholarshipId: application.scholarshipId,
    //     applicationId: application._id,
    //     trackingId: application.trackingId
    // }
    // // const res = await axiosSecure.post('/create-checkout-session',paymentInfo);
    // console.log('Payment Info:',paymentInfo)
    // const res = await axiosSecure.post('/create-checkout-session',paymentInfo)
    // // console.log('After Payment Info:',res.data.url)
    // if (res.data?.url) {
    //     window.location.assign(res.data.url);
    // }
    // }

    const handlePayment = async (application) => {
        try {
            console.log("Pay clicked", application);

            const paymentInfo = {
            scholarshipName: application.scholarshipName,
            universityName: application.universityName,
            cost: application.applicationFees,
            userEmail: user.email,
            scholarshipId: application.scholarshipId,
            applicationId: application._id,
            trackingId: application.trackingId,
            };
            console.log("Pay Info", paymentInfo);

            const res = await axiosSecure.post(
            "/create-checkout-session",
            paymentInfo
            );

            console.log("Checkout response:", res.data);

            if (res.data?.url) {
            window.location.assign(res.data.url);
            } else {
            console.error("Stripe URL missing");
            }
        } catch (err) {
            console.error("Payment failed:", err);
        }
    };

    const handleRemoveApplication = (application) => {
        console.log('from handle remove',application)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
            }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/applications/${application._id}`)
                .then(res => {
                    // console.log(res.data)
                    if(res.data.deletedCount){
                        refetch()
                        Swal.fire({
                            title: `Application has been deleted!`,
                            icon: "success"
                        });
                    }
                })
                
            }
        });
    }

    console.log("from review application:",selectedApplication);

    const handleReview = async(data) => {
        console.log("from review:",data)
        // console.log("from edit id:",selectedApplication);
        data.scholarshipId = selectedApplication.scholarshipId;
        data.scholarshipName = selectedApplication.scholarshipName;
        data.universityName = selectedApplication.universityName;
        data.userName = user.displayName;
        data.userEmail = user.email;
        data.userImage = user.photoURL;
        data.reviewDate = new Date();
        await axiosSecure.post('/reviews',data).then((res) => {
            console.log('after add scholarship:',res.data)
            if(res.data.insertedId){
                Swal.fire({
                    // position: "top-end",
                    icon: "success",
                    title: "Review SuccessFully Added",
                    showConfirmButton: false,
                    timer: 1500
                });
            } 
        })
        resetReview(); 
        document.getElementById("reviewModal").close();
    }



    return (
        <div className="p-4 space-y-8">
            {/* <h1 className="text-4xl text-center mb-5">My Application: {myApplications.length}</h1> */}
            <h1 className="text-3xl md:text-4xl font-bold text-center "><span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">My Application: {myApplications.length}</span></h1>
            {/*---- table ----*/}
            <div className="overflow-x-auto rounded-box border border-base-content/5">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>University Name</th>
                        <th>University Address</th>
                        <th>Feedback</th>
                        <th>Subject Category</th>
                        <th>Application Fees</th>
                        <th>Application Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        myApplications.map((application,index)=> 
                        <tr key={index+1}>
                            <th>{index+1}</th>
                            <td>{application.universityName}</td>
                            <td>{application?.universityCountry}</td>
                            <td>{application.feedback}</td>
                            <td>{application.subjectCategory}</td>
                            <td>{application.applicationFees}</td>
                            <td>{application.applicationStatus}</td>
                            
                            <td className="flex items-center gap-2">
                                {/* Details */}
                                <button
                                    className="btn btn-sm bg-gray-300 text-gray-700 hover:bg-gray-400 flex items-center gap-1 tooltip"
                                    data-tip="View Details"
                                    onClick={()=> {
                                        setSelectedApplication(application);
                                        document.getElementById('detailsModal').showModal()}
                                    }
                                >
                                    <Eye className="w-4 h-4" />
                                    <span className="hidden lg:inline">Details</span>
                                </button>

                                {/* Edit */}
                                <button
                                    className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-1 tooltip"
                                    data-tip="Edit"
                                    onClick={()=> {
                                        setSelectedApplication(application);
                                        document.getElementById('editModal').showModal()}
                                    }
                                >
                                    <FaEdit className="w-4 h-4" />
                                    <span className="hidden lg:inline">Edit</span>
                                </button>

                                {/* Pay  */}
                                {
                                    application.paymentStatus === 'unpaid' && <button
                                    onClick={() => handlePayment(application)}
                                    className={`btn btn-sm bg-green-500 text-white hover:bg-green-600 flex items-center gap-1 tooltip`}
                                    type="button"
                                    data-tip="Pay Now"
                                >
                                    <MdPaid className="w-4 h-4" />
                                    <span className="hidden lg:inline">Pay</span>
                                </button>
                                }
                                

                                {/* Cancel */}
                                {
                                    (application.applicationStatus === 'pending' || application.applicationStatus === 'draft')  && 
                                    <button
                                        onClick={()=> handleRemoveApplication(application)}
                                        className={`btn btn-sm bg-red-500 text-white hover:bg-red-600 tooltip`}
                                        data-tip="Cancel Application"
                                    >
                                        <XCircle className="w-4 h-4" />
                                        <span className="hidden lg:inline">Delete</span>
                                    </button>
                                }

                                {/* Review */}
                                {
                                    application.applicationStatus === 'completed' && 
                                    <button
                                        className={`btn btn-sm bg-green-500 text-white hover:bg-green-600 tooltip ${application.applicationStatus === 'rejected'  && "btn-disabled "}`}
                                        data-tip="Add Review"
                                        onClick={()=> {
                                            setSelectedApplication(application);
                                            document.getElementById('reviewModal').showModal()}
                                        }
                                    >
                                        
                                        <MessageSquarePlus className="w-4 h-4"/>
                                        <span className="hidden lg:inline">Review</span>
                                    </button>
                                }
                                
                                
                            </td>

                        
                        </tr>)
                    }
                    
                    </tbody>
                </table>

                {/* for Edit modal */}
                <dialog id="editModal" className="modal modal-bottom sm:modal-middle ">
                    <div className="modal-box">
                        <h3 className="font-semibold text-lg mb-2">Add Contact Info & Note</h3>
                        <form onSubmit={handleEditSubmit(handleEdit)} className='w-full'>
                            <div>
                                <label className="label text-sm my-1">
                                <span className="">Phone Number</span>
                                </label>
                                <input
                                {...registerEdit("phone", { required: true })}
                                type="tel"
                                name="phone"
                                defaultValue={selectedApplication?.phone || ""}
                                placeholder="e.g. 01XXXXXXXXX"
                                className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="label text-sm my-1">
                                    <span className="label-text">Note to Admin</span>
                                </label>
                                <textarea {...registerEdit("userNote", { required: true })} className="textarea h-24 w-full" placeholder="Write any message or additional information..."></textarea>
                            </div>
                            
                            <div className='modal-action flex justify-between mt-4'>
                                <button type='submit' className="btn bg-primary text-white">Submit</button>
                                <button type='button' className="btn bg-red-500 text-white"
                                    onClick={() => {
                                        resetEdit();
                                        document.getElementById("editModal").close();
                                    }}
                                >Close</button>
                            </div>
                        </form>

                    </div>
                </dialog>

                {/* for details modal */}
                <dialog id="detailsModal" className="modal modal-middle">
                    <div className="modal-box max-w-4xl p-0 rounded-2xl">

                        {/* Header */}
                        <div className="flex justify-between items-center px-6 py-4 border-b bg-linear-to-r from-blue-500 to-indigo-500 text-white rounded-t-2xl">
                        <h3 className="text-xl font-bold">Application Details</h3>
                        <button
                            onClick={() => document.getElementById("detailsModal").close()}
                            className="btn btn-sm btn-circle btn-ghost text-white"
                        >
                            ✕
                        </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Applicant Info */}
                        <div className="bg-base-100 rounded-xl shadow p-5 space-y-3">
                            <h4 className="text-lg font-semibold border-b pb-2">👤 Applicant Information</h4>

                            <div className="flex justify-between">
                            <span className="text-gray-500">Name:</span>
                            <span className="font-medium">{selectedApplication?.userName}</span>
                            </div>

                            <div className="flex justify-between">
                            <span className="text-gray-500">Email:</span>
                            <span className="font-medium">{selectedApplication?.userEmail}</span>
                            </div>

                            <div className="flex justify-between">
                            <span className="text-gray-500">Phone:</span>
                            <span className="font-medium">{selectedApplication?.phone || 'not added'}</span>
                            </div>

                            
                            <div className="flex justify-between">
                            <span className="text-gray-500">Application Status:</span>
                            <span className={`badge ${selectedApplication?.applicationStatus === "pending" ? "badge-warning" : "badge-info"} badge-sm`}>
                                {selectedApplication?.applicationStatus}
                            </span>
                            </div>

                            <div className="flex justify-between">
                            <span className="text-gray-500">Payment Status:</span>
                            <span className={`badge ${selectedApplication?.paymentStatus === "paid" ? "badge-success" : "badge-error"} badge-sm`}>
                                {selectedApplication?.paymentStatus}
                            </span>
                            </div>
                        </div>

                        {/* Scholarship Info */}
                        <div className="bg-base-100 rounded-xl shadow p-5 space-y-3">
                            <h4 className="text-lg font-semibold border-b pb-2">🎓 Scholarship Information</h4>

                            <div className="flex justify-between">
                            <span className="text-gray-500">University:</span>
                            <span className="font-medium">{selectedApplication?.universityName}</span>
                            </div>

                            <div className="flex justify-between">
                            <span className="text-gray-500">Category:</span>
                            <span className="font-medium">{selectedApplication?.scholarshipCategory}</span>
                            </div>

                            <div className="flex justify-between">
                            <span className="text-gray-500">Degree:</span>
                            <span className="font-medium">{selectedApplication?.degree}</span>
                            </div>

                            <div className="flex justify-between">
                            <span className="text-gray-500">Application Fee:</span>
                            <span className="font-medium">${selectedApplication?.applicationFees}</span>
                            </div>

                            <div className="flex justify-between">
                            <span className="text-gray-500">Service Charge:</span>
                            <span className="font-medium">${selectedApplication?.serviceCharge}</span>
                            </div>
                        </div>
                        </div>

                        {/* Footer */}
                        <div className="modal-action px-6 py-4 border-t bg-gray-50 rounded-b-2xl">
                        <button
                            onClick={() => document.getElementById("detailsModal").close()}
                            className="btn btn-outline btn-primary w-full md:w-auto"
                        >
                            Close
                        </button>
                        </div>
                    </div>
                </dialog>
                
                {/* for review modal */}
                <dialog id="reviewModal" className="modal modal-bottom sm:modal-middle ">
                    <div className="modal-box">
                        <h3 className="font-semibold text-lg mb-2">Add Review</h3>
                        <form onSubmit={handleReviewSubmit(handleReview)} className='w-full'>
                            <div>
                                <label className="label text-sm my-1">
                                <span className="">Rating</span>
                                </label>
                                <input
                                {...registerReview("ratingPoint", { required: true })}
                                type="number"
                                placeholder="any 1 to 5"
                                className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="label text-sm my-1">
                                    <span className="label-text">Comment</span>
                                </label>
                                <textarea {...registerReview("reviewComment", { required: true })} className="textarea h-24 w-full" placeholder="Write any message or additional information..."></textarea>
                            </div>
                            
                            <div className='modal-action flex justify-between mt-4'>
                                <button type='submit' className="btn bg-primary text-white">Submit</button>
                                <button type='button' className="btn bg-red-500 text-white"
                                    onClick={() => {
                                        resetReview();
                                        document.getElementById("reviewModal").close();
                                    }}
                                >Close</button>
                            </div>
                        </form>
                    </div>
                </dialog>
                
            </div>
        </div>
    );
};

export default MyApplications;
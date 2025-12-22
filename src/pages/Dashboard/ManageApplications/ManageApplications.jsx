import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrashAlt, FaUserCheck, FaUserTimes } from 'react-icons/fa';
import { Eye, MessageSquare, RefreshCcw, XCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const ManageApplications = () => {
    const axiosSecure = useAxiosSecure();
    const {register,handleSubmit,reset} = useForm();
    const [selectedApplicationId,setSelectedApplicationId] = useState(null);
    const [selectedApplication,setSelectedApplication] = useState(null);
    const {data : applications = [],refetch} = useQuery({
        queryKey: ['applications'],
        queryFn: async () => {
            const res = await axiosSecure.get('/applications')
            return res.data;
        }
    })

    const handleFeedback = (data) => {
        console.log("from feedback:",data)
        console.log("from feedback id:",selectedApplicationId);
        axiosSecure.patch(`/applications/${selectedApplicationId}`,data)
        .then(res => {
            console.log(res.data)
            if(res.data.modifiedCount){
                refetch()
                Swal.fire({
                    title: "Successful!",
                    text: ``,
                    icon: "success"
                });
            }
        })
        reset(); 
        document.getElementById("feedbackModal").close();
    }

    const handleStatusUpdate = (info) => {
        // const id = info._id;
        // const status = info.applicationStatus;
        const newStatus = {applicationStatus : 'pending'} ;

        // console.log('from status:',id);
        if(info.applicationStatus === 'pending'){
            newStatus.applicationStatus = 'processing';
        }
        else{
            newStatus.applicationStatus = 'completed';
        }
        
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, change to ${newStatus.applicationStatus}!`
        }).then((result) => {
            if(result.isConfirmed) {
                axiosSecure.patch(`/applications/${info._id}`,newStatus)
                .then(res => {
                    // console.log(res.data)
                    if(res.data.modifiedCount){
                        refetch()
                        Swal.fire({
                            title: "Status Updated!",
                            text: `${info.userName}'s status has been changed to ${newStatus.applicationStatus}`,
                            icon: "success"
                        });
                    }
                })           
            }
        })
        .catch(err => {
        Swal.fire({
            title: "Update Failed",
            text: "There was an error updating the status. Please try again.",
            icon: "error"
            });
        });
    }

    const handleRemoveApplication = (info) => {
        const newStatus = {applicationStatus : 'rejected'} ;
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, change to ${newStatus.applicationStatus}!`
        }).then((result) => {
            if(result.isConfirmed) {
                axiosSecure.patch(`/applications/${info._id}`,newStatus)
                .then(res => {
                    // console.log(res.data)
                    if(res.data.modifiedCount){
                        refetch()
                        Swal.fire({
                            title: "Status Updated!",
                            text: `${info.userName}'s status has been changed to ${newStatus.applicationStatus}`,
                            icon: "success"
                        });
                    }
                })           
            }
        })
    } 
    
    console.log('selectedApplication',selectedApplication)
    return (
        <div className="p-3 space-y-10">
            {/* <h1 className="text-4xl text-center mb-5">Manage Application: {applications.length}</h1> */}
            <h1 className="text-3xl md:text-4xl font-bold text-center "><span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Manage Application: {applications.length}</span></h1>
            {/*---- table ----*/}
            <div className="overflow-x-auto rounded-box border border-base-content/5">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Applicant Name</th>
                        <th>Applicant Email</th>
                        <th>University Name</th>
                        <th>Application Feedback</th>
                        <th>Application Status</th>
                        <th>Payment Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        applications.map((application,index)=> 
                        <tr key={index+1}>
                            <th>{index+1}</th>
                            <td>{application.userName}</td>
                            <td>{application.userEmail}</td>
                            <td>{application.universityName}</td>
                            <td>{application.feedback}</td>
                            <td>{application.applicationStatus}</td>
                            <td>{application.paymentStatus}</td>
                            
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

                                {/* Feedback */}
                                <button
                                    className="btn btn-sm bg-green-500 text-white hover:bg-green-600 flex items-center gap-1 tooltip"
                                    data-tip="Give Feedback"
                                    onClick={()=> {
                                        setSelectedApplicationId(application._id);
                                        document.getElementById('feedbackModal').showModal()}
                                    }
                                >
                                    <MessageSquare className="w-4 h-4" />
                                    <span className="hidden lg:inline">Feedback</span>
                                </button>

                                {/* Status Update */}
                                {
                                    application.paymentStatus === 'paid' && <button
                                    onClick={() => handleStatusUpdate(application)}
                                    className={`btn btn-sm bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-1 tooltip
                                    ${(application.applicationStatus === 'completed' ||
                                    application.applicationStatus === 'rejected') &&
                                    "btn-disabled bg-blue-800 cursor-not-allowed"
                                    }`}

                                    data-tip="Update Status"
                                >
                                    <RefreshCcw className="w-4 h-4" />
                                    <span className="hidden lg:inline">Status</span>
                                </button>
                                }
                                

                                {/* Cancel */}
                                
                                <button
                                    onClick={()=> handleRemoveApplication(application)}
                                    className={`btn btn-sm bg-red-500 text-white hover:bg-red-600 tooltip ${application.applicationStatus === 'rejected'  && "btn-disabled "}`}
                                    data-tip="Cancel Application"
                                >
                                    <XCircle className="w-4 h-4" />
                                    <span className="hidden lg:inline">Cancel</span>
                                </button>
                            </td>


                            {/* <td className='flex gap-2'>
                                <>
                                    <button className="btn btn-ghost btn-sm flex items-center gap-1 tooltip"><Eye className="w-4 h-4"/>
                                    <span className="hidden lg:inline">Details</span>
                                    </button>
                                    <button
                                    className={`btn bg-green-400  `}><MessageSquare/>Feedback</button>
                                    <button  
                                    className={`btn bg-blue-400 `}><RefreshCcw  />Status Update</button > 
                                    <button className='btn bg-red-400'><XCircle className="w-5 h-5" /></button > 
                                    {/* <button onClick={()=>handleMakePromote(user)} 
                                    className={`btn bg-green-400 mr-2 ${user.role === 'admin' && "btn-disabled"}`}><FaUserCheck /></button>
                                    <button onClick={()=>handleMakeDemote(user)} 
                                    className={`btn bg-blue-400 ${user.role === 'user' && "btn-disabled"}`}><FaUserTimes /></button >
                                 </> 
                             </td>  */}
                            
                        
                        </tr>)
                    }
                    
                    </tbody>
                </table>

                {/* for feedback modal */}
                <dialog id="feedbackModal" className="modal modal-bottom sm:modal-middle ">
                    <div className="modal-box">
                        <h3 className="font-semibold text-lg mb-2">Write the Feedback</h3>
                        <form onSubmit={handleSubmit(handleFeedback)} className='w-full'>
                            <div>
                                <textarea {...register("feedback", { required: true })} className="textarea h-32 w-full" placeholder="Write your feedback..."></textarea>
                                
                            </div>
                            
                            <div className='modal-action flex justify-between mt-4'>
                                <button type='submit' className="btn bg-primary text-white">Submit</button>
                                <button type='button' className="btn bg-red-500 text-white"
                                    onClick={() => {
                                        reset();
                                        document.getElementById("feedbackModal").close();
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

            </div>
        </div>
    );
};

export default ManageApplications;
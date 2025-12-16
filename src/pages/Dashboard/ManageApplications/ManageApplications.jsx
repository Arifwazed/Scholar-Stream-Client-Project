import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrashAlt, FaUserCheck, FaUserTimes } from 'react-icons/fa';
import { Eye, MessageSquare, RefreshCcw, XCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

const ManageApplications = () => {
    const axiosSecure = useAxiosSecure();
    const {register,handleSubmit,reset} = useForm();
    const {data : applications = []} = useQuery({
        queryKey: ['applications'],
        queryFn: async () => {
            const res = await axiosSecure.get('/applications')
            return res.data;
        }
    })

    const handleFeedback = (data) => {
        console.log("from feedback:",data.feedback)

        
        reset();
        document.getElementById("feedbackModal").close();
    }
    return (
        <div>
            <h1 className="text-4xl text-center mb-5">Manage Application: {applications.length}</h1>
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
                        <tr>
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
                                >
                                    <Eye className="w-4 h-4" />
                                    <span className="hidden lg:inline">Details</span>
                                </button>

                                {/* Feedback */}
                                <button
                                    className="btn btn-sm bg-green-500 text-white hover:bg-green-600 flex items-center gap-1 tooltip"
                                    data-tip="Give Feedback"
                                    onClick={()=>document.getElementById('feedbackModal').showModal()}
                                >
                                    <MessageSquare className="w-4 h-4" />
                                    <span className="hidden lg:inline">Feedback</span>
                                </button>

                                {/* Status Update */}
                                <button
                                    className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-1 tooltip"
                                    data-tip="Update Status"
                                >
                                    <RefreshCcw className="w-4 h-4" />
                                    <span className="hidden lg:inline">Status</span>
                                </button>

                                {/* Cancel */}
                                <button
                                    className="btn btn-sm bg-red-500 text-white hover:bg-red-600 tooltip"
                                    data-tip="Cancel Application"
                                >
                                    <XCircle className="w-4 h-4" />
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

            </div>
        </div>
    );
};

export default ManageApplications;
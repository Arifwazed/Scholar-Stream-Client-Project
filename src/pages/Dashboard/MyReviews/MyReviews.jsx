import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { MessageSquarePlus } from 'lucide-react';
import { useForm } from 'react-hook-form';

const MyReviews = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const [selectedReview,setReview] = useState(null);
    const {register: registerReview,handleSubmit: handleReviewSubmit,reset: resetReview} = useForm();
    const {data : myReviews = [],refetch} = useQuery({
        queryKey: ['myReviews'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews?email=${user.email}`)
            return res.data;
        }
    });

    const handleRemoveReview = (review) => {
        console.log('from handle remove',review)
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
                axiosSecure.delete(`/reviews/${review._id}`)
                .then(res => {
                    // console.log(res.data)
                    if(res.data.deletedCount){
                        refetch()
                        Swal.fire({
                            title: `Review has been deleted!`,
                            icon: "success"
                        });
                    }
                })
                
            }
        });
    }

    const handleReview = async(data) => {
        console.log("from review:",data)
        // console.log("from edit id:",selectedApplication);
        data.reviewDate = new Date();
        await axiosSecure.patch(`/reviews/${selectedReview._id}`,data).then((res) => {
            console.log('after add scholarship:',res.data)
            if(res.data.modifiedCount){
                refetch()
                Swal.fire({
                    // position: "top-end",
                    icon: "success",
                    title: "Review SuccessFully Updated",
                    showConfirmButton: false,
                    timer: 1500
                });
            } 
        })
        resetReview(); 
        document.getElementById("reviewModal").close();
    }

    return (
        <div>
            <h1 className="text-4xl text-center mb-5">My Reviews: </h1>
            <div className="overflow-x-auto rounded-box border border-base-content/5">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Scholarship Name</th>
                        <th>University Name</th>
                        {/* <th>User Name</th> */}
                        <th>Review Comment</th>
                        <th>Review Date</th>
                        <th>Rating</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        myReviews.map((review,index)=> 
                        <tr key={index+1}>
                            <th>{index+1}</th>
                            <td>{review.scholarshipName}</td>
                            <td>{review.universityName}</td>
                            {/* <td>{review.userName}</td> */}
                            <td>{review.reviewComment}</td>
                            <td>{review.reviewDate}</td>
                            <td>{review.ratingPoint}</td>
                            
                            <td className="flex items-center gap-2">
                                

                                {/* Feedback */}
                                {/* <button
                                    className="btn btn-sm bg-green-500 text-white hover:bg-green-600 flex items-center gap-1 tooltip"
                                    data-tip="Give Feedback"
                                    onClick={()=> {
                                        setSelectedreviewId(review._id);
                                        document.getElementById('feedbackModal').showModal()}
                                    }
                                >
                                    <MessageSquare className="w-4 h-4" />
                                    <span className="hidden lg:inline">Feedback</span>
                                </button> */}

                                {/* Review */} 
                                <button
                                    className={`btn btn-sm bg-blue-500 text-white hover:bg-blue-600 tooltip`}
                                    data-tip="Edit Review"
                                    onClick={()=> {
                                        setReview(review);
                                        document.getElementById('reviewModal').showModal()}
                                    }
                                >
                                    
                                    <MessageSquarePlus className="w-4 h-4"/>
                                    <span className="hidden lg:inline">Edit Review</span>
                                </button>
                                

                                {/* Delete */}
                                
                                <button
                                    onClick={()=> handleRemoveReview(review)}
                                    className={`btn btn-sm bg-red-500 text-white hover:bg-red-600 tooltip ${review.reviewStatus === 'rejected'  && "btn-disabled "}`}
                                    data-tip="Cancel review"
                                >
                                    <FaTrashAlt className="w-4 h-4" />
                                    <span className="hidden lg:inline">Delete</span>
                                </button>
                            </td>   
                        
                        </tr>)
                    }
                    
                    </tbody>
                </table>
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
                                defaultValue={selectedReview?.ratingPoint || ""}
                                className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="label text-sm my-1">
                                    <span className="label-text">Comment</span>
                                </label>
                                <textarea {...registerReview("reviewComment", { required: true })} className="textarea h-24 w-full" 
                                defaultValue={selectedReview?.reviewComment || ""}
                                placeholder="Write any message or additional information...">
                                
                                </textarea>
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

export default MyReviews;
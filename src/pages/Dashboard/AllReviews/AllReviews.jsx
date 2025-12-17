import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllReviews = () => {
    const axiosSecure = useAxiosSecure();
    const {data : allReviews = [],refetch} = useQuery({
        queryKey: ['allReviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reviews')
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

    return (
        <div>
            <h1 className="text-4xl text-center mb-5">All Reviews: {allReviews.length}</h1>
            <div className="overflow-x-auto rounded-box border border-base-content/5">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Scholarship Name</th>
                        <th>University Name</th>
                        <th>User Name</th>
                        <th>Review Comment</th>
                        <th>Review Date</th>
                        <th>Rating</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        allReviews.map((review,index)=> 
                        <tr key={index+1}>
                            <th>{index+1}</th>
                            <td>{review.scholarshipName}</td>
                            <td>{review.universityName}</td>
                            <td>{review.userName}</td>
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
            </div>
        </div>
    );
};

export default AllReviews;
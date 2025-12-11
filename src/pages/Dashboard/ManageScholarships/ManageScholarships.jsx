import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrashAlt, FaUserShield } from 'react-icons/fa';
import { RiEdit2Fill } from 'react-icons/ri';
import Swal from 'sweetalert2';

const ManageScholarships = () => {
    const axiosSecure = useAxiosSecure();
    const {data : allScholarship = [],refetch} = useQuery({
        queryKey: ['allScholarship'],
        queryFn: async () => {
            const res = await axiosSecure.get('/scholarships');
            return res.data;
        }
    })

    const handleRemoveScholarship = id => {
        console.log('delete id:',id)
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
                axiosSecure.delete(`/scholarships/${id}`)
                .then(res => {
                    // console.log(res.data)
                    if(res.data.deletedCount){
                        refetch()
                        Swal.fire({
                            title: "Scholarship has been deleted! ",
                            icon: "success"
                        });
                    }
                })
                
            }
        });
    }
    return (
        <div>
            <h1 className="text-4xl text-center">Manage Scholarships: {allScholarship.length}</h1>
            {/* search */}
            {/* <p className='my-2'>search input: {searchText}</p> */}
            <div className=' text-center'>

                <label className="input my-3 md:w-lg">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                        >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input onChange={(e)=>setSearchText(e.target.value)} type="search" className="grow" placeholder="Search" />
                    
                </label>
            </div>
            {/* table */}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Scholarship Name</th>
                        <th>University</th>
                        <th>Category</th>
                        <th>Degree</th>
                        <th>Email</th>
                        <th>Admin Action</th>
                        {/* <th>Other Action</th> */}
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        allScholarship.map((scholarship,index)=> 
                        <tr>
                        <th>{index+1}</th>
                        {/* <td>
                        <div className="flex items-center gap-3">
                            <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                                <img
                                src={scholarship.photoURL}
                                alt="Avatar Tailwind CSS Component" />
                            </div>
                            </div>
                            <div>
                            <div className="font-bold">{user.displayName}</div>
                            </div>
                        </div>
                        </td> */}
                        <td>{scholarship.scholarshipName}</td>
                        <td>{scholarship.universityName}</td>
                        <td>{scholarship.scholarshipCategory}</td>
                        <td>{scholarship.degree}</td>
                        <td>{scholarship.postedUserEmail}</td>
                        <td>
                            <div className='flex flex-row'>

                            <button onClick={()=>handleEditScholarship(user)} className='btn bg-green-400 mr-3'>Edit <RiEdit2Fill /> </button>
                            <button onClick={()=>handleRemoveScholarship(scholarship._id)} className='btn bg-red-400'> Remove<FaTrashAlt /> </button >
                            </div>

                            {/* {
                                scholarship.role === 'admin' ? 
                                <button onClick={()=>handleEditScholarship(user)} className='btn bg-red-400'> Remove<FaTrashAlt /> </button > : 
                                <button onClick={()=>handleRemoveScholarship(user)} className='btn bg-green-400'>edit <RiEdit2Fill /> </button>
                            } */}
                        </td>
                        <th>
                        {/* <button className="btn btn-ghost btn-xs">details</button> */}
                        </th>
                        </tr>)
                    }
                    
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageScholarships;
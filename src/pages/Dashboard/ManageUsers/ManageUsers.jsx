import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt, FaUserCheck, FaUserShield, FaUserTimes } from 'react-icons/fa';
import { FiShieldOff } from "react-icons/fi";
import Swal from 'sweetalert2';
import Loading from '../../../components/Loading/Loading';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [roleFilter, setRoleFilter] = useState("");

    const {data : users = [],refetch,isLoading } = useQuery({
        queryKey: ['allUsers',roleFilter],
        queryFn: async () => {
            const res = await axiosSecure.get('/users',{
                params: roleFilter ? { role: roleFilter } : {}
            });
            return res.data;
        }
    })

    const handleMakePromote = (user) => {
        console.log('from handle promote:',user);
        const newRole = {role : 'Student'} ;
        if(user.role === 'Student'){
            newRole.role = 'Moderator';
        }
        else{
            newRole.role = 'Admin';
        }
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, make ${newRole.role}!`
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${user._id}/role`,newRole)
                .then(res => {
                    // console.log(res.data)
                    if(res.data.modifiedCount){
                        refetch()
                        Swal.fire({
                            title: "Promoted!",
                            text: `${user.name} promoted to ${newRole.role}`,
                            icon: "success"
                        });
                    }
                })           
            }
        });
    }

    const handleMakeDemote = (user) => {
        console.log('from handle demote:',user);
        const newRole = {role : 'Moderator'} ;
        if(user.role === 'Moderator'){
            newRole.role = 'Student';
        }
        else{
            newRole.role = 'Moderator';
        }
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, make ${newRole.role}!`
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${user._id}`,newRole)
                .then(res => {
                    // console.log(res.data)
                    if(res.data.modifiedCount){
                        refetch()
                        Swal.fire({
                            title: "Demoted!",
                            text: `${user.name} demoted to ${newRole.role}`,
                            icon: "success"
                        });
                    }
                })           
            }
        });
    }

    const handleRemoveUser = (user) => {
        console.log('from handle remove',user)
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
                axiosSecure.delete(`/users/${user._id}`)
                .then(res => {
                    // console.log(res.data)
                    if(res.data.deletedCount){
                        refetch()
                        Swal.fire({
                            title: `${user.name} has been deleted!`,
                            icon: "success"
                        });
                    }
                })
                
            }
        });
    }

    return (
        <div className="p-4 space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-center "> <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Manage Users: {users.length}</span></h1>
            {/*---- search ----*/}
            {/* <p className='my-2'>search input: {searchText}</p> */}
            <div className='flex justify-between items-center gap-2'>
                <label className="input my-3">
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
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="select select-bordered w-52"
                    >
                    <option value="">All Roles</option>
                    <option value="Student">Student</option>
                    <option value="Moderator">Moderator</option>
                    <option value="Admin">Admin</option>
                </select>

            </div>


            {
                isLoading && <Loading></Loading>
            }
            {/*---- table ----*/}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Admin Action</th>
                        <th>Other Action</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.map((user,index)=> 
                        <tr>
                        <th>{index+1}</th>
                        <td>
                        <div className="flex items-center gap-3">
                            <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                                <img
                                src={user.photoURL}
                                alt="Avatar Tailwind CSS Component" />
                            </div>
                            </div>
                            <div>
                            <div className="font-bold">{user.name}</div>
                            </div>
                        </div>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td className='flex'>
                            <>
                                <button onClick={()=>handleMakePromote(user)} 
                                className={`btn bg-green-400 mr-2 ${user.role === 'Admin' && "btn-disabled"}`}><FaUserCheck /></button>
                                <button onClick={()=>handleMakeDemote(user)} 
                                className={`btn bg-blue-400 ${user.role === 'Student' && "btn-disabled"}`}><FaUserTimes /></button > 
                            </>
                        </td>
                        <th className=''>
                            <button onClick={()=>handleRemoveUser(user)} className='btn bg-red-400'><FaTrashAlt /></button > 
                        </th>
                        </tr>)
                    }
                    
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
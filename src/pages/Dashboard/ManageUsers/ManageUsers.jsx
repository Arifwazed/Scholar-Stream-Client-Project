import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt, FaUserCheck, FaUserShield, FaUserTimes } from 'react-icons/fa';
import { FiShieldOff } from "react-icons/fi";
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const {data : users = [],refetch} = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleMakePromote = (user) => {
        console.log('from handle promote:',user);
        const newRole = {role : 'user'} ;
        if(user.role === 'user'){
            newRole.role = 'moderator';
        }
        else{
            newRole.role = 'admin';
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
        const newRole = {role : 'moderator'} ;
        if(user.role === 'moderator'){
            newRole.role = 'user';
        }
        else{
            newRole.role = 'moderator';
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
        <div>
            <h1 className="text-4xl text-center">Manage Users: {users.length}</h1>
            {/*---- search ----*/}
            {/* <p className='my-2'>search input: {searchText}</p> */}
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
                                className={`btn bg-green-400 mr-2 ${user.role === 'admin' && "btn-disabled"}`}><FaUserCheck /></button>
                                <button onClick={()=>handleMakeDemote(user)} 
                                className={`btn bg-blue-400 ${user.role === 'user' && "btn-disabled"}`}><FaUserTimes /></button > 
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
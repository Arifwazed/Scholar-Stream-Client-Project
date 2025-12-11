import React from 'react';

const ManageScholarships = () => {
    return (
        <div>
            <h1 className="text-4xl text-center">Manage Scholarships</h1>
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
                        <th>User</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Admin Action</th>
                        <th>Other Action</th>
                        <th></th>
                    </tr>
                    </thead>
                    {/* <tbody>
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
                            <div className="font-bold">{user.displayName}</div>
                            </div>
                        </div>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                            {
                                user.role === 'admin' ? <button onClick={()=>handleRemoveAdmin(user)} className='btn bg-red-400'><FiShieldOff /></button > : <button onClick={()=>handleMakeAdmin(user)} className='btn bg-green-400'><FaUserShield /></button>
                            }
                        </td>
                        <th>
                        <button className="btn btn-ghost btn-xs">details</button>
                        </th>
                        </tr>)
                    }
                    
                    </tbody> */}
                </table>
            </div>
        </div>
    );
};

export default ManageScholarships;
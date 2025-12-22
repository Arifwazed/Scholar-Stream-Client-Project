import React from 'react';
import { FaHospitalUser, FaUserCircle } from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router';
import Logo from '../components/Logo/Logo';
import logoImg from '../assets/logo3.png'
import { MdAssignmentAdd, MdContactMail, MdMarkEmailRead, MdOutlineRateReview, MdRuleFolder } from 'react-icons/md';
import { RiFolderChartFill } from 'react-icons/ri';
import { LuFolderSync } from 'react-icons/lu';
import { PiChartLineUpFill } from 'react-icons/pi';
import { ClipboardList, FileText, Send } from 'lucide-react';
import { GoCodeReview } from "react-icons/go";
import useRole from '../hooks/useRole';
import useAuth from '../hooks/useAuth';

const DashboardLayout = () => {
    const {role} = useRole();
    const {user} = useAuth()
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Navbar */}
                    <nav className="navbar w-full bg-[#4F5CC3] text-white ">
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square bg-[#4F5CC3] border-none shadow-none">
                            {/* Sidebar toggle icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4 "><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                        </label>

                        <div className=" p-2 ">
                            <h1 className="text-2xl font-bold">Welcome Back, {user.displayName}!</h1>
                            <p className="mt-1 text-slate-300">
                            Here is your daily overview. Check Your  
                            <span className="font-semibold text-yellow-400"> applications and reviews.</span>
                            
                            </p>
                        </div>
                    </nav>
                    {/* Page content here */}
                    <div className="p-4 bg-[#e7f4ff] min-h-lvh">
                        <Outlet></Outlet>
                    </div>
                </div>
                
                <div className="drawer-side is-drawer-close:overflow-visible ">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start bg-[#4F5CC3] text-white is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow">
                        {/* List item */}
                        <li className='mb-3 is-drawer-close:mb-0'>
                            <Link to='/'>
                                <div className='flex items-end '>
                                    <img src={logoImg} className='h-16 md:h-20 w-20 md:w-25 transition-all duration-300 is-drawer-close:h-10 is-drawer-close:w-14'  
                                    // height={50} width={80} 
                                    alt="" />
                                    <h2 className='font-bold md:text-xl text-yellow-500 -ms-14 md:-ms-18  is-drawer-close:hidden'>Scholar <span className='text-secondary'> <span className='text-xl md:text-4xl'>S</span>tream</span></h2>
                                </div>
                            </Link>
                        </li>

                        {/* <li>
                            <NavLink
                                to="/dashboard"
                                data-tip="Homepage"
                                className={({ isActive }) =>
                                `is-drawer-close:tooltip is-drawer-close:tooltip-right
                                flex items-center gap-3 p-2 rounded-xl transition
                                ${isActive ? "bg-white text-[#4F5CC3] font-bold" : "text-white hover:bg-[#5b6ae0]"}`
                                }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                strokeLinejoin="round" strokeLinecap="round" strokeWidth="2"
                                fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                                <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                </svg>

                                <span className="is-drawer-close:hidden">Homepage</span>
                            </NavLink>
                        </li> */}


                        <li>
                            <NavLink
                                to="/dashboard/my-profile"
                                data-tip="My Profile"
                                className={({ isActive }) =>
                                `is-drawer-close:tooltip is-drawer-close:tooltip-right
                                flex items-center gap-3 p-2 rounded-xl transition
                                ${isActive ? "bg-white text-[#4F5CC3] font-bold" : "text-white hover:bg-[#5b6ae0]"}`
                                }
                            >
                                <FaUserCircle className="size-5" />
                                <span className="is-drawer-close:hidden">My Profile</span>
                            </NavLink>
                        </li>
                       

                        {/*Only Admin Related */}
                        {
                            role === 'Admin' && <>

                                <li>
                                    <NavLink
                                        to="/dashboard/add-scholarship"
                                        data-tip="Add Scholarship"
                                        className={({ isActive }) =>
                                        `is-drawer-close:tooltip is-drawer-close:tooltip-right
                                        flex items-center gap-3 p-2 rounded-xl transition
                                        ${isActive ? "bg-white text-[#4F5CC3] font-bold" : "text-white hover:bg-[#5b6ae0]"}`
                                        }
                                    >
                                        <MdAssignmentAdd className="size-5"/>
                                        <span className="is-drawer-close:hidden">Add Scholarship</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/manage-scholarships"
                                        data-tip="Manage Scholarships"
                                        className={({ isActive }) =>
                                        `is-drawer-close:tooltip is-drawer-close:tooltip-right
                                        flex items-center gap-3 p-2 rounded-xl transition
                                        ${isActive ? "bg-white text-[#4F5CC3] font-bold" : "text-white hover:bg-[#5b6ae0]"}`
                                        }
                                    >
                                        <LuFolderSync className="size-5"/>
                                        <span className="is-drawer-close:hidden">Manage Scholarships</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/manage-users"
                                        data-tip="Manage Users"
                                        className={({ isActive }) =>
                                        `is-drawer-close:tooltip is-drawer-close:tooltip-right
                                        flex items-center gap-3 p-2 rounded-xl transition
                                        ${isActive ? "bg-white text-[#4F5CC3] font-bold" : "text-white hover:bg-[#5b6ae0]"}`
                                        }
                                    >
                                        <FaHospitalUser className="size-5"/>
                                        <span className="is-drawer-close:hidden">Manage Users</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/analytics"
                                        data-tip="Analytics"
                                        className={({ isActive }) =>
                                        `is-drawer-close:tooltip is-drawer-close:tooltip-right
                                        flex items-center gap-3 p-2 rounded-xl transition
                                        ${isActive ? "bg-white text-[#4F5CC3] font-bold" : "text-white hover:bg-[#5b6ae0]"}`
                                        }
                                    >
                                        <PiChartLineUpFill className="size-5"/>
                                        {/* <LuFolderSync className="size-5"/> */}
                                        <span className="is-drawer-close:hidden">Analytics</span>
                                    </NavLink>
                                </li>
                            </>
                        }
                        {/* Only Moderator Related */}
                        {
                            role === 'Moderator' && <>
                                <li>
                                    <NavLink
                                        to="/dashboard/manage-applications"
                                        data-tip="Manage Applications"
                                        className={({ isActive }) =>
                                        `is-drawer-close:tooltip is-drawer-close:tooltip-right
                                        flex items-center gap-3 p-2 rounded-xl transition
                                        ${isActive ? "bg-white text-[#4F5CC3] font-bold" : "text-white hover:bg-[#5b6ae0]"}`
                                        }
                                    >
                                        <MdMarkEmailRead  className="size-5"/>
                                        {/* <MdContactMail className="size-5"/> */}
                                        {/* <FaHospitalUser className="size-5"/> */}
                                        <span className="is-drawer-close:hidden">Manage Applications</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/all-reviews"
                                        data-tip="All Reviews"
                                        className={({ isActive }) =>
                                        `is-drawer-close:tooltip is-drawer-close:tooltip-right
                                        flex items-center gap-3 p-2 rounded-xl transition
                                        ${isActive ? "bg-white text-[#4F5CC3] font-bold" : "text-white hover:bg-[#5b6ae0]"}`
                                        }
                                    >
                                        <MdOutlineRateReview   className="size-5"/>
                                        {/* <MdContactMail className="size-5"/> */}
                                        {/* <FaHospitalUser className="size-5"/> */}
                                        <span className="is-drawer-close:hidden">All Reviews</span>
                                    </NavLink>
                                </li>
                            </>
                        }
                        {/* Only Student Related */}
                        {
                            role === 'Student' && <>
                                <li>
                                    <NavLink
                                        to="/dashboard/my-applications"
                                        data-tip="My Applications"
                                        className={({ isActive }) =>
                                        `is-drawer-close:tooltip is-drawer-close:tooltip-right
                                        flex items-center gap-3 p-2 rounded-xl transition
                                        ${isActive ? "bg-white text-[#4F5CC3] font-bold" : "text-white hover:bg-[#5b6ae0]"}`
                                        }
                                    >
                                        
                                        
                                        <FileText className="size-5"/>
                                        <span className="is-drawer-close:hidden">My Applications</span>
                                    </NavLink>
                                </li>
                                
                                <li>
                                    <NavLink
                                        to="/dashboard/my-reviews"
                                        data-tip="My Reviews"
                                        className={({ isActive }) =>
                                        `is-drawer-close:tooltip is-drawer-close:tooltip-right
                                        flex items-center gap-3 p-2 rounded-xl transition
                                        ${isActive ? "bg-white text-[#4F5CC3] font-bold" : "text-white hover:bg-[#5b6ae0]"}`
                                        }
                                    >
                                        <GoCodeReview  className="size-5"/>
                                        {/* <MdContactMail className="size-5"/> */}
                                        {/* <FaHospitalUser className="size-5"/> */}
                                        <span className="is-drawer-close:hidden">My Reviews</span>
                                    </NavLink>
                                </li>
                            </>
                        }
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
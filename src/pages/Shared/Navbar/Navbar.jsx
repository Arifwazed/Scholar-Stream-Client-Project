import React from 'react';
import Logo from '../../../components/Logo/Logo';
import logoImg3 from '../../../assets/logo3.png'
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {
    const {user,loading,logOut} = useAuth();
    const links = <>
        <li> <NavLink to="/" className="text-white">Home</NavLink> </li>
        <li> <NavLink to="/allScholarships" className="text-white">All Scholarships</NavLink> </li>
        <li> <NavLink to=""></NavLink> </li>
    </>

    const handleLogout = () => {
        logOut();
    }
    return (
        <div className="navbar bg-[#4F5CC3] shadow-sm md:px-10">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul
                    tabIndex="-1"
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    {links}
                </ul>
                </div>
               <div className='flex items-end '>                    
                    <img src={logoImg3} width={70} alt="" />
                    <h2 className='font-bold text-yellow-500 -ms-12'>Scholar <span className='text-secondary'> <span className='text-3xl md:text-4xl'>S</span>tream</span></h2>
                </div>
                
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                {links}
                </ul>
            </div>
            <div className="navbar-end gap-2">
                {
                    user ? <a onClick={handleLogout} className="btn bg-red-500 text-white border-none shadow-none rounded-2xl">Log Out</a> : <> 
                    <Link to='/login' className="btn btn-secondary text-gray-900 border-none shadow-none rounded-2xl">Login</Link>
                    <Link to='/register' className="btn bg-yellow-500 text-gray-900 border-none shadow-none rounded-2xl">Register</Link> 
                    </>
                }
                
            </div>
        </div>
    );
};

export default Navbar;
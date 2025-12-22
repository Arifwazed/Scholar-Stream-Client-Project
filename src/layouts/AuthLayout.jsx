import React from 'react';
import { Link, Outlet } from 'react-router';
import logoImg3 from '../assets/logo3.png'

const AuthLayout = () => {
    return (
        <div className='bg-[#e7f4ff]'>
            <div className="navbar bg-[#4F5CC3] shadow-sm md:px-10">
                <div className="navbar-start">
                <div className='flex items-end '>                    
                        <img src={logoImg3} width={70} alt="" />
                        <h2 className='font-bold text-secondary -ms-12'>Scholar <span className='text-yellow-500'> <span className='text-3xl md:text-4xl'>S</span>tream</span></h2>
                    </div>
                    
                </div>
            </div>  
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router';
import logoImg3 from '../assets/logo3.png'

const AuthLayout = () => {
    const [theme, setTheme] = useState("light");
        
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };
    return (
        <div className='bg-linear-to-tr from-(--color-gradient-start) to-(--color-gradient-end)'>
            <div className="navbar bg-[#4F5CC3] shadow-sm md:px-6 justify-between">
                <div className="navbar-start">
                    <Link to='/' className='flex items-end '>                    
                        <img src={logoImg3} width={70} alt="" />
                        <h2 className='font-bold text-secondary -ms-12'>Scholar <span className='text-yellow-500'> <span className='text-3xl md:text-4xl'>S</span>tream</span></h2>
                    </Link>
                </div>
                {/* navbar right */}
                <div className="navbar-end mr-3">
                    <button onClick={toggleTheme} className="btn btn-sm rounded-full border border-gray-600">
                    {theme === "light" ? "🌙" : "☀️"}
                    </button>
                </div>
            </div>  
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;
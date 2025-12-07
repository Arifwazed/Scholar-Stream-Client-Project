import React from 'react';
import logoImg from '../../assets/logo3.png'


const Logo = () => {
    return (
        <div className='flex items-end '>
            <img src={logoImg} height={80} width={120} alt="" />
            <h2 className='font-bold text-xl text-yellow-500 -ms-22'>Scholar <span className='text-secondary'> <span className='text-4xl'>S</span>tream</span></h2>
        </div>
    );
};

export default Logo;
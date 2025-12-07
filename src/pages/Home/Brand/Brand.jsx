import React from 'react';

import Marquee from 'react-fast-marquee';
import amazon from '../../../assets/brands/amazon.png'
import amazon_vector from '../../../assets/brands/amazon_vector.png'
import casio from '../../../assets/brands/casio.png'
import moonstar from '../../../assets/brands/moonstar.png'
import randstad from '../../../assets/brands/randstad.png'
import star from '../../../assets/brands/star.png'
import start_people from '../../../assets/brands/start_people.png'
import bbc from '../../../assets/brands/bbc.png'


const Brand = () => {
    const brands = [amazon,amazon_vector,casio,moonstar,randstad,star,start_people,bbc];
    return (
        <div className='border py-12'>
            <div className='text-center mb-8'>
                <h1 className="text-primary text-4xl md:text-5xl font-semibold">In the Spotlight</h1>
                <p className='my-3 text-lg md:text-xl text-gray-600'>ScholarStream has been highlighted by top magazines, media outlets, and educational platforms.</p>
            </div>

            <Marquee className='flex gap-10 font-semibold' pauseOnHover={true} speed={80}>
                {
                    brands.map((logo,index) => <img key={index} src={logo} className='mr-50' alt="" />)
                }
            </Marquee>

        </div>
    );
};

export default Brand;
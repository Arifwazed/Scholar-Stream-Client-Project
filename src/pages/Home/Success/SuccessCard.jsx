import React from 'react';
import { FaQuoteLeft } from "react-icons/fa";

const SuccessCard = ({story}) => {
    const {description,image,title,country,scholarshipName,year} = story;
    return (
        <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-3 md:p-6">
                    {/* Quote Icon */}
                    <FaQuoteLeft className="text-teal-200 text-4xl mb-3" />
        
                    {/* Text */}
                    <p className="text-gray-600 mb-6">
                        {description}
                    </p>
        
                    {/* Divider */}
                    <div className="border-t border-dashed border-teal-300 my-4"></div>
        
                    {/* Profile */}
                    <div className="flex items-center gap-4">
                        {/* Circle avatar */}
                        <div className="md:w-15 md:h-15 rounded-full bg-teal-800"><img src={image} className='rounded-full' alt="" /></div>
        
                        <div>
                        <h3 className=" text-teal-700">{title}, {country}</h3>
                        <p className="font-bold text-teal-800 text-lg">{scholarshipName}, {year}</p>
                        </div>
                    </div>
                </div>
    );
};

export default SuccessCard;
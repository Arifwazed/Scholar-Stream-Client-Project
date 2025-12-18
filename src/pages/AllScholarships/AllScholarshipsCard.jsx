import { MapPinIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Link } from 'react-router';

const AllScholarshipsCard = ({scholarship}) => {
    const {} = scholarship;
    return (
        <div>
            
            
            <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-3xl shadow-md p-4 hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
                {/* University Image */}
                <div className="w-full h-44 overflow-hidden rounded-3xl bg-white">
                    <img
                    src={scholarship.universityImage}
                    alt={scholarship.universityName}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                </div>
                

                {/* Info */}
                <div className="mt-4 space-y-2">
                    {/* University Name */}
                    <h3 className="text-xl font-semibold">{scholarship.universityName}</h3>

                    {/* Scholarship Category */}
                    <p className="text-base text-gray-600">
                    <span className="font-semibold">Category:</span> {scholarship.scholarshipCategory}
                    </p>

                    {/* Badge Tags */}
                    <div className=" flex flex-wrap gap-2">
                        {scholarship.subjectCategory.split(", ").map((subject, index) => (
                        <span
                            key={index}
                            className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full"
                        >
                            {subject}
                        </span>
                        ))}
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {scholarship.degree}
                        </span>
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {scholarship.scholarshipCategory}
                        </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-base text-green-700">
                    <MapPinIcon className="w-5 h-5 text-green-600 mr-1" />
                    {scholarship.universityCity}, {scholarship.universityCountry}
                    </div>

                    {/* Application Fees */}
                    <p className="text-base">
                    <span className="font-semibold">Application Fees:</span>{" "}
                    {scholarship.applicationFees ? `$ ${scholarship.applicationFees}` : "No Fees"}
                    </p>
                </div>

                {/* View Details Button */}
                <Link to={`/scholarshipDetails/${scholarship._id}`}>
                    <button className="w-full mt-4 py-2 bg-primary text-white hover:text-primary rounded-full font-medium hover:bg-gray-200 hover:border-2 border-primary transition">
                    View Details
                    </button>
                </Link>
            </div>

            
        </div>

        
    );
};

export default AllScholarshipsCard;
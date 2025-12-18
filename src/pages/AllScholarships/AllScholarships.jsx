import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import AllScholarshipsCard from './AllScholarshipsCard';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading/Loading';

const AllScholarships = () => {
    const scholarships = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const [searchText,setSearchText]  = useState('');
    // const [roleFilter, setRoleFilter] = useState("");
    const [filterType, setFilterType] = useState(""); // country | category
    const [filterValue, setFilterValue] = useState("");

    const {data : allScholarship = [],isLoading} = useQuery({
        queryKey: ['allScholarship',searchText,filterType,filterValue],
        queryFn: async () => {
            // const res = await axiosSecure.get(`/scholarships?searchText=${searchText}`,{
            const res = await axiosSecure.get(`/scholarships`,{
                // params: roleFilter ? { role: roleFilter } : {}
                params: {
                    searchText,
                    ...(filterType === "country" && filterValue && {
                        country: filterValue,
                    }),
                    ...(filterType === "category" && filterValue && {
                        category: filterValue,
                    }),
                },
            });
            return res.data;
        }
    })
    if(isLoading){
        <Loading></Loading>
    }
    console.log("from all scholarship: ", scholarships)
    return (
        <div className='bg-[#e7f4ff] py-10'>
            <div className='text-center mb-8'>
                <h2 className="text-primary text-4xl  font-semibold">Featured Scholarships</h2>
                <p className='my-3 text-lg text-gray-600'>Explore top scholarship opportunities selected to help you achieve your academic goals.</p>
            </div>
            <div className="mx-5 md:mx-10 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            
                {/* search */}
                <div className='w-full md:w-1/2'>
                    {/* <p className='my-2'>search input: {searchText}</p> */}
                    <label className="input">
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
                {/* sort */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <select
                    value={filterType}
                    onChange={(e) => {
                        setFilterType(e.target.value);
                        setFilterValue("");
                    }}
                    className="select select-bordered w-full sm:w-52"
                    >
                    <option value="">All Scholarship</option>
                    <option value="country">Country</option>
                    <option value="category">Category</option>
                    </select>

                    {filterType && (
                    <select
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                        className="select select-bordered w-full sm:w-52"
                    >
                        <option value="">Select {filterType}</option>
                        {filterType === "country" && (
                        <>
                            <option value="USA">USA</option>
                            <option value="UK">UK</option>
                            <option value="Canada">Canada</option>
                        </>
                        )}
                        {filterType === "category" && (
                        <>
                            <option value="Engineering">Engineering</option>
                            <option value="Business">Business</option>
                            <option value="Science">Science</option>
                        </>
                        )}
                    </select>
                    )}
                </div>

            </div>
            {/* card section */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mx-5 md:mx-10'>
                {
                    allScholarship.map((scholarship,index) =>
                        <AllScholarshipsCard key={index} scholarship={scholarship}></AllScholarshipsCard>
                    )
                }
            </div>
        </div>
    );
};

export default AllScholarships;
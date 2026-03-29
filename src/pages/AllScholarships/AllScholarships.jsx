import React, { useEffect, useState } from 'react';
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
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const {data : allScholarship = [],isLoading} = useQuery({
        queryKey: ['allScholarship',searchText,filterType,filterValue,currentPage],
        queryFn: async () => {
            // const res = await axiosSecure.get(`/scholarships?searchText=${searchText}`,{
            const res = await axiosSecure.get(`/scholarships`,{
                // params: roleFilter ? { role: roleFilter } : {} 
                params: {
                    searchText,
                    page: currentPage,
                    limit: itemsPerPage,
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

    // pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentScholarships = allScholarship.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(allScholarship.length / itemsPerPage);

    console.log("from all scholarship: ", scholarships)
    return (
        <div className='bg-linear-to-tr from-(--color-gradient-start) to-(--color-gradient-end) pb-10 pt-25 md:pt-30'>
            <div className='text-center mb-8'>
                <h2 className="text-primary text-4xl md:text-5xl font-semibold"><span className="bg-linear-to-r from-pink-500 to-blue-600 bg-clip-text text-transparent">Featured Scholarships</span></h2>
                <p className='my-3 text-lg md:text-xl text-base-100'>Explore top scholarship opportunities selected to help you achieve your academic goals</p>
            </div>

            <div className="mx-5 md:mx-10 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* search */}
                <div className='w-1/2 '>
                    {/* <p className='my-2'>search input: {searchText}</p> */}
                    <label className="input md:w-1/2 bg-linear-to-r from-blue-50 to-purple-50">
                        <svg className="h-[1em] opacity-50 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
                        <input onChange={(e)=>setSearchText(e.target.value)} type="search" className="grow text-black" placeholder="Search" />  
                    </label>
                </div>
                {/* sort */}
                <div className="flex gap-3 md:w-1/2 md:justify-end ">
                    <div className='w-1/2 md:w-1/3 bg-linear-to-r from-blue-100 to-purple-100 rounded-xl p-1px shadow-sm'>
                        <select
                            value={filterType}
                            onChange={(e) => {
                                setFilterType(e.target.value);
                                setFilterValue("");
                            }}
                            className="select w-full bg-white/80 backdrop-blur-md border-none text-black"
                        >
                        <option value="">All Scholarship</option>
                        <option value="country">Country</option>
                        <option value="category">Category</option>
                        </select>
                    </div>

                    {filterType && (
                    <div className='w-1/2 md:w-1/3 bg-linear-to-r from-blue-100 to-purple-100 rounded-xl p-1px shadow-sm'>
                    <select
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                        className="select w-full bg-white/80 backdrop-blur-md border-none text-black"
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
                    </div>
                    )}
                </div>

            </div>
            {/* card section */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mx-5 md:mx-10'>
                {
                    currentScholarships.map((scholarship,index) =>
                        <AllScholarshipsCard key={index} scholarship={scholarship}></AllScholarshipsCard>
                    )
                }
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-8">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                >
                    Prev
                </button>

                {[...Array(totalPages).keys()].map((page) => (
                    <button
                    key={page}
                    className={`px-4 py-2 border rounded ${
                        currentPage === page + 1 ? 'bg-primary text-white' : ''
                    }`}
                    onClick={() => setCurrentPage(page + 1)}
                    >
                    {page + 1}
                    </button>
                ))}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>


        </div>
    );
};

export default AllScholarships;
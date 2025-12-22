import React from 'react';
import { Link } from 'react-router';

const ModeratorDashboardHome = () => {
    return (
        <div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  
                {/* My Profile */}
                <Link to='/dashboard/my-profile' className="flex gap-5 rounded-xl bg-linear-to-r from-blue-100 to-purple-100 p-6 shadow-sm border border-purple-100 hover:shadow-md transition">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-purple-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6 text-purple-600"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0" />
                    </svg>
                    </div>

                    <div>
                    <h3 className="text-xl font-semibold text-gray-800">My Profile</h3>
                    <p className="mt-1 text-gray-500">
                        Update your account information and security settings.
                    </p>
                    </div>
                </Link>

                {/* Manage Applications */}
                <Link to="/dashboard/manage-applications" className="flex gap-4 rounded-xl bg-linear-to-r from-blue-100 to-purple-100 p-6 border border-purple-100 shadow-sm hover:shadow-md transition">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth={2} stroke="currentColor"
                        className="h-6 w-6 text-yellow-600">
                        <path strokeLinecap="round" strokeLinejoin="round"
                        d="M9 12h6m-6 4h6M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z" />
                    </svg>
                    </div>

                    <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                        Manage Applications
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Review, approve, or reject submitted applications.
                    </p>
                    </div>
                </Link>

                {/* All Reviews */}
                <Link to="/dashboard/all-reviews" className="flex gap-4 rounded-xl bg-linear-to-r from-blue-100 to-purple-100 p-6 border border-purple-100 shadow-sm hover:shadow-md transition">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth={2} stroke="currentColor"
                        className="h-6 w-6 text-green-600">
                        <path strokeLinecap="round" strokeLinejoin="round"
                        d="M11.25 4.5l2.25 4.5 4.5.75-3.25 3.25.75 4.5-4.25-2.25-4.25 2.25.75-4.5L4.5 9.75l4.5-.75L11.25 4.5z" />
                    </svg>
                    </div>

                    <div>
                    <h3 className="text-lg font-semibold text-gray-800">All Reviews</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        View and manage all submitted scholarship reviews.
                    </p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default ModeratorDashboardHome;
import React from 'react';
import { Link } from 'react-router';

const AdminDashboardHome = () => {
    return (
        <div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {/* My Profile */}
                <Link to="/dashboard/my-profile" className="flex gap-4 rounded-xl bg-linear-to-r from-blue-100 to-purple-100 p-6 border border-purple-100  shadow-sm hover:shadow-md transition">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth={2} stroke="currentColor"
                        className="h-6 w-6 text-purple-600">
                        <path strokeLinecap="round" strokeLinejoin="round"
                        d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0" />
                    </svg>
                    </div>
                    <div>
                    <h3 className="text-lg font-semibold text-gray-800">My Profile</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Update your account information and security settings.
                    </p>
                    </div>
                </Link>

                {/* Add Scholarship */}
                <Link to="/dashboard/add-scholarship" className="flex gap-4 rounded-xl bg-linear-to-r from-blue-100 to-purple-100 p-6 border border-purple-100  shadow-sm hover:shadow-md transition">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth={2} stroke="currentColor"
                        className="h-6 w-6 text-yellow-600">
                        <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    </div>
                    <div>
                    <h3 className="text-lg font-semibold text-gray-800">Add Scholarship</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Create new scholarships with eligibility and fees.
                    </p>
                    </div>
                </Link>

                {/* Manage Scholarships */}
                <Link to="/dashboard/manage-scholarships" className="flex gap-4 rounded-xl bg-linear-to-r from-blue-100 to-purple-100 p-6 border border-purple-100  shadow-sm hover:shadow-md transition">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth={2} stroke="currentColor"
                        className="h-6 w-6 text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round"
                        d="M4.5 6.75h15M4.5 12h15M4.5 17.25h15" />
                    </svg>
                    </div>
                    <div>
                    <h3 className="text-lg font-semibold text-gray-800">Manage Scholarships</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Edit, update, or remove existing scholarships.
                    </p>
                    </div>
                </Link>

                {/* Manage Users */}
                <Link to="/dashboard/manage-users" className="flex gap-4 rounded-xl bg-linear-to-r from-blue-100 to-purple-100 p-6 border border-purple-100  shadow-sm hover:shadow-md transition">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth={2} stroke="currentColor"
                        className="h-6 w-6 text-green-600">
                        <path strokeLinecap="round" strokeLinejoin="round"
                        d="M17 20.25c0-2.9-2.9-5.25-6.5-5.25S4 17.35 4 20.25M15 7.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    </div>
                    <div>
                    <h3 className="text-lg font-semibold text-gray-800">Manage Users</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Control user roles and platform access.
                    </p>
                    </div>
                </Link>

                {/* Analytics */}
                <Link to="/dashboard/analytics" className="flex gap-4 rounded-xl bg-linear-to-r from-blue-100 to-purple-100 p-6 border border-purple-100  shadow-sm hover:shadow-md transition">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth={2} stroke="currentColor"
                        className="h-6 w-6 text-indigo-600">
                        <path strokeLinecap="round" strokeLinejoin="round"
                        d="M3 3v18h18M9 17V9m4 8v-5m4 5V7" />
                    </svg>
                    </div>
                    <div>
                    <h3 className="text-lg font-semibold text-gray-800">Analytics</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        View application trends and platform insights.
                    </p>
                    </div>
                </Link>

            </div>

        </div>
    );
};

export default AdminDashboardHome;
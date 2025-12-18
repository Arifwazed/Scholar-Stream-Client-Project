"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import CountUp from "react-countup";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2", "#FF6F91", "#FF9671"];

const Analytics = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error } = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/analytics");
      return res.data;
    }
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error loading analytics</p>;

  const {
    totalUsers,
    totalScholarships,
    totalFeesCollected,
    applicationsByCategory,
    applicationsByUniversity,
    applicationsOverTime
  } = data;

  return (
    <div className="p-6 space-y-10">
        <h1 className="text-3xl font-bold text-center">📊 Platform Analytics</h1>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h2 className="text-gray-500">Total Users</h2>
          <p className="text-3xl font-bold text-blue-600">
            <CountUp end={totalUsers} duration={1.5} />
          </p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h2 className="text-gray-500">Total Scholarships</h2>
          <p className="text-3xl font-bold text-green-600">
            <CountUp end={totalScholarships} duration={1.5} />
          </p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h2 className="text-gray-500">Total Fees Collected</h2>
          <p className="text-3xl font-bold text-purple-600">
            $<CountUp end={totalFeesCollected} duration={1.5} />
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Pie Chart - University */}
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-center">Applications by University (Pie)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={applicationsByUniversity}
                dataKey="count"
                nameKey="university"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {applicationsByUniversity.map((entry, index) => (
                  <Cell key={`cell-uni-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - University */}
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-center">Applications by University (Bar)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={applicationsByUniversity}>
              <XAxis dataKey="university" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Scholarship Category */}
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-center">Applications by Scholarship Category (Pie)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={applicationsByCategory}
                dataKey="count"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#FF8042"
                label
              >
                {applicationsByCategory.map((entry, index) => (
                  <Cell key={`cell-cat-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Scholarship Category */}
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-center">Applications by Scholarship Category (Bar)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={applicationsByCategory}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#FF6F91" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Line Chart - Growth Over Time */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-center">Applications Growth Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={applicationsOverTime}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default Analytics;

"use client"

import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import Header from "../components/Header";
import FilterableTable from "../components/filterable-table";

const reports = [
  { id: 1, category: "Infrastructure", description: "Potholes on Main St.", location: "New York", status: "Pending" },
  { id: 2, category: "Waste Management", description: "Overflowing garbage bins", location: "Los Angeles", status: "Resolved" },
  { id: 3, category: "Road Safety", description: "Open manhole", location: "Chicago", status: "In Progress" },
];

const Dashboard = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredReports = selectedStatus === "All" ? reports : reports.filter(report => report.status === selectedStatus);

  const chartData = {
    labels: ["Pending", "In Progress", "Resolved"],
    datasets: [{
      label: "Issues by Status",
      data: [1, 1, 1],
      backgroundColor: ["#f87171", "#facc15", "#4ade80"],
    }],
  };

  return ( <>
    <Header />
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 text-black p-5 space-y-4">
        <h2 className="text-xl font-bold">Menu</h2>
        <nav className="space-y-2">
          <a href="#" className="block py-2 px-3 rounded hover:bg-blue-800 hover:text-white">Dashboard</a>
          <a href="#" className="block py-2 px-3 rounded hover:bg-blue-700 hover:text-white">Reports</a>
          <a href="#" className="block py-2 px-3 rounded hover:bg-blue-700 hover:text-white">Profile</a>
          <a href="#" className="block py-2 px-3 rounded hover:bg-blue-700 hover:text-white">Settings</a>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 my-6">
          <div className="p-4 bg-white rounded shadow">
            <h3 className="text-lg text-green-500">Total Reports</h3>
            <p className="text-2xl font-bold">{reports.length}</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h3 className="text-lg text-green-500">Pending</h3>
            <p className="text-2xl font-bold">1</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h3 className="text-lg text-green-500">Resolved</h3>
            <p className="text-2xl font-bold">1</p>
          </div>
        </div>

        <FilterableTable />
      </main>
    </div>
  </>
  );
};

export default Dashboard;

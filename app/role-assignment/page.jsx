"use client";

import React, { useState } from "react";
import UserForm from "@/app/components/UserForm"; // Import User Form component
import NGOForm from "@/app/components/NGOForm"; // Import NGO Form component
import Header from "../components/Header";

export default function RoleAssignmentPage() {
  const [selectedRole, setSelectedRole] = useState(null); // State to track selected role

  const handleRoleSelect = (role) => {
    setSelectedRole(role); // Set selected role
  };

  return (
    <>
    <Header />
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
        Select Your Role
      </h2>

      {/* Role Selection Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => handleRoleSelect("user")}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          User
        </button>
        <button
          onClick={() => handleRoleSelect("ngo")}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
        >
          NGO
        </button>
      </div>

      {/* Render Forms Based on Selected Role */}
      {selectedRole === "user" && <UserForm />}
      {selectedRole === "ngo" && <NGOForm />}
    </div>
    </>
  );
}

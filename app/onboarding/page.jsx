"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import UserForm from "@/app/components/UserForm";
import NGOForm from "@/app/components/NGOForm";
import Header from "../components/Header";

export default function Onboarding() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [selectedRole, setSelectedRole] = useState(null);
  const [categories, setCategories] = useState([]);
  const [region, setRegion] = useState("");

  const availableCategories = [
    "Road Issues", "Water Supply", "Electricity",
    "Sanitation", "Public Safety", "Waste Management"
  ];

  // Redirect if user has already completed onboarding
  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.hasCompletedOnboarding) {
      const role = user.publicMetadata.role;
      router.push(role === "user" ? "/dashboard" : "/ngo-dashboard");
    }
  }, [isLoaded, user, router]);

  // Handle role selection
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!user) {
      alert("User data is not available. Please try again.");
      return;
    }

    if (!selectedRole) {
      alert("Please select a role.");
      return;
    }

    if (selectedRole === "user" && (categories.length < 3 || !region)) {
      alert("Please select at least 3 categories and enter your region.");
      return;
    }

    try {
      await user.update({
        publicMetadata: { role: selectedRole, categories, region, hasCompletedOnboarding: true },
      });

      router.refresh(); // Ensures Clerk data updates in Next.js
      router.push(selectedRole === "user" ? "/dashboard" : "/ngo-dashboard");
    } catch (error) {
      console.error("Error updating user metadata:", error);
      alert("Failed to complete onboarding. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
          Select Your Role
        </h2>

        {/* Role Selection */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => handleRoleSelect("user")}
            className={`py-2 px-4 rounded-md transition ${
              selectedRole === "user" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            User
          </button>
          <button
            onClick={() => handleRoleSelect("ngo")}
            className={`py-2 px-4 rounded-md transition ${
              selectedRole === "ngo" ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
          >
            NGO
          </button>
        </div>

        {/* Render UserForm or NGOForm Based on Role */}
        {selectedRole === "user" && (
          <>
            <UserForm setCategories={setCategories} categories={categories} region={region} setRegion={setRegion} />
            <button className="bg-green-600 text-white px-6 py-2 rounded mt-4 w-full" onClick={handleSubmit}>
              Complete Onboarding
            </button>
          </>
        )}
        {selectedRole === "ngo" && (
          <>
            <NGOForm />
            <button className="bg-green-600 text-white px-6 py-2 rounded mt-4 w-full" onClick={handleSubmit}>
              Complete Onboarding
            </button>
          </>
        )}
      </div>
    </>
  );
}

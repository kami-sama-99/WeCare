"use client"

import React from "react"
import { useForm } from "react-hook-form"
import Header from "../components/Header"

export default function NGOOnboardingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    console.log("Form Submitted:", data);

    // Extract Clerk user ID from the current signed-in user
    const userId = await getClerkUserId(); // A function to get the user ID from Clerk

    try {
      // Call API to update the user's role
      const response = await fetch("/api/update-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId, // Send the userId and role data
          role: "NGO",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update role");
      }

      alert("NGO Onboarded Successfully and role assigned as NGO!");
    } catch (error) {
      console.error(error);
      alert("Error updating role");
    }
  };

  // A function to get Clerk user ID (you can use Clerk's useUser hook on the client side)
  const getClerkUserId = () => {
    return new Promise((resolve) => {
      // Assume the user is signed in and you have access to Clerk's user ID from `useUser` hook
      resolve("user_id_from_clerk");  // Replace with actual Clerk user ID
    });
  };

  return (
    <>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
        <h2 className="text-2xl font-semibold text-blue-600 text-center mb-6">
          NGO Onboarding Form
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* NGO Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">NGO Name</label>
            <input
              {...register("ngoName", { required: "NGO Name is required" })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter NGO Name"
            />
            {errors.ngoName && <p className="text-red-500 text-sm">{errors.ngoName.message}</p>}
          </div>

          {/* Registration Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Registration Number</label>
            <input
              {...register("registrationNumber", { required: "Registration Number is required" })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Registration Number"
            />
            {errors.registrationNumber && <p className="text-red-500 text-sm">{errors.registrationNumber.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              {...register("phone", { required: "Phone Number is required" })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Phone Number"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              {...register("address", { required: "Address is required" })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Address"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>

          {/* Mission Statement */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Mission Statement</label>
            <textarea
              {...register("mission", { required: "Mission Statement is required" })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe your NGO's mission"
            />
            {errors.mission && <p className="text-red-500 text-sm">{errors.mission.message}</p>}
          </div>

          {/* Areas of Focus */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Areas of Focus</label>
            <select
              {...register("focusArea", { required: "Please select an area of focus" })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select an area</option>
              <option value="education">Education</option>
              <option value="healthcare">Healthcare</option>
              <option value="environment">Environment</option>
              <option value="povertyRelief">Poverty Relief</option>
            </select>
            {errors.focusArea && <p className="text-red-500 text-sm">{errors.focusArea.message}</p>}
          </div>

          {/* Accept Terms */}
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("terms", { required: "You must accept the terms" })}
              className="mr-2"
            />
            <label className="text-sm text-gray-700">I agree to the terms and conditions</label>
          </div>
          {errors.terms && <p className="text-red-500 text-sm">{errors.terms.message}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Header from "../components/Header";

export default function UserOnboardingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

      alert("User Onboarded Successfully and role assigned as NGO!");
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
          General User Onboarding Form
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              {...register("fullName", { required: "Full Name is required" })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Full Name"
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
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

          {/* Occupation */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Occupation</label>
            <input
              {...register("occupation", { required: "Occupation is required" })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Occupation"
            />
            {errors.occupation && <p className="text-red-500 text-sm">{errors.occupation.message}</p>}
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Interests</label>
            <textarea
              {...register("interests", { required: "Please share your interests" })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your interests"
            />
            {errors.interests && <p className="text-red-500 text-sm">{errors.interests.message}</p>}
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
  );
}

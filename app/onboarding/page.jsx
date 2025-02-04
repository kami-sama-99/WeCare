"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function Onboarding() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [role, setRole] = useState(null);
  const [categories, setCategories] = useState([]);
  const [region, setRegion] = useState("");

  const availableCategories = ["Road Issues", "Water Supply", "Electricity", "Sanitation", "Public Safety", "Waste Management"];

  // Redirect if user has already completed onboarding
  useEffect(() => {
    if (isLoaded && user?.unsafeMetadata?.hasCompletedOnboarding) {
      const role = user.unsafeMetadata.role;
      if (role === "user") {
        router.push("/dashboard");
      } else if (role === "ngo") {
        router.push("/ngodash");
      } else {
        router.push("/admin-dashboard");
      }
    }
  }, [isLoaded, user, router]);

  const handleCategorySelection = (category) => {
    setCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleSubmit = async () => {
    if (!role) {
      alert("Please select a role.");
      return;
    }

    if ((role === "user" || role === "ngo") && (categories.length < 3 || !region)) {
      alert("Please select at least 3 categories and enter your region.");
      return;
    }

    try {
      await user.update({
        unsafeMetadata: { role, categories, region, hasCompletedOnboarding: true },
      });

      // Redirect to the appropriate dashboard
      if (role === "user") {
        router.push("/dashboard");
      } else if (role === "ngo") {
        router.push("/ngo-dashboard");
      } else {
        router.push("/admin-dashboard");
      }
    } catch (error) {
      console.error("Error updating user metadata:", error);
      alert("Failed to complete onboarding. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Welcome to WeCare</h2>
      <p className="mb-6">Please choose your role:</p>

      <div className="flex gap-4 mb-6">
        {["user", "ngo", "admin"].map((option) => (
          <button
            key={option}
            className={`px-4 py-2 rounded ${role === option ? "bg-green-600 text-white" : "bg-gray-200"}`}
            onClick={() => setRole(option)}
          >
            {option.toUpperCase()}
          </button>
        ))}
      </div>

      {(role === "user" || role === "ngo") && (
        <>
          <p className="mb-4">Select at least 3 categories:</p>
          <div className="grid grid-cols-2 gap-2 mb-6">
            {availableCategories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded ${categories.includes(category) ? "bg-green-600 text-white" : "bg-gray-200"}`}
                onClick={() => handleCategorySelection(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <label className="block mb-4">
            <span className="text-gray-700">Enter your region:</span>
            <input
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-4 py-2 border rounded mt-1"
            />
          </label>
        </>
      )}

      <button className="bg-green-600 text-white px-6 py-2 rounded mt-4" onClick={handleSubmit}>
        Continue
      </button>
    </div>
  );
}

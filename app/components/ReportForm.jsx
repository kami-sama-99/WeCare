"use client";

import { useRef, useState } from "react";

export default function ReportForm() {
  const formRef = useRef(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [error, setError] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // Store image URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!locationData) {
      alert("Please fetch your location before submitting.");
      return;
    }

    const formData = new FormData(formRef.current);

    // Convert FormData to JSON
    const data = Object.fromEntries(formData.entries());

    // Convert notify checkbox value to boolean
    data.notify = data.notify === "on";

    // Ensure location is an object
    data.location = {
      latitude: locationData.latitude,
      longitude: locationData.longitude,
    };

    // Convert image to Base64 (if an image is selected)
    const file = formData.get("image");
    if (file && file.size > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        data.image = reader.result; // Base64 encoded image

        try {
          const response = await fetch("/api/reports", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to submit report.");
          }

          const result = await response.json();
          console.log("Server Response:", result);
          alert("Report submitted successfully!");
        } catch (error) {
          console.error("Error submitting report:", error);
          alert(error.message);
        }
      };
    } else {
      // No image, send request immediately
      data.image = "";
      try {
        const response = await fetch("/api/reports", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to submit report.");
        }

        const result = await response.json();
        console.log("Server Response:", result);
        alert("Report submitted successfully!");
      } catch (error) {
        console.error("Error submitting report:", error);
        alert(error.message);
      }
    }
  };

  function getLocation() {
    setLoadingLocation(true);
    setError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, handleError);
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoadingLocation(false);
    }
  }

  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    setLocationData({ latitude, longitude });
  }

  function handleError() {
    setError("Unable to retrieve your location. Please try again.");
    setLoadingLocation(false);
  }

  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      console.log("Image URL:", imageUrl);
    }
  }

  return (
    <form ref={formRef} className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Report Details</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <label className="block text-gray-700 font-medium">Category of Issue:</label>
      <select name="category" required className="w-full p-2 border rounded-md mt-1"> {/* Updated name */}
        <option value="">Select Category</option>
        <option value="Damaged Road">Damaged Road</option>
        <option value="Unclean Area">Unclean Area</option>
        <option value="Open Manhole">Open Manhole</option>
        <option value="Faulty Streetlight">Faulty Streetlight</option>
        <option value="Poor Public Transport Condition">Poor Public Transport Condition</option>
        <option value="Other Infrastructure Issues">Other Infrastructure Issues</option>
      </select>

      <label className="block text-gray-700 font-medium mt-4">Exact Location:</label>
      <div className="flex items-center">
        <input
          type="text"
          name="location"
          required
          className="w-full p-2 border rounded-md mt-1"
          disabled
          value={locationData ? `${locationData.latitude}, ${locationData.longitude}` : ''}
        />
        <button
          type="button"
          onClick={getLocation}
          disabled={loadingLocation}
          className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {loadingLocation ? "Finding..." : "Find Me"}
        </button>
      </div>

      <label className="block text-gray-700 font-medium mt-4">Description of the Issue:</label>
      <textarea name="description" rows="4" required className="w-full p-2 border rounded-md mt-1"></textarea>

      <label className="block text-gray-700 font-medium mt-4">Upload Image (Optional):</label>
      <input type="file" name="image" accept="image/*" className="w-full p-2 border rounded-md mt-1" onChange={handleFileUpload} /> {/* Updated name */}

      {imageUrl && <img src={imageUrl} alt="Selected" className="mt-4 max-w-full h-auto rounded-md" />}

      <label className="flex items-center mt-2">
        <input type="checkbox" name="notify" className="mr-2" />
        I want to be updated on the resolution
      </label>

      <button type="submit" className="w-full bg-green-600 text-white font-semibold py-2 mt-6 rounded-md hover:bg-green-700 transition">
        Submit
      </button>
    </form>
  );
}

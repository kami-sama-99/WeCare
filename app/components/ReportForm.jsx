"use client";

import { useRef, useState } from "react";
import { db } from "@/firebase";
import { collection, addDoc, GeoPoint } from "firebase/firestore";

export default function ReportForm() {
  const formRef = useRef(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [error, setError] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // Store image URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    // Convert FormData to an object
    const data = Object.fromEntries(formData.entries());

    // Convert "notify" and "anonymous" checkboxes to boolean
    data.user = formData.get("notify") === "on";
    delete data.notify;

    // Check if location data exists
    if (locationData) {
      data.location = new GeoPoint(locationData.latitude, locationData.longitude);
    } else {
      alert("Location is required.");
      return;
    }

    // Assign image URL (if uploaded)
    if (imageUrl) {
      data.image = imageUrl;
    } else {
      data.image = ""; // Store an empty string if no image
    }

    delete data.file;

    console.log("Submitting Data:", data);

    try {
      try {
        console.log("Submitting Data:", data); // Log the data to check if it's correct
        await addDoc(collection(db, "Reports"), data);
        console.log("Document added successfully");
        formRef.current.reset();
        setLocationData(null);
        setImageUrl("");
        alert("Report submitted successfully!");
      } catch (e) {
        console.error("Error adding document: ", e); // Log the error message
        setError("Error submitting report. Please try again.");
        alert("Error submitting report. Please try again.");
      }

      // Reset form after successful submission
      formRef.current.reset();
      setLocationData(null);
      setImageUrl("");
      alert("Report submitted successfully!");
    } catch (e) {
      console.error("Error adding document: ", e);
      setError("Error submitting report. Please try again.");
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
      <select name="categories" required className="w-full p-2 border rounded-md mt-1">
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
        <input type="text" name="location" required className="w-full p-2 border rounded-md mt-1" disabled value={locationData ? `${locationData.latitude}, ${locationData.longitude}` : ''} />
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
      <input type="file" name="file" accept="image/*" className="w-full p-2 border rounded-md mt-1" onChange={handleFileUpload} />

      {imageUrl && <p className="text-green-500 mt-2">Image selected successfully!</p>}

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

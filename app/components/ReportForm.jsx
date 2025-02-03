"use client";

import { useState } from "react";

export default function ReportForm() {
  const [formData, setFormData] = useState({
    category: "",
    location: "",
    dateTime: "",
    description: "",
    file: null,
    action: "",
    notify: false,
    anonymous: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    console.log("Submitted Data:", formData);
  };

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  // Function to handle success
  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    getRegionFromCoordinates(latitude, longitude);
  }

  function getRegionFromCoordinates(lat, lon) {
    const apiKey = "80d4f320d6dd4908b1583ed5d80b7064";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          const address = data.results[0].components;
          const location = `${address.city || ''}, ${address.state || ''}, ${address.country || ''}`;

          // Update the location field in the formData state
          setFormData((prev) => ({
            ...prev,
            location: location.trim() || "Location not found",
          }));
        } else {
          console.log("No address found for the given coordinates.");
        }
      })
      .catch(error => console.error("Error fetching reverse geocoding data:", error));
  }

  getLocation();

  return (
    <form className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Report Details</h2>

      <label className="block text-gray-700 font-medium">Category of Issue:</label>
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded-md mt-1"
      >
        <option value="">Select Category</option>
        <option value="Unclean Area">Unclean Area</option>
        <option value="Open Manhole">Open Manhole</option>
        <option value="Damaged Road/Pavement">Damaged Road/Pavement</option>
        <option value="Faulty Streetlight">Faulty Streetlight</option>
        <option value="Poor Public Transport Condition">Poor Public Transport Condition</option>
        <option value="Other Infrastructure Issues">Other Infrastructure Issues</option>
      </select>

      <label className="block text-gray-700 font-medium mt-4">Exact Location:</label>
      <div className="flex items-center">
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md mt-1"
        />
        <button
          type="button"
          onClick={getLocation}
          className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Find Me
        </button>
      </div>

      <label className="block text-gray-700 font-medium mt-4">Description of the Issue:</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows="4"
        required
        className="w-full p-2 border rounded-md mt-1"
      ></textarea>

      <label className="block text-gray-700 font-medium mt-4">Upload Images/Videos (if any):</label>
      <input type="file" name="file" onChange={handleChange} accept="image/*,video/*" className="w-full p-2 border rounded-md mt-1" />

      <label className="flex items-center mt-2">
        <input type="checkbox" name="notify" checked={formData.notify} onChange={handleChange} className="mr-2" />
        I want to be updated on the resolution
      </label>

      <label className="flex items-center mt-2">
        <input type="checkbox" name="anonymous" checked={formData.anonymous} onChange={handleChange} className="mr-2" />
        I prefer to report anonymously
      </label>

      <button
        type="submit"
        className="w-full bg-green-600 text-white font-semibold py-2 mt-6 rounded-md hover:bg-green-700 transition"
      >
        Submit
      </button>
    </form>
  );
}

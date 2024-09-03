"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AddTheater = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [amenities, setAmenities] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const amenitiesArray = amenities
      .split(",")
      .map((amenity) => amenity.trim());

    const theaterData = {
      name,
      location,
      amenities: amenitiesArray,
      totalSeats: parseInt(totalSeats),
    };

    try {
      const response = await fetch("http://localhost:5000/api/theaters/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(theaterData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Theater added successfully..👍");
        setTimeout(() => {
          router.push("/admin/theaters");
        }, 1500);
      } else {
        setError(data.message || "Failed to add theater");
      }
    } catch (error) {
      setError("An error occurred while adding the theater");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Add New Theater</h1>
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-4 bg-green-200 border border-green-400 text-green-900 rounded">
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium">
            Theater Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border border-gray-300 p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block font-medium">
            Location
          </label>
          <input
            type="text"
            id="location"
            className="w-full border border-gray-300 p-2 rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amenities" className="block font-medium">
            Amenities (comma-separated)
          </label>
          <input
            type="text"
            id="amenities"
            className="w-full border border-gray-300 p-2 rounded"
            value={amenities}
            onChange={(e) => setAmenities(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="totalSeats" className="block font-medium">
            Total Seats
          </label>
          <input
            type="number"
            id="totalSeats"
            className="w-full border border-gray-300 p-2 rounded"
            value={totalSeats}
            onChange={(e) => setTotalSeats(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Theater
        </button>
      </form>
    </div>
  );
};

export default AddTheater;

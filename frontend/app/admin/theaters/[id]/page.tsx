"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

const EditTheater = () => {
  const router = useRouter();
  const { id } = useParams(); // Get the theater ID from the URL
  const [success, setSuccess] = useState("");
  const [theater, setTheater] = useState({
    name: "",
    location: "",
    amenities: "",
    totalSeats: 0,
  });

  useEffect(() => {
    // Fetch the theater details to populate the form
    fetch(`http://localhost:5000/api/theaters/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTheater({
          name: data.name,
          location: data.location,
          amenities: data.amenities.join(", "), // Convert array to comma-separated string
          totalSeats: data.totalSeats,
        });
      })
      .catch((error) => console.error("Error fetching theater:", error));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Update theater details
    try {
      const response = await fetch(`http://localhost:5000/api/theaters/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(theater),
      });

      if (response.ok) {
        setSuccess("Theater Details Updated successfully..👍");
        setTimeout(() => {
          router.push("/admin/theaters");
        }, 1500);
      } else {
        console.error("Failed to update theater");
      }
    } catch (error) {
      console.error("Error updating theater:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheater({ ...theater, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Edit Theater</h1>
      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded shadow-md">
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium">Name:</label>
          <input
            type="text"
            name="name"
            value={theater.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Location:</label>
          <input
            type="text"
            name="location"
            value={theater.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Amenities:</label>
          <input
            type="text"
            name="amenities"
            value={theater.amenities}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Total Seats:</label>
          <input
            type="number"
            name="totalSeats"
            value={theater.totalSeats}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditTheater;

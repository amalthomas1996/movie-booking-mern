"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const TheaterForm = () => {
  const router = useRouter();
  const { id } = useParams();
  const [theater, setTheater] = useState({
    name: "",
    location: "",
    totalSeats: 0,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      fetch(`/api/theaters/${id}`)
        .then((res) => res.json())
        .then((data) => setTheater(data))
        .catch((error) => console.error("Error fetching theater:", error));
    }
  }, [id]);

  const handleChange = (e: any) => {
    setTheater({ ...theater, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const method = isEditing ? "PUT" : "POST";
      const response = await fetch(
        `/api/theaters${isEditing ? `/${id}` : ""}`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(theater),
        }
      );
      if (response.ok) {
        router.push("/admin/theaters");
      } else {
        console.error("Error saving theater");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        {isEditing ? "Edit Theater" : "Add Theater"}
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Theater Name"
          value={theater.name}
          onChange={handleChange}
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={theater.location}
          onChange={handleChange}
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="number"
          name="totalSeats"
          placeholder="Total Seats"
          value={theater.totalSeats}
          onChange={handleChange}
          className="block w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isEditing ? "Update Theater" : "Add Theater"}
        </button>
      </form>
    </div>
  );
};

export default TheaterForm;

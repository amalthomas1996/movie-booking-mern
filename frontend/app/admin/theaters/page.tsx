"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Theaters = () => {
  const [theaters, setTheaters] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/theaters")
      .then((res) => res.json())
      .then((data) => setTheaters(data))
      .catch((error) => console.error("Error fetching theaters:", error));
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/admin/theaters/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/theaters/${id}`, { method: "DELETE" });
      setTheaters(theaters.filter((theater: any) => theater._id !== id));
    } catch (error) {
      console.error("Error deleting theater:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Manage Theaters</h1>
      <button
        onClick={() => router.push("/admin/theaters/new")}
        className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add New Theater
      </button>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Location</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {theaters.map((theater: any) => (
            <tr key={theater._id}>
              <td className="border border-gray-300 p-2">{theater.name}</td>
              <td className="border border-gray-300 p-2">{theater.location}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleEdit(theater._id)}
                  className="mr-2 p-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(theater._id)}
                  className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Theaters;

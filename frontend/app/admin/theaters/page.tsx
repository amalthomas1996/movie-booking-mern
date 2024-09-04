"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmationModal from "../../components/ConfirmationModal";

const Theaters = () => {
  const [theaters, setTheaters] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTheaterId, setSelectedTheaterId] = useState<string | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5000/api/theaters")
      .then((res) => res.json())
      .then((data) => setTheaters(data))
      .catch((error) => console.error("Error fetching theaters:", error));
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/admin/theaters/${id}`);
  };

  const handleDelete = async () => {
    if (selectedTheaterId) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/theaters/${selectedTheaterId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setTheaters(
            theaters.filter((theater: any) => theater._id !== selectedTheaterId)
          );
          setIsModalOpen(false);
        } else {
          console.error("Error deleting theater:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting theater:", error);
      }
    }
  };

  const openDeleteModal = (id: string) => {
    setSelectedTheaterId(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setSelectedTheaterId(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Manage Theaters</h1>
      <button
        onClick={() => router.push("/admin/theaters/add-theater")}
        className="text-black-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-black-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
      >
        Add New Theater ➕
      </button>
      <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden font-sans">
        <thead className="bg-gray-100">
          <tr>
            <th className="border-b-2 border-gray-200 p-3 text-left text-lg font-semibold text-gray-700">
              Name
            </th>
            <th className="border-b-2 border-gray-200 p-3 text-left text-lg font-semibold text-gray-700">
              Location
            </th>
            <th className="border-b-2 border-gray-200 p-3 text-left text-lg font-semibold text-gray-700">
              Amenities
            </th>
            <th className="border-b-2 border-gray-200 p-3 text-left text-lg font-semibold text-gray-700">
              Total Seats
            </th>
            <th className="border-b-2 border-gray-200 p-3 text-left text-lg font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {theaters.map((theater: any) => (
            <tr key={theater._id} className="hover:bg-gray-50">
              <td className="p-3 text-sm text-gray-700">{theater.name}</td>
              <td className="p-3 text-sm text-gray-700">{theater.location}</td>
              <td className="p-3 text-sm text-gray-700">
                {theater.amenities.join(", ")}
              </td>
              <td className="p-3 text-sm text-gray-700">
                {theater.totalSeats}
              </td>
              <td className="p-3 text-sm text-gray-700">
                <div className="flex justify-left space-x-2">
                  <button
                    onClick={() => handleEdit(theater._id)}
                    className="text-black hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(theater._id)}
                    className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmationModal
        isOpen={isModalOpen}
        message="Do you really want to delete this theater?"
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
      />
    </div>
  );
};

export default Theaters;

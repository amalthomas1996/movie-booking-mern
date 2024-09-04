"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmationModal from "../../components/ConfirmationModal";

const Showtimes = () => {
  const [showtimes, setShowtimes] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedShowtimeId, setSelectedShowtimeId] = useState<string | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5000/api/showtimes")
      .then((res) => res.json())
      .then((data) => setShowtimes(data))
      .catch((error) => console.error("Error fetching showtimes:", error));
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/admin/showtimes/${id}`);
  };

  const handleDelete = async () => {
    if (selectedShowtimeId) {
      try {
        await fetch(
          `http://localhost:5000/api/showtimes/${selectedShowtimeId}`,
          {
            method: "DELETE",
          }
        );
        setShowtimes(
          showtimes.filter(
            (showtime: any) => showtime._id !== selectedShowtimeId
          )
        );
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error deleting showtime:", error);
      }
    }
  };

  const openDeleteModal = (id: string) => {
    setSelectedShowtimeId(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setSelectedShowtimeId(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Manage Showtimes</h1>
      <button
        onClick={() => router.push("/admin/showtimes/add-showtime")}
        className="text-black-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-black-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
      >
        Add New Showtime ➕
      </button>
      <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden font-sans">
        <thead className="bg-gray-100">
          <tr>
            <th className="border-b-2 border-gray-200 p-3 text-left text-base font-semibold text-gray-700">
              Movie
            </th>
            <th className="border-b-2 border-gray-200 p-3 text-left text-base font-semibold text-gray-700">
              Theater
            </th>
            <th className="border-b-2 border-gray-200 p-3 text-left text-base font-semibold text-gray-700">
              Showtime
            </th>
            <th className="border-b-2 border-gray-200 p-3 text-left text-base font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {showtimes.map((showtime: any) => (
            <tr key={showtime._id} className="hover:bg-gray-100">
              <td className="p-3 text-sm text-gray-700">
                {showtime.movie.title}
              </td>
              <td className="p-3 text-sm text-gray-700">
                {showtime.theater.name}
              </td>
              <td className="p-3 text-sm text-gray-700">
                {new Date(showtime.showtime).toLocaleString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </td>
              <td className="p-3 text-sm text-gray-700">
                <div className="flex justify-left space-x-2">
                  <button
                    onClick={() => handleEdit(showtime._id)}
                    className="text-black hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(showtime._id)}
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
        message="Do you really want to delete this showtime?"
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
      />
    </div>
  );
};

export default Showtimes;

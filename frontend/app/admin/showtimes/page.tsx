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
        className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add New Showtime
      </button>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Movie</th>
            <th className="border border-gray-300 p-2">Theater</th>
            <th className="border border-gray-300 p-2">Showtime</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {showtimes.map((showtime: any) => (
            <tr key={showtime._id}>
              <td className="border border-gray-300 p-2">
                {showtime.movie.title}
              </td>
              <td className="border border-gray-300 p-2">
                {showtime.theater.name}
              </td>
              <td className="border border-gray-300 p-2">
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
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleEdit(showtime._id)}
                  className="mr-2 p-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => openDeleteModal(showtime._id)}
                  className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
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

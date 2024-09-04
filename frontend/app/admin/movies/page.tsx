"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmationModal from "../../components/ConfirmationModal";

const Movies = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5000/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/admin/movies/${id}`);
  };

  const handleDelete = async () => {
    if (selectedMovieId) {
      try {
        await fetch(`http://localhost:5000/api/movies/${selectedMovieId}`, {
          method: "DELETE",
        });
        setMovies(movies.filter((movie: any) => movie._id !== selectedMovieId));
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error deleting movie:", error);
      }
    }
  };

  const openDeleteModal = (id: string) => {
    setSelectedMovieId(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setSelectedMovieId(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Manage Movies</h1>
      <button
        onClick={() => router.push("/admin/movies/add-movie")}
        className="text-black-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-black-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
      >
        Add New Movie ➕
      </button>
      <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden font-sans">
        <thead className="bg-gray-100">
          <tr>
            <th className="border-b-2 border-gray-200 p-3 text-left text-base font-semibold text-gray-700">
              Title
            </th>
            <th className="border-b-2 border-gray-200 p-3 text-left text-base font-semibold text-gray-700">
              Description
            </th>
            <th className="border-b-2 border-gray-200 p-3 text-left text-base font-semibold text-gray-700">
              Genre
            </th>
            <th className="border-b-2 border-gray-200 p-3 text-left text-base font-semibold text-gray-700">
              Year
            </th>
            <th className="border-b-2 border-gray-200 p-3 text-left text-base font-semibold text-gray-700">
              Director
            </th>
            <th className="border-b-2 border-gray-200 p-3 text-left text-base font-semibold text-gray-700">
              Writer
            </th>
            <th className="border-b-2 border-gray-200 p-3 text-left text-base font-semibold text-gray-700">
              Actors
            </th>
            <th className="border-b-2 border-gray-200 p-3 text-left text-base font-semibold text-gray-700">
              Language
            </th>
            <th className="border-b-2 border-gray-200 p-3 text-left text-base font-semibold text-gray-700">
              Duration
            </th>
            <th className="border-b-2 border-gray-200 p-3 text-center text-base font-semibold text-gray-700">
              Poster
            </th>
            <th className="border-b-2 border-gray-200 p-3 text-left text-base font-semibold text-gray-700">
              Rating
            </th>
            <th className="border-b-2 border-gray-200 p-3 text-left text-base font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie: any) => (
            <tr key={movie._id} className="hover:bg-gray-100">
              <td className="p-3 text-sm text-gray-700">{movie.title}</td>
              <td className="p-3 text-sm text-gray-700">{movie.description}</td>
              <td className="p-3 text-sm text-gray-700">
                {movie.genre.join(", ")}
              </td>
              <td className="p-3 text-sm text-gray-700">{movie.year}</td>
              <td className="p-3 text-sm text-gray-700">{movie.director}</td>
              <td className="p-3 text-sm text-gray-700">{movie.writer}</td>
              <td className="p-3 text-sm text-gray-700">{movie.actors}</td>
              <td className="p-3 text-sm text-gray-700">{movie.language}</td>
              <td className="p-3 text-sm text-gray-700">
                {movie.duration} min
              </td>
              <td className="p-2 flex items-center justify-center">
                {movie.image ? (
                  <img
                    src={movie.image}
                    alt={movie.title || "Movie Image"}
                    className="w-34 h-24 object-cover"
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td className="p-3 text-sm text-gray-700">{movie.rating}</td>
              <td className="p-3 text-sm text-gray-700">
                <div className="flex justify-left space-x-2">
                  <button
                    onClick={() => handleEdit(movie._id)}
                    className="text-black hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(movie._id)}
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
        message="Do you really want to delete this movie?"
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
      />
    </div>
  );
};

export default Movies;

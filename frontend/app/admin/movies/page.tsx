"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Movies = () => {
  const [movies, setMovies] = useState([]);
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

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/movies/${id}`, {
        method: "DELETE",
      });
      setMovies(movies.filter((movie: any) => movie._id !== id));
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Manage Movies</h1>
      <button
        onClick={() => router.push("/admin/movies/add-movie")}
        className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add New Movie
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
              <td className="p-3 text-sm text-gray-700">{movie.genre}</td>
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
                    onClick={() => handleDelete(movie._id)}
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
    </div>
  );
};

export default Movies;

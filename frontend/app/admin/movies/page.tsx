"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/admin/movies/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/movies/${id}`, { method: "DELETE" });
      setMovies(movies.filter((movie: any) => movie._id !== id));
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Manage Movies</h1>
      <button
        onClick={() => router.push("/admin/movies/new")}
        className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add New Movie
      </button>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Director</th>
            <th className="border border-gray-300 p-2">Genre</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie: any) => (
            <tr key={movie._id}>
              <td className="border border-gray-300 p-2">{movie.title}</td>
              <td className="border border-gray-300 p-2">{movie.director}</td>
              <td className="border border-gray-300 p-2">{movie.genre}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleEdit(movie._id)}
                  className="mr-2 p-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(movie._id)}
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

export default Movies;

"use client";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";

// Define Theater and Movie types
interface Theater {
  _id: string;
  name: string;
}

interface Movie {
  _id: string;
  title: string;
}

const CreateShowtime = () => {
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showtime, setShowtime] = useState("");
  const [selectedTheater, setSelectedTheater] = useState<string>("");
  const [selectedMovie, setSelectedMovie] = useState<string>("");
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({ message: "", type: null });
  const router = useRouter();

  useEffect(() => {
    // Fetch theaters and movies to populate the select options
    fetch("http://localhost:5000/api/theaters")
      .then((res) => res.json())
      .then((data: Theater[]) => setTheaters(data));

    fetch("http://localhost:5000/api/movies")
      .then((res) => res.json())
      .then((data: Movie[]) => setMovies(data));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const showtimeData = {
      theater: selectedTheater,
      movie: selectedMovie,
      showtime,
    };

    try {
      const response = await fetch("http://localhost:5000/api/showtimes/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(showtimeData),
      });

      const data = await response.json();

      if (response.ok) {
        setAlert({ message: data.message, type: "success" });
        router.push("/admin/showtimes");
      } else {
        setAlert({ message: data.message, type: "error" });
      }
    } catch (error) {
      setAlert({ message: "Failed to create showtime", type: "error" });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Create Showtime</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="theater"
            className="block text-sm font-medium text-gray-700"
          >
            Select Theater
          </label>
          <select
            id="theater"
            value={selectedTheater}
            onChange={(e) => setSelectedTheater(e.target.value)}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
          >
            <option value="" disabled>
              -- Select Theater --
            </option>
            {theaters.map((theater) => (
              <option key={theater._id} value={theater._id}>
                {theater.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="movie"
            className="block text-sm font-medium text-gray-700"
          >
            Select Movie
          </label>
          <select
            id="movie"
            value={selectedMovie}
            onChange={(e) => setSelectedMovie(e.target.value)}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
          >
            <option value="" disabled>
              -- Select Movie --
            </option>
            {movies.map((movie) => (
              <option key={movie._id} value={movie._id}>
                {movie.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="showtime"
            className="block text-sm font-medium text-gray-700"
          >
            Showtime
          </label>
          <input
            type="datetime-local"
            id="showtime"
            value={showtime}
            onChange={(e) => setShowtime(e.target.value)}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Showtime
        </button>
      </form>
      {alert.message && (
        <div
          className={`mt-4 p-2 rounded ${
            alert.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {alert.message}
        </div>
      )}
    </div>
  );
};

export default CreateShowtime;

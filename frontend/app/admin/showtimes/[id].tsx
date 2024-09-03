"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const ShowtimeForm = () => {
  const router = useRouter();
  const { id } = useParams();
  const [showtime, setShowtime] = useState({
    movieId: "",
    theaterId: "",
    showtime: "",
  });
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch("/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));

    fetch("/api/theaters")
      .then((res) => res.json())
      .then((data) => setTheaters(data))
      .catch((error) => console.error("Error fetching theaters:", error));

    if (id) {
      setIsEditing(true);
      fetch(`/api/showtimes/${id}`)
        .then((res) => res.json())
        .then((data) => setShowtime(data))
        .catch((error) => console.error("Error fetching showtime:", error));
    }
  }, [id]);

  const handleChange = (e: any) => {
    setShowtime({ ...showtime, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const method = isEditing ? "PUT" : "POST";
      const response = await fetch(
        `/api/showtimes${isEditing ? `/${id}` : ""}`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(showtime),
        }
      );
      if (response.ok) {
        router.push("/admin/showtimes");
      } else {
        console.error("Error saving showtime");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        {isEditing ? "Edit Showtime" : "Add Showtime"}
      </h1>
      <form onSubmit={handleSubmit}>
        <select
          name="movieId"
          value={showtime.movieId}
          onChange={handleChange}
          className="block w-full p-2 mb-4 border rounded"
        >
          <option value="">Select Movie</option>
          {movies.map((movie: any) => (
            <option key={movie._id} value={movie._id}>
              {movie.title}
            </option>
          ))}
        </select>
        <select
          name="theaterId"
          value={showtime.theaterId}
          onChange={handleChange}
          className="block w-full p-2 mb-4 border rounded"
        >
          <option value="">Select Theater</option>
          {theaters.map((theater: any) => (
            <option key={theater._id} value={theater._id}>
              {theater.name}
            </option>
          ))}
        </select>
        <input
          type="datetime-local"
          name="showtime"
          value={showtime.showtime}
          onChange={handleChange}
          className="block w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isEditing ? "Update Showtime" : "Add Showtime"}
        </button>
      </form>
    </div>
  );
};

export default ShowtimeForm;

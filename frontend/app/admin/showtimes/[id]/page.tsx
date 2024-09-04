"use client";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";

interface Movie {
  _id: string;
  title: string;
}

interface Theater {
  _id: string;
  name: string;
}

interface Showtime {
  movieId: string;
  theaterId: string;
  showtime: string;
}

const ShowtimeForm = () => {
  const router = useRouter();
  const { id } = useParams();
  const [showtime, setShowtime] = useState<Showtime>({
    movieId: "",
    theaterId: "",
    showtime: "",
  });
  const [movies, setMovies] = useState<Movie[]>([]);
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<string | null>(null);

  useEffect(() => {
    // Fetch movies and theaters
    const fetchData = async () => {
      try {
        const moviesRes = await fetch("http://localhost:5000/api/movies");
        const moviesData = await moviesRes.json();
        setMovies(moviesData);

        const theatersRes = await fetch("http://localhost:5000/api/theaters");
        const theatersData = await theatersRes.json();
        setTheaters(theatersData);

        if (id) {
          setIsEditing(true);
          setLoading(true);
          const showtimeRes = await fetch(
            `http://localhost:5000/api/showtimes/${id}`
          );
          const showtimeData = await showtimeRes.json();
          setShowtime(showtimeData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setAlert("Failed to fetch data. Please try again.");
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setShowtime({ ...showtime, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(showtime);
    setAlert(null);

    try {
      const method = isEditing ? "PUT" : "POST";
      const response = await fetch(
        `http://localhost:5000/api/showtimes${isEditing ? `/${id}` : ""}`,
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
        const data = await response.json();
        setAlert(data.message || "Error saving showtime");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setAlert("Failed to save showtime. Please try again.");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        {isEditing ? "Edit Showtime" : "Add Showtime"}
      </h1>
      {alert && (
        <div className="p-2 mb-4 text-white bg-red-500 rounded">{alert}</div>
      )}
      {!loading ? (
        <form onSubmit={handleSubmit}>
          <select
            name="movieId"
            value={showtime.movieId}
            onChange={handleChange}
            className="block w-full p-2 mb-4 border rounded"
          >
            <option value="">Select Movie</option>
            {movies.map((movie) => (
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
            {theaters.map((theater) => (
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
            required
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isEditing ? "Update Showtime" : "Add Showtime"}
          </button>
        </form>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ShowtimeForm;

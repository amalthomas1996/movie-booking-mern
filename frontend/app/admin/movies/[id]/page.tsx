"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const MovieForm = () => {
  const router = useRouter();
  const { id } = useParams();
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    releaseDate: "",
    rating: "",
    image: "",
    duration: "",
    genre: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      fetch(`http://localhost:5000/api/movies/${id}`)
        .then((res) => res.json())
        .then((data) => setMovie(data))
        .catch((error) => console.error("Error fetching movie:", error));
    }
  }, [id]);

  const handleChange = (e: any) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const method = isEditing ? "PUT" : "POST";
      const response = await fetch(`/api/movies${isEditing ? `/${id}` : ""}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      });
      if (response.ok) {
        router.push("/admin/movies");
      } else {
        console.error("Error saving movie");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        {isEditing ? "Edit Movie" : "Add Movie"}
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Movie Title"
          value={movie.title}
          onChange={handleChange}
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="description"
          placeholder="description"
          value={movie.description}
          onChange={handleChange}
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="rating"
          placeholder="rating"
          value={movie.rating}
          onChange={handleChange}
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="date"
          name="releaseDate"
          value={movie.releaseDate}
          onChange={handleChange}
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="image"
          placeholder="image"
          value={movie.image}
          onChange={handleChange}
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="duration"
          placeholder="duration"
          value={movie.duration}
          onChange={handleChange}
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="genre"
          placeholder="genre"
          value={movie.genre}
          onChange={handleChange}
          className="block w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isEditing ? "Update Movie" : "Add Movie"}
        </button>
      </form>
    </div>
  );
};

export default MovieForm;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AddMovie = () => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState<number | "">(0);
  const [image, setImage] = useState("");
  const [duration, setDuration] = useState<number | "">(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const movieData = {
      title,
      genre: genre.split(",").map((g) => g.trim()),
      releaseDate,
      description,
      rating: parseFloat(rating.toString()),
      image,
      duration: parseInt(duration.toString()),
    };

    try {
      const response = await fetch("http://localhost:5000/api/movies/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Movie added successfully");
        setTimeout(() => {
          router.push("/admin/movies");
        }, 1500);
      } else {
        setError(data.message || "Failed to add movie");
      }
    } catch (error) {
      setError("An error occurred while adding the movie");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Add New Movie</h1>
      {error && (
        <p className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded shadow-md">
          {error}
        </p>
      )}
      {success && (
        <p className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded shadow-md">
          {success}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium">
            Movie Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full border border-gray-300 p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="genre" className="block font-medium">
            Genre (comma-separated)
          </label>
          <input
            type="text"
            id="genre"
            className="w-full border border-gray-300 p-2 rounded"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="releaseDate" className="block font-medium">
            Release Date
          </label>
          <input
            type="date"
            id="releaseDate"
            className="w-full border border-gray-300 p-2 rounded"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium">
            Description
          </label>
          <textarea
            id="description"
            className="w-full border border-gray-300 p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rating" className="block font-medium">
            Rating (0-10)
          </label>
          <input
            type="number"
            id="rating"
            className="w-full border border-gray-300 p-2 rounded"
            value={rating}
            onChange={(e) => setRating(parseFloat(e.target.value))}
            min={0}
            max={10}
            step={0.1}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block font-medium">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            className="w-full border border-gray-300 p-2 rounded"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="duration" className="block font-medium">
            Duration (minutes)
          </label>
          <input
            type="number"
            id="duration"
            className="w-full border border-gray-300 p-2 rounded"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovie;

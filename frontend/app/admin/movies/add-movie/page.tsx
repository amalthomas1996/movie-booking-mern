"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AddMovie = () => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState<number | "">(0);
  const [image, setImage] = useState("");
  const [duration, setDuration] = useState<number | "">(0);
  const [director, setDirector] = useState("");
  const [writer, setWriter] = useState("");
  const [actors, setActors] = useState("");
  const [language, setLanguage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [movieName, setMovieName] = useState("");
  const [movieDetails, setMovieDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?t=${encodeURIComponent(
          movieName
        )}&y=${encodeURIComponent(year)}&apikey=ed276f69`
      );
      const data = await response.json();
      if (data.Response === "True") {
        setMovieDetails(data);
        setTitle(data.Title);
        setGenre(data.Genre);
        setReleaseDate(data.Released);
        setDescription(data.Plot);
        setRating(data.imdbRating);
        setImage(data.Poster);
        setDuration(data.Runtime.replace(" min", ""));
        setDirector(data.Director);
        setWriter(data.Writer);
        setActors(data.Actors);
        setLanguage(data.Language);
      } else {
        setError(data.Error);
        setMovieDetails(null);
      }
    } catch (error) {
      setError("Failed to fetch movie details");
      setMovieDetails(null);
    } finally {
      setLoading(false);
    }
  };

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
      director,
      writer,
      actors,
      language,
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
    <div>
      <h1 className="text-3xl font-bold mb-4">Add New Movie</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            placeholder="Enter movie title"
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Enter movie year (optional)"
            className="p-2 border rounded w-full mt-2"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {movieDetails && (
          <>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Movie Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Movie Title"
                className="p-2 border rounded w-full"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Movie Genre
              </label>
              <input
                type="text"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="Movie Genre"
                className="p-2 border rounded w-full"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Release Date
              </label>
              <input
                type="text"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                placeholder="Release Date"
                className="p-2 border rounded w-full"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Director
              </label>
              <input
                type="text"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                placeholder="Director"
                className="p-2 border rounded w-full"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Writer
              </label>
              <input
                type="text"
                value={writer}
                onChange={(e) => setWriter(e.target.value)}
                placeholder="Writer"
                className="p-2 border rounded w-full"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Actors
              </label>
              <input
                type="text"
                value={actors}
                onChange={(e) => setActors(e.target.value)}
                placeholder="Actors"
                className="p-2 border rounded w-full"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Language
              </label>
              <input
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="Language"
                className="p-2 border rounded w-full"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Movie Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Movie Description"
                className="p-2 border rounded w-full"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                IMDb Rating
              </label>
              <input
                type="text"
                value={rating}
                onChange={(e) => setRating(e.target.value as number | "")}
                placeholder="IMDb Rating"
                className="p-2 border rounded w-full"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Movie Poster URL
              </label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Movie Poster URL"
                className="p-2 border rounded w-full"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Duration (minutes)
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value as number | "")}
                placeholder="Duration"
                className="p-2 border rounded w-full"
              />
            </div>
          </>
        )}
        <button
          type="submit"
          className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovie;

import MovieCard from "./MovieCard";

const MovieSection = ({ category }) => {
  // Dummy data; this would eventually be fetched from an API
  const movies = [
    { title: "Movie 1", poster: "/poster1.jpg" },
    { title: "Movie 2", poster: "/poster2.jpg" },
    { title: "Movie 3", poster: "/poster3.jpg" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
      ))}
    </div>
  );
};

export default MovieSection;

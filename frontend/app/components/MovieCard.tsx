const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{movie.title}</h3>
        <a href="#" className="text-red-600 mt-2 block">
          View Details
        </a>
      </div>
    </div>
  );
};

export default MovieCard;

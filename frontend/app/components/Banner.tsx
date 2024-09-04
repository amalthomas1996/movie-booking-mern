const Banner = () => {
  return (
    <div
      className="relative h-96 bg-cover bg-center"
      style={{ backgroundImage: "url('/banner-image.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center text-white py-20">
        <h1 className="text-5xl font-bold">Welcome to Moviepeak</h1>
        <p className="mt-4 text-xl">
          Book tickets for the latest movies in your city
        </p>
        <button className="mt-6 px-6 py-2 bg-red-600 text-white font-semibold rounded-md">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Banner;

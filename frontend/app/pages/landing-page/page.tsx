"use client";
import React from "react";

const LandingPage = () => {
  return (
    <div>
      <main className="bg-gray-100 min-h-full py-16">
        <section className="container mx-auto text-center mb-8">
          <h2 className="text-4xl font-semibold text-gray-800">
            Welcome to Movie Ticket Booking
          </h2>
          <p className="text-gray-600 mt-4">
            Book your tickets for the latest movies in just a few clicks!
          </p>
        </section>

        <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Example movie cards */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <img
              src="/movie-poster.jpg"
              alt="Movie Poster"
              className="rounded-md"
            />
            <h3 className="text-xl font-bold mt-4">Movie Title</h3>
            <p className="text-gray-600 mt-2">description of the movie.</p>
            <a href="/movies" className="block text-red-600 mt-4">
              Book Tickets
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;

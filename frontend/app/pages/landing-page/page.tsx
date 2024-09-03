"use client";
import React from "react";
import Banner from "../../components/Banner";
import MovieSection from "../../components/MovieSection";

const LandingPage = () => {
  return (
    <div>
      <div className="min-h-full flex flex-col">
        <main className="flex-grow">
          <Banner />
          <section className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Now Showing</h2>
            <MovieSection category="now-showing" />
          </section>
          <section className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
            <MovieSection category="coming-soon" />
          </section>
          <section className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Top Rated</h2>
            <MovieSection category="top-rated" />
          </section>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;

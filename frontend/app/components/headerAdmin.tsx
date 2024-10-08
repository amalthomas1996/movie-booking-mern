"use client";
import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          <Link href="/">Moviepeak-admin</Link>
        </h1>
        <nav>
          <Link href="/login" className="mr-4 hover:underline">
            Sign In
          </Link>
          <Link href="/movies" className="hover:underline"></Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

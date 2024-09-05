"use client";
import React from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          <Link href="/">Moviepeak</Link>
        </h1>
        <nav>
          <button onClick={() => signIn("google")}>Sign In</button>
          <Link href="/movies" className="hover:underline">
            Movies
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

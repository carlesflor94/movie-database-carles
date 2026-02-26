"use client";

import { useState } from "react";
import MovieGrid from "@/components/MovieGrid";
import SearchBar from "@/components/SearchBar";
import { Movie } from "@/types/movie";

export default function Home() {
  return (
    <main className="container">
      <SearchBar />
      <MovieGrid movies={movies} />
    </main>
  );
}

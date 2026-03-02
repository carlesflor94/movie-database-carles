"use client";

import { useState } from "react";
import MovieGrid from "@/components/MovieGrid";
import SearchBar from "@/components/SearchBar";
import Tabs from "@/components/Tabs";
import { Movie } from "@/types/movie";
import styles from "./page.module.css";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"search" | "rated">("search");

  const handleSearch = async () => {
    if (!query.trim()) return;
    const res = await fetch(`/api/movies?query=${encodeURIComponent(query)}`);
    const data = await res.json();
    setMovies(data.results);
  };

  return (
    <main className={styles.container}>
      <Tabs activeTab={activeTab} onChange={setActiveTab} />
      <SearchBar value={query} onChange={setQuery} onSearch={handleSearch} />
      <MovieGrid movies={movies} />
    </main>
  );
}

"use client";

import { useState } from "react";
import { Tabs } from "antd";
import MovieGrid from "@/components/MovieGrid";
import SearchBar from "@/components/SearchBar";
import { Movie } from "@/types/movie";
import styles from "./page.module.css";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("search");

  const handleSearch = async () => {
    if (!query.trim()) return;
    const res = await fetch(`/api/movies?query=${encodeURIComponent(query)}`);
    const data = await res.json();
    setMovies(data.results);
  };

  const tabItems = [
    {
      key: "search",
      label: "Search",
      children: (
        <>
          <SearchBar
            value={query}
            onChange={setQuery}
            onSearch={handleSearch}
          />
          <MovieGrid movies={movies} />
        </>
      ),
    },
    {
      key: "rated",
      label: "Rated",
      children: <div>Rated movies by User</div>,
    },
  ];

  return (
    <main className={styles.container}>
      <Tabs
        centered
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        items={tabItems}
      />
    </main>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Tabs, Pagination, Spin, Alert, Empty } from "antd";
import MovieGrid from "@/components/MovieGrid";
import SearchBar from "@/components/SearchBar";
import { Movie } from "@/types/movie";
import { useRouter, usePathname } from "next/navigation";
import { rateMovie } from "@/services/guestSession";
import styles from "./page.module.css";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageResults, setPageResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offline, setOffline] = useState(!navigator.onLine);
  const [guestSession, setGuestSession] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const activeTab = pathname.includes("/rated") ? "rated" : "search";

  useEffect(() => {
    const handleOnline = () => setOffline(false);
    const handleOffline = () => setOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    async function logIn() {
      if (guestSession) return;
      try {
        const res = await fetch("/api/movies/guest-session");
        if (!res.ok) throw new Error("Failed to fetch guest session");
        const data = await res.json();
        setGuestSession(data.guestSessionId);
      } catch (err) {
        console.error("Failed to login", err);
      }
    }
    logIn();
  }, [guestSession]);

  const handleSearch = async (searchQuery: string, pageNumber = 1) => {
    if (!searchQuery.trim()) return;
    if (!navigator.onLine) {
      setError("Please check the internet connection");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/movies?query=${encodeURIComponent(searchQuery)}&page=${pageNumber}`,
      );

      if (!res.ok) {
        throw new Error("Movies not found");
      }

      const data = await res.json();
      setMovies(data.results);
      setPageResults(data.total_results);
      setPage(pageNumber);
    } catch (err) {
      setError("Error while fetching movie data");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    handleSearch(query, pageNumber);
  };

  const handleRate = async (movieId: string, rating: number) => {
    if (!guestSession) return;

    try {
      await rateMovie(movieId, guestSession, rating);
    } catch (error) {
      console.error("Failed white rating the movie", error);
    }
  };

  const tabItems = [
    { key: "search", label: "Search" },
    { key: "rated", label: "Rated" },
  ];

  return (
    <main className={styles.container}>
      <Tabs
        centered
        activeKey={activeTab}
        onChange={(key) => {
          if (key === "rated") router.push("/rated");
        }}
        items={tabItems}
      />

      {activeTab === "search" && (
        <>
          <SearchBar
            value={query}
            onChange={setQuery}
            onSearch={handleSearch}
          />
          {error && (
            <Alert message="Error" description={error} type="error" showIcon />
          )}
          {loading ? (
            <div className={styles.spinner}>
              <Spin size="large" />
            </div>
          ) : movies.length === 0 && !loading && !error && query ? (
            <Empty description="Movie not found" />
          ) : (
            <MovieGrid movies={movies} onRate={handleRate} />
          )}

          {movies.length > 0 && !loading && !error && (
            <Pagination
              className={styles.pagination}
              current={page}
              total={pageResults}
              pageSize={20}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          )}
        </>
      )}
    </main>
  );
}

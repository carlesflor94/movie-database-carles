"use client";

import { useState, useEffect } from "react";
import { Tabs, Pagination, Spin, Alert } from "antd";
import MovieGrid from "@/components/MovieGrid";
import SearchBar from "@/components/SearchBar";
import { Movie } from "@/types/movie";
import styles from "./page.module.css";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("search");
  const [page, setPage] = useState(1);
  const [pageResults, setPageResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offline, setOffline] = useState(!navigator.onLine);

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
      setPageResults(data.total_pages);
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

  const tabItems = [
    { key: "search", label: "Search" },
    { key: "rated", label: "Rated" },
  ];

  return (
    <main className={styles.container}>
      <Tabs
        centered
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
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
          <Spin spinning={loading}>
            <MovieGrid movies={movies} />
          </Spin>
          {movies.length > 0 && !loading && !error && (
            <Pagination
              className={styles.pagination}
              current={page}
              total={pageResults}
              pageSize={6}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          )}
        </>
      )}
    </main>
  );
}

"use client";

import { useState } from "react";
import { Tabs, Pagination, Spin } from "antd";
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

  const handleSearch = async (pageNumber = 1) => {
    if (!query.trim()) return;
    setLoading(true);
    const res = await fetch(
      `/api/movies?query=${encodeURIComponent(query)}&page=${pageNumber}`,
    );
    const data = await res.json();
    setMovies(data.results);
    setPageResults(data.total_results);
    setPage(pageNumber);
    setLoading(false);
  };

  const handlePageChange = (pageNumber: number) => {
    handleSearch(pageNumber);
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
          <Spin spinning={loading}>
            <MovieGrid movies={movies} />
          </Spin>
          <Pagination
            className={styles.pagination}
            current={page}
            total={pageResults}
            pageSize={6}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </>
      )}
    </main>
  );
}

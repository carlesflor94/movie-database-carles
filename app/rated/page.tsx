"use client";

import { Tabs, Spin, Empty, Alert } from "antd";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import MovieGrid from "@/components/MovieGrid";
import { Movie } from "@/types/movie";
import styles from "../page.module.css";

export default function RatedPage() {
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = pathname.includes("/rated") ? "rated" : "search";

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getRated() {
      const guestSessionId = localStorage.getItem("guestSessionId");

      if (!guestSessionId) return;

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/movies/rated?guestSessionId=${guestSessionId}`,
        );

        if (!res.ok) throw new Error("Failed to get the rated movies by user");

        const data = await res.json();
        setMovies(data.results);
      } catch (err) {
        console.error(err);
        setError("Failed to load rated movies by user");
      } finally {
        setLoading(false);
      }
    }
    getRated();
  }, []);

  return (
    <main className={styles.container}>
      <Tabs
        centered
        activeKey={activeTab}
        onChange={(key) => {
          if (key === "search") router.push("/");
        }}
        items={[
          { key: "search", label: "Search" },
          { key: "rated", label: "Rated" },
        ]}
      />
      {error && (
        <Alert message="Error" description={error} type="error" showIcon />
      )}
      {loading ? (
        <Spin size="large" />
      ) : movies.length === 0 ? (
        <Empty description="No rated movies" />
      ) : (
        <MovieGrid movies={movies} />
      )}
    </main>
  );
}

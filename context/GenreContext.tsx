"use client";

import { useEffect, createContext, useContext, useState } from "react";

type Genre = {
  id: number;
  name: string;
};

type GenreContextType = {
  genres: Genre[];
  getGenreName: (id: number) => string;
};

const GenreContext = createContext<GenreContextType | undefined>(undefined);

export function GenreProvider({ children }: { children: React.ReactNode }) {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const res = await fetch("/api/movies/genres");
        const data = await res.json();
        setGenres(data.genres);
      } catch (err) {
        console.error("Failed to fetch genres", err);
      }
    }

    fetchGenres();
  }, []);

  const getGenreName = (id: number) => {
    const genre = genres.find((g) => g.id === id);
    return genre ? genre.name : "";
  };

  return (
    <GenreContext.Provider value={{ genres, getGenreName }}>
      {children}
    </GenreContext.Provider>
  );
}

export function useGenres() {
  const context = useContext(GenreContext);

  if (!context) {
    throw new Error("useGenres must be inside GenreProvider");
  }

  return context;
}

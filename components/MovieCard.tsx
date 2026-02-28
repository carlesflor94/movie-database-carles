"use client";

import { Movie } from "@/types/movie";
import styles from "./MovieCard.module.css";
import { Rate } from "antd";
import { useState } from "react";

type Props = {
  movie: Movie;
  onRate: (id: string, rating: number) => void;
};

export default function MovieCard({ movie, onRate }: Props) {
  const [userRating, setUserRating] = useState<number>(0);

  const handleChange = (value: number) => {
    setUserRating(value);
    onRate(movie.id, value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.posterWrapper}>
        {movie.poster && (
          <img src={movie.poster} alt={movie.title} className={styles.poster} />
        )}
      </div>

      <div className={styles.movieContent}>
        <div className={styles.header}>
          <h2 className={styles.title}>{movie.title}</h2>
          <p className={styles.rating}>{movie.rating}</p>
        </div>
        <p className={styles.date}>{movie.releaseDate}</p>
        <p className={styles.genres}>{movie.genres.join(", ")}</p>
        <p className={styles.description}>{movie.description}</p>
        <div className={styles.userRating}>
          <Rate count={10} value={userRating} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}

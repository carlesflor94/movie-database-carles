"use client";

import { Movie } from "@/types/movie";
import styles from "./MovieCard.module.css";
import { Rate, Tag } from "antd";
import { useState } from "react";
import { dateFormat } from "@/app/utils/dateFormat";
import { truncateDescription } from "@/app/utils/truncateDescription";

type Props = {
  movie: Movie;
  onRate?: (id: string, rating: number) => void;
};

export default function MovieCard({ movie, onRate }: Props) {
  const [userRating, setUserRating] = useState<number>(movie.userRating || 0);

  const handleChange = (value: number) => {
    setUserRating(value);
    onRate?.(movie.id, value);
  };

  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <div className={styles.posterWrapper}>
          <img
            src={movie.poster || "/poster-default.png"}
            alt={movie.title}
            className={styles.poster}
          />
        </div>

        <div className={styles.movieContent}>
          <div className={styles.header}>
            <h2 className={styles.title}>{movie.title}</h2>
            <p className={styles.rating}>
              {movie.rating ? movie.rating.toFixed(1) : "-"}
            </p>
          </div>
          <p className={styles.date}>{dateFormat(movie.releaseDate)}</p>
          <div className={styles.genres}>
            {movie.genres?.slice(0, 3).map((genre) => (
              <Tag key={genre}>{genre}</Tag>
            ))}
          </div>
          <p className={styles.description}>
            {truncateDescription(movie.description, 80)}
          </p>
          <div className={styles.userRating}>
            <Rate count={10} value={userRating} onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

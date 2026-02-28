import { Movie } from "@/types/movie";
import styles from "./MovieCard.module.css";

type Props = {
  movie: Movie;
};

export default function MovieCard({ movie }: Props) {
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
        <p className={styles.userRating}>Your rating</p>
      </div>
    </div>
  );
}

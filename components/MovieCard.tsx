import { Movie } from "@/types/movie";

type Props = {
  movie: Movie;
};

export default function MovieCard({ movie }: Props) {
  return (
    <div className="movie-container">
      {movie.poster && <img src={movie.poster} alt={movie.title} />}
      <div className="movie-wrapper-title">
        <h2 className="movie-title">{movie.title}</h2>
        <p className="movie-tmdb-rating">{movie.rating}</p>
      </div>
      <p className="movie-date">{movie.releaseDate}</p>
      <p className="movie-genres">{movie.genres.join(", ")}</p>
      <p className="movie-description">{movie.description}</p>
    </div>
  );
}

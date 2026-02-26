import { Movie } from "@/types/movie";
import MovieCard from "./MovieCard";

type Props = {
  movies: Movie[];
  onRate: (id: string, rating: number) => void;
};

export default function MovieGrid({ movies, onRate }: Props) {
  return (
    <div className="movies-container">
      {movies.slice(0, 6).map((movie) => (
        <MovieCard key={movie.id} movie={movie} onRate={onRate} />
      ))}
    </div>
  );
}

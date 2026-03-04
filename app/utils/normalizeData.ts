import { Movie } from "@/types/movie";

export function normalizeData(moviesData: any[]): Movie[] {
  return moviesData.map((movie: any) => ({
    id: String(movie.id),
    title: movie.title,
    releaseDate: movie.release_date,
    poster: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : undefined,
    genresIds: movie.genre_ids || [],
    description: movie.overview,
    rating: movie.vote_average,
    voteCount: movie.vote_count,
    userRating: movie.rating || 0,
  }));
}

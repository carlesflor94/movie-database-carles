import { Movie } from "@/types/movie";

export function normalizeData(
  moviesData: any[],
  genresData: { genres: { id: number; name: string }[] },
): Movie[] {
  const genreMap = new Map(genresData.genres.map((g) => [g.id, g.name]));

  return moviesData.map((movie: any) => ({
    id: String(movie.id),
    title: movie.title,
    releaseDate: movie.release_date,
    poster: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : undefined,
    genres: movie.genre_ids.map((id: number) => genreMap.get(id) || ""),
    description: movie.overview,
    rating: movie.vote_average,
    voteCount: movie.vote_count,
    userRating: movie.rating || 0,
  }));
}

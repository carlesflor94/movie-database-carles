import { tmdbFetch } from "./tmdbClient";

export async function getGenres() {
  return tmdbFetch("/genre/movie/list");
}

export async function searchMovies(query: string, page: number = 1) {
  return tmdbFetch(
    `/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
  );
}

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN!;

async function tmdbFetch(endpoint: string) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("TMDB request failed");

  return res.json();
}

export async function getGenres() {
  return tmdbFetch("/genre/movie/list");
}

export async function searchMovies(query: string, page: number = 1) {
  return tmdbFetch(
    `/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
  );
}

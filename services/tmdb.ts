const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

if (!ACCESS_TOKEN) {
  throw new Error("Access token not found");
}

export async function searchMovies(query: string, page: number = 1) {
  const response = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Error while fetching movies");
  }

  return response.json();
}

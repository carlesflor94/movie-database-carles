import { tmdbFetch } from "./tmdbClient";

export async function createGuestSession(): Promise<string> {
  const data = await tmdbFetch("/authentication/guest_session/new");
  return data.guest_session_id;
}

export async function rateMovie(
  movieId: string,
  guestSessionId: string,
  rating: number,
) {
  return tmdbFetch(
    `/movie/${movieId}/rating?guest_session_id=${guestSessionId}`,
    {
      method: "POST",
      body: JSON.stringify({ value: rating }),
    },
  );
}

export async function getRatedMovies(guestSessionId: string, page = 1) {
  return tmdbFetch(
    `/guest_session/${guestSessionId}/rated/movies?page=${page}`,
  );
}

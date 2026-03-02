import { NextRequest, NextResponse } from "next/server";
import { searchMovies, getGenres } from "@/services/tmdb";
import { Movie } from "@/types/movie";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const page = Number(searchParams.get("page") || "1");

  if (!query) {
    return NextResponse.json({ error: "Query required" }, { status: 400 });
  }

  try {
    const [moviesData, genresData] = await Promise.all([
      searchMovies(query, page),
      getGenres(),
    ]);

    const genreMap = new Map(genresData.genres.map((g: any) => [g.id, g.name]));

    const formatted: Movie[] = moviesData.results.map((movie: any) => ({
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
    }));

    return NextResponse.json({
      results: formatted,
      totalPages: moviesData.total_results,
    });
  } catch (error) {
    return NextResponse.json({ error: "Movies not found" }, { status: 500 });
  }
}

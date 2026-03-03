import { NextRequest, NextResponse } from "next/server";
import { getRatedMovies } from "@/services/guestSession";
import { getGenres } from "@/services/tmdb";
import { normalizeData } from "@/app/utils/normalizeData";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const guestSessionId = searchParams.get("guestSessionId");

  if (!guestSessionId) {
    return NextResponse.json(
      { error: "You need a guest session" },
      { status: 400 },
    );
  }

  try {
    const data = await getRatedMovies(guestSessionId);
    const genres = await getGenres();
    const movies = normalizeData(data.results, genres);
    return NextResponse.json({
      results: movies,
      total_results: data.total_results,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch rated movies" },
      { status: 500 },
    );
  }
}

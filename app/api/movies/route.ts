import { NextRequest, NextResponse } from "next/server";
import { searchMovies, getGenres } from "@/services/tmdb";
import { normalizeData } from "@/app/utils/normalizeData";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const page = Number(searchParams.get("page") || "1");

  if (!query) {
    return NextResponse.json({ error: "Query required" }, { status: 400 });
  }

  try {
    const moviesData = await searchMovies(query, page);

    const formatted = normalizeData(moviesData.results);

    return NextResponse.json({
      results: formatted,
      total_results: moviesData.total_results,
    });
  } catch (error) {
    return NextResponse.json({ error: "Movies not found" }, { status: 500 });
  }
}

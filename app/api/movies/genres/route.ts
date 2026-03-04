import { NextResponse } from "next/server";
import { getGenres } from "@/services/tmdb";

export async function GET() {
  try {
    const data = await getGenres();
    return NextResponse.json({ genres: data.genres });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch genres (GET)" },
      { status: 500 },
    );
  }
}

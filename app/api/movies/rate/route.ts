import { NextResponse } from "next/server";
import { rateMovie } from "@/services/guestSession";

export async function POST(req: Request) {
  try {
    const { movieId, rating, guestSessionId } = await req.json();

    await rateMovie(movieId, guestSessionId, rating);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to rate a movie with Guest", error);
    return NextResponse.json(
      { error: "Failed to rate a movie" },
      { status: 500 },
    );
  }
}

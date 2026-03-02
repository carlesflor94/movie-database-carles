import { NextResponse } from "next/server";
import { createGuestSession } from "@/services/guestSession";

export async function GET() {
  try {
    const guestSessionId = await createGuestSession();
    return NextResponse.json({ guestSessionId });
  } catch (err) {
    console.error("Failed to create guest session", err);
    return NextResponse.json(
      { error: "Failed to create guest session" },
      { status: 500 },
    );
  }
}

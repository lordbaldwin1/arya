import { cookies } from "next/headers";
import { db } from "~/server/db";
import { reservations } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const sessionId = (await cookies()).get("sessionId")?.value;
    if (!sessionId) {
      return NextResponse.json({ error: "No session ID found" }, { status: 400 });
    }

    (await cookies()).set("cart", "", {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // Delete reservations from database
    await db.transaction(async (tx) => {
      await tx.delete(reservations).where(eq(reservations.sessionId, sessionId));
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to clear cart:", error);
    return NextResponse.json(
      { error: "Failed to clear cart" },
      { status: 500 }
    );
  }
} 
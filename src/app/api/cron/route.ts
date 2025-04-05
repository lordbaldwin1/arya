import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { reservations, skus } from "~/server/db/schema";
import { and, eq, lt } from "drizzle-orm";
import { sql } from "drizzle-orm";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const currentTime = Math.floor(Date.now() / 1000);

    const expiredReservations = await db.query.reservations.findMany({
      where: lt(reservations.expiresAt, currentTime),
    });

    for (const reservation of expiredReservations) {
      await db.transaction(async (tx) => {
        await tx
          .update(skus)
          .set({
            quantity: sql`${skus.quantity} + ${reservation.quantity}`,
          })
          .where(eq(skus.id, reservation.skuId));

        await tx
          .delete(reservations)
          .where(
            and(
              eq(reservations.sessionId, reservation.sessionId),
              eq(reservations.skuId, reservation.skuId),
            ),
          );
      });
    }

    return NextResponse.json({
      ok: true,
      processed: expiredReservations.length,
    });
  } catch (error) {
    console.error("Error processing expired reservations:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

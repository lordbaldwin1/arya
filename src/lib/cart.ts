import { cookies } from "next/headers";
import { db } from "~/server/db";
import { z } from "zod";
import { skus, products } from "~/server/db/schema";
import { inArray } from "drizzle-orm";
import { eq } from "drizzle-orm";

const cartSchema = z.array(
  z.object({
    skuId: z.number(),
    quantity: z.number(),
    color: z.string(),
    size: z.string(),
  }),
);

export type CartItem = z.infer<typeof cartSchema>[number];

export async function updateCart(newItems: CartItem[]) {
  (await cookies()).set("cart", JSON.stringify(newItems), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 1 day (24 hours)
  });
}

export async function getCart() {
  const cart = (await cookies()).get("cart");
  if (!cart) {
    return [];
  }
  try {
    return cartSchema.parse(JSON.parse(cart.value));
  } catch (error) {
    console.error("Failed to parse cart cookie", error);
    return [];
  }
}

export async function detailedCart() {
  const cart = await getCart();

  const cartItems = await db
    .select({
      product: products,
      sku: skus,
    })
    .from(products)
    .innerJoin(skus, eq(products.id, skus.productId))
    .where(inArray(skus.id, cart.map((item) => item.skuId)));

  return cartItems.map((item) => {
    const cartItem = cart.find((c) => c.skuId === item.sku.id);
    return {
      ...item.product,
      quantity: cartItem?.quantity ?? 0,
      skuId: item.sku.id,
      color: item.sku.color,
      size: item.sku.size,
    };
  });
}

export async function getAvailableStock(skuId: number) {
  const sku = await db.query.skus.findFirst({
    where: (skus, { eq }) => eq(skus.id, skuId),
  });
  return sku?.quantity ?? 0;
}

export async function getReservationQuantity(sessionId: string, skuId: number) {
  const reservation = await db.query.reservations.findFirst({
    where: (reservations, { eq, and }) =>
      and(
        eq(reservations.sessionId, sessionId),
        eq(reservations.skuId, skuId),
      ),
  });
  return reservation?.quantity ?? 0;
}

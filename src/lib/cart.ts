import { cookies } from "next/headers";
import { db } from "~/server/db";
import { z } from "zod";

const cartSchema = z.array(
  z.object({
    productSlug: z.string(),
    skuId: z.string(),
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
    maxAge: 60 * 60, // 1 hour
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

  const products = await db.query.products.findMany({
    where: (products, { inArray }) =>
      inArray(
        products.slug,
        cart.map((item) => item.productSlug),
      ),
  });

  const withQuantity = products.map((product) => {
    const cartItem = cart.find((item) => item.productSlug === product.slug);
    return {
      ...product,
      quantity: cartItem?.quantity ?? 0,
      skuId: cartItem?.skuId ?? null,
      color: cartItem?.color ?? null,
      size: cartItem?.size ?? null,
    };
  });

  return withQuantity;
}

export async function getAvailableStock(skuId: string) {
  const sku = await db.query.skus.findFirst({
    where: (skus, { eq }) => eq(skus.id, Number(skuId)),
  });
  return sku?.quantity ?? 0;
}

export async function getReservationQuantity(sessionId: string, skuId: string) {
  const reservation = await db.query.reservations.findFirst({
    where: (reservations, { eq, and }) =>
      and(
        eq(reservations.sessionId, sessionId),
        eq(reservations.skuId, Number(skuId)),
      ),
  });
  return reservation?.quantity ?? 0;
}

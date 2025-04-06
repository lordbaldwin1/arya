"use server";

import {
  getCart,
  updateCart,
  getAvailableStock,
  detailedCart,
} from "./cart";
import { cookies } from "next/headers";
import crypto from "crypto";
import { db } from "~/server/db";
import { reservations, skus } from "~/server/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { stripe } from "~/lib/stripe";

export async function addToCart(prevState: unknown, formData: FormData) {
  try {
    const sessionId =
      (await cookies()).get("sessionId")?.value ?? crypto.randomUUID();
    (await cookies()).set("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    const prevCart = await getCart();
    const productColor = formData.get("color");
    const productSize = formData.get("size");
    const skuId = Number(formData.get("skuId"));
    const availableStock = await getAvailableStock(skuId);
    if (availableStock === 0) {
      return "Item just sold out";
    }
    if (
      typeof productColor !== "string" ||
      typeof productSize !== "string" ||
      isNaN(skuId)
    ) {
      return;
    }

    const itemAlreadyExists = prevCart.find(
      (item) =>
        item.skuId === skuId &&
        item.color === productColor &&
        item.size === productSize,
    );

    if (itemAlreadyExists) {
      const result = await updateReservation(sessionId, skuId);
      if (result === "Not enough stock") {
        return result;
      }
      try {
        const newQuantity = itemAlreadyExists.quantity + 1;
        const newCart = prevCart.map((item) => {
          if (item.skuId === skuId) {
          return {
            ...item,
            quantity: newQuantity,
          };
        }
        return item;
        });
        await updateCart(newCart);
      } catch (error) {
        await deleteReservation(sessionId, skuId);
        console.error("Failed to update cart", error);
        return "Failed to update cart";
      }
    } else {
      const result = await createReservation(sessionId, skuId);
      if (result === "Not enough stock") {
        return result;
      }
      try {
        const newCart = [
          ...prevCart,
          {
          skuId,
          quantity: 1,
          color: productColor,
          size: productSize,
        },
        ];
        await updateCart(newCart);
      } catch (error) {
        await deleteReservation(sessionId, skuId);
        console.error("Failed to update cart", error);
        return "Failed to update cart";
      }
    }
    return "Item added to cart";
  } catch (error) {
    console.error("Failed to add to cart", error);
    return "Failed to add item to cart";
  }
}

export async function removeFromCart(formData: FormData) {
  const sessionId = (await cookies()).get("sessionId")?.value;
  if (!sessionId) {
    return;
  }
  const prevCart = await getCart();
  const skuId = Number(formData.get("skuId"));
  const productColor = formData.get("color");
  const productSize = formData.get("size");
  if (
    typeof productColor !== "string" ||
    typeof productSize !== "string" ||
    isNaN(skuId)
  ) {
    return;
  }

  const itemAlreadyExists = prevCart.find(
    (item) =>
      item.color === productColor &&
      item.size === productSize &&
      item.skuId === skuId,
  );
  if (!itemAlreadyExists) {
    return;
  }

  const newCart = prevCart.filter(
    (item) =>
      item.color !== productColor ||
      item.size !== productSize ||
      item.skuId !== skuId,
  );
  try {
    await updateCart(newCart);
    await deleteReservation(sessionId, skuId);
  } catch (error) {
    await updateCart(prevCart);
    console.error("Failed to remove from cart", error);
  }
}

export async function updateReservation(sessionId: string, skuId: number) {
  try {
    await db.transaction(async (tx) => {
      const existingReservation = await tx.query.reservations.findFirst({
        where: (reservations, { and, eq }) => 
          and(
            eq(reservations.sessionId, sessionId),
            eq(reservations.skuId, skuId)
          )
      });

      if (!existingReservation) {
        return await createReservation(sessionId, skuId);
      }

      const skuQuantity = await getAvailableStock(skuId);
      if (skuQuantity === 0) {
        return "Not enough stock";
      }

      const newQuantity = existingReservation.quantity + 1;

      await tx
        .update(skus)
        .set({
          quantity: skuQuantity - 1,
        })
        .where(eq(skus.id, skuId));

      await tx
        .update(reservations)
        .set({
          quantity: newQuantity,
          updatedAt: Math.floor(Date.now() / 1000),
          expiresAt: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
        })
        .where(
          and(
            eq(reservations.sessionId, sessionId),
            eq(reservations.skuId, skuId),
          ),
        );
    });
    return "Success";
  } catch (error) {
    console.error("Failed to update reservation", error);
    throw error;
  }
}

export async function createReservation(sessionId: string, skuId: number) {
  try {
    const skuQuantity = await getAvailableStock(skuId);
    if (skuQuantity === 0) {
      return "Not enough stock";
    }

    await db.transaction(async (tx) => {
      await tx
        .update(skus)
        .set({
          quantity: skuQuantity - 1,
        })
        .where(eq(skus.id, skuId));

      await tx.insert(reservations).values({
        sessionId,
        skuId,
        quantity: 1,
        expiresAt: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 1 day
      });
    });
    return "Success";
  } catch (error) {
    console.error("Failed to create reservation", error);
    throw error; // Rethrow to handle in addToCart
  }
}

export async function deleteReservation(sessionId: string, skuId: number) {
  try {
    await db.transaction(async (tx) => {
      const reservation = await tx.query.reservations.findFirst({
        where: (reservations, { eq, and }) =>
          and(
            eq(reservations.sessionId, sessionId),
            eq(reservations.skuId, skuId),
          ),
      });

      if (reservation) {
        await tx
          .update(skus)
          .set({
            quantity: sql`${skus.quantity} + ${reservation.quantity}`,
          })
          .where(eq(skus.id, skuId));

        await tx
          .delete(reservations)
          .where(
            and(
              eq(reservations.sessionId, sessionId),
              eq(reservations.skuId, skuId),
            ),
          );
      }
    });
  } catch (error) {
    console.error("Failed to delete reservation", error);
    throw error; // Rethrow to handle in removeFromCart
  }
}

export async function createPaymentIntent() {
  try {
    const cart = await detailedCart();
    
    // Calculate total amount
    const amount = cart.reduce(
      (total: number, item) => total + item.quantity * item.price * 100, // Convert to cents
      0
    );

    // Add shipping cost (500 cents = $5.00)
    const totalAmount = amount + 500;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        sessionId: (await cookies()).get("sessionId")?.value ?? "",
      },
    });

    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw new Error("Failed to create payment intent");
  }
}

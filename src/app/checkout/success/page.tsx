import { redirect } from "next/navigation";
import { SuccessContent } from "~/components/SuccessContent";
import { stripe } from "~/lib/stripe";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Confirmed - Arya",
  description: "Thank you for your purchase. Your order has been confirmed.",
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ payment_intent?: string; redirect_status?: string }>;
}) {
  const params = await searchParams;
  const { payment_intent: paymentIntentId, redirect_status: status } = params;

  if (!paymentIntentId || status !== "succeeded") {
    redirect("/");
  }

  // Verify the payment intent with Stripe
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status !== "succeeded") {
      redirect("/");
    }
  } catch (error) {
    console.error("Failed to verify payment:", error);
    redirect("/");
  }

  return <SuccessContent paymentIntentId={paymentIntentId} />;
}
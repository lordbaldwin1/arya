import { redirect } from "next/navigation";
import { SuccessContent } from "~/components/SuccessContent";

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

  return <SuccessContent />;
}
import type { Metadata } from "next";
import { Suspense } from "react";
import { CartItems, TotalCost } from "./dynamic";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order",
};

export default async function Page() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/all"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Continue Shopping
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Your Cart</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="rounded-xl bg-card p-6 shadow-sm">
              <Suspense>
                <CartItems />
              </Suspense>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-4 rounded-xl bg-card p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  Order Summary
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Shipping and taxes calculated at checkout
                </p>
              </div>

              <div className="border-t border-border pt-6">
                <Suspense>
                  <TotalCost />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

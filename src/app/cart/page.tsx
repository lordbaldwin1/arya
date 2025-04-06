import type { Metadata } from "next";
import { Suspense } from "react";
import { CartItems, TotalCost } from "./dynamic";

export const metadata: Metadata = {
  title: "Order",
};

export default async function Page() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Your Cart</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-lg bg-card p-6 shadow-sm">
              <Suspense>
                <CartItems />
              </Suspense>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-4 rounded-lg bg-card p-6 shadow-sm">
              <div className="mb-6">
                <p className="text-lg font-semibold text-foreground">
                  Order Summary
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Applicable shipping and tax will be added at checkout.
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <Suspense>
                    <TotalCost />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface SuccessContentProps {
  paymentIntentId: string;
}

export function SuccessContent({ paymentIntentId }: SuccessContentProps) {
  const [isClearingCart, setIsClearingCart] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const clearCart = async () => {
      try {
        const response = await fetch("/api/cart/clear", {
          method: "POST",
        });
        
        if (!response.ok) {
          throw new Error("Failed to clear cart");
        }
      } catch (error) {
        console.error("Failed to clear cart:", error);
        
        // Retry up to 3 times
        if (retryCount < 3) {
          setRetryCount(prev => prev + 1);
          setTimeout(() => void clearCart(), 1000 * retryCount); // Exponential backoff
          return;
        }
        
        setError("Failed to clear cart. Please try again later.");
      } finally {
        setIsClearingCart(false);
      }
    };

    void clearCart();
  }, [retryCount]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Payment Successful!</h1>
        <p className="text-muted-foreground">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        <p className="text-sm text-muted-foreground">
          Order ID: {paymentIntentId}
        </p>
        {isClearingCart && (
          <p className="text-muted-foreground">
            {retryCount > 0 ? "Retrying to clear cart..." : "Clearing your cart..."}
          </p>
        )}
        {error && (
          <p className="text-destructive">{error}</p>
        )}
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
} 
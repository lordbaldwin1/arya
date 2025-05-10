import { createPaymentIntent } from "~/lib/actions";
import CheckoutForm from "~/components/Checkout";
import { detailedCart } from "~/lib/cart";
import Link from "next/link";

export default async function CheckoutPage() {
  const cartItems = await detailedCart();

  // Check if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-2xl font-bold text-foreground">Your cart is empty</h1>
        <Link 
          href="/products" 
          className="mt-4 text-primary hover:text-primary/80"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const { clientSecret } = await createPaymentIntent();

  if (!clientSecret) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-2xl font-bold text-foreground">Error creating payment</h1>
        <Link 
          href="/cart" 
          className="mt-4 text-primary hover:text-primary/80"
        >
          Return to Cart
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>
        <div className="rounded-lg p-6 shadow-sm">
          <CheckoutForm clientSecret={clientSecret} />
        </div>
      </div>
    </div>
  );
}

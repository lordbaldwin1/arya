"use client";

import { useActionState } from "react";
import { addToCart } from "~/lib/actions";

export function AddToCartForm({ productSlug, color, size }: { productSlug: string, color: string, size: string }) {
  const [message, formAction, isPending] = useActionState(addToCart, null);
  return (
    <form className="flex flex-col gap-2" action={formAction}>
      <input type="hidden" name="productSlug" value={productSlug} />
      <input type="hidden" name="color" value={color} />
      <input type="hidden" name="size" value={size} />
      <button type="submit" className="rounded-md bg-black px-4 py-2 text-white">
        {isPending ? "Adding..." : "Add to Cart"}
      </button>
      {isPending && <p>Adding to cart...</p>}
      {!isPending && message && <p>{message}</p>}
    </form>
  );
}

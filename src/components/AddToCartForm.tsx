"use client";

import { useActionState } from "react";
import { addToCart } from "~/lib/actions";

export function AddToCartForm({
  productSlug,
  skuId,
  color,
  size,
  disabled,
  children,
}: {
  productSlug: string;
  skuId: string;
  color: string;
  size: string;
  disabled?: boolean;
  children?: React.ReactNode;
}) {
  const [message, formAction, isPending] = useActionState(addToCart, null);
  return (
    <form className="flex flex-col gap-2" action={formAction}>
      <input type="hidden" name="productSlug" value={productSlug} />
      <input type="hidden" name="color" value={color} />
      <input type="hidden" name="size" value={size} />
      <input type="hidden" name="skuId" value={skuId} />
      <button
        type="submit"
        disabled={disabled ?? isPending}
        className={`w-full rounded-md px-4 py-2 ${
          disabled ?? isPending
            ? "bg-gray-200 text-gray-500"
            : "bg-black text-white hover:bg-gray-500 hover:cursor-pointer"
        }`}
      >
        {isPending ? "Adding..." : children ?? "Add to Cart"}
      </button>
      {isPending && <p>Adding to cart...</p>}
      {!isPending && message && <p>{message}</p>}
    </form>
  );
}

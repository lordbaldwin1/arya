"use client";

import { useActionState } from "react";
import { addToCart } from "~/lib/actions";
import { toast } from "sonner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AddToCartForm({
  productSlug,
  skuId,
  color,
  size,
  selectedSku,
  hasSelectedOptions,
  children,
}: {
  productSlug: string;
  skuId: string;
  color: string;
  size: string;
  selectedSku: { quantity: number } | undefined;
  hasSelectedOptions: boolean;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const [message, formAction, isPending] = useActionState(addToCart, null);
  
  useEffect(() => {
    if (message && !isPending) {
      if (message === "Item added to cart") {
        toast.success(message, {
          action: {
            label: "View Cart",
            onClick: () => {
              router.push("/cart");
            },
          },
        });
      } else {
        toast.error(message);
      }
    }
  }, [message, isPending, router]);
  
  const isDisabled = !hasSelectedOptions || !selectedSku || selectedSku.quantity <= 0 || isPending;
  
  const getButtonText = () => {
    if (!hasSelectedOptions) return "Select options";
    if (!selectedSku) return "Out of stock";
    if (selectedSku.quantity <= 0) return "Out of stock";
    if (isPending) return "Adding...";
    return children ?? "Add to Cart";
  };

  return (
    <form className="flex flex-col gap-2" action={formAction}>
      <input type="hidden" name="productSlug" value={productSlug} />
      <input type="hidden" name="color" value={color} />
      <input type="hidden" name="size" value={size} />
      <input type="hidden" name="skuId" value={skuId} />
      <button
        type="submit"
        disabled={isDisabled}
        className={`w-full rounded-md px-4 py-2 ${
          isDisabled
            ? "bg-gray-200 text-gray-500"
            : "bg-black text-white hover:bg-gray-500 hover:cursor-pointer"
        }`}
      >
        {getButtonText()}
      </button>
    </form>
  );
}

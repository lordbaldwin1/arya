import { cache } from "react";
import { detailedCart } from "~/lib/cart";
import Link from "next/link";
import Image from "next/image";
import { removeFromCart } from "~/lib/actions";
import { X } from "lucide-react";

const getCartItems = cache(() => detailedCart());
type CartItem = Awaited<ReturnType<typeof getCartItems>>[number];

export async function CartItems() {
  const cart = await getCartItems();

  return (
    <>
      {cart.length > 0 && (
        <div className="mb-6">
          <p className="text-sm font-medium text-primary">Delivers in 2-4 weeks</p>
          <p className="text-sm text-muted-foreground">Need this sooner?</p>
        </div>
      )}
      {cart.length > 0 ? (
        <div className="space-y-6">
          {cart.map((item) => (
            <CartItem key={item.skuId} product={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-lg text-muted-foreground">Your cart is empty</p>
          <Link
            href="/"
            className="mt-4 text-sm font-medium text-primary hover:text-primary/80"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </>
  );
}

function CartItem({ product }: { product: CartItem }) {
  if (!product) {
    return null;
  }
  const cost = (Number(product.price) * product.quantity).toFixed(2);

  return (
    <div className="flex flex-col space-y-4 border-b border-border pb-6 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
      <Link
        prefetch={true}
        href={`/product/${product.slug}`}
        className="flex flex-1 space-x-4"
      >
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border">
          <Image
            loading="eager"
            decoding="sync"
            src={product.imageUrl ?? "/placeholder.svg"}
            alt={product.name}
            width={96}
            height={96}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-medium text-foreground truncate">{product.name}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {product.color} {product.size}
          </p>
          <p className="mt-1 text-sm font-medium text-foreground">
            ${Number(product.price).toFixed(2)} each
          </p>
        </div>
      </Link>
      <div className="flex items-center justify-between sm:ml-4 sm:flex-col sm:items-end sm:justify-between sm:space-y-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-foreground">Qty: {product.quantity}</span>
          <span className="text-base font-medium text-foreground">${cost}</span>
        </div>
        <form action={removeFromCart}>
          <button
            type="submit"
            className="text-muted-foreground hover:text-foreground"
            aria-label="Remove item"
          >
            <input type="hidden" name="productSlug" value={product.slug} />
            <input type="hidden" name="skuId" value={product.skuId ?? ""} />
            <input type="hidden" name="color" value={product.color ?? ""} />
            <input type="hidden" name="size" value={product.size ?? ""} />
            <X className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}

export async function TotalCost() {
  const cart = await getCartItems();

  const totalCost = cart.reduce(
    (acc, item) => acc + item.quantity * Number(item.price),
    0,
  );

  return (
    <div className="flex flex-col space-y-4">
      <span className="text-lg font-semibold text-foreground">
        Total: ${totalCost.toFixed(2)}
      </span>
      {cart.length > 0 && (
        <Link
          href="/checkout"
        className="block w-full rounded-md bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
      >
          Proceed to Checkout
        </Link>
      )}
    </div>
  );
}

import ProductCard from "~/components/ProductCard";
import { getProducts } from "~/server/db/queries";

export default async function Page() {
  try {
    const result = await getProducts();

    if (!result.success) {
      return (
        <div className="flex h-screen items-center justify-center text-red-500">
          {`Failed to fetch products: ${result.error instanceof Error ? result.error.message : 'Unknown error'}`}
        </div>
      );
    }

    const products = result.data;

    if (!products || products.length === 0) {
      return (
        <div className="flex h-screen items-center justify-center text-red-500">
          No products available at this time.
        </div>
      );
    }

    return <ProductCard products={products} />;
  } catch (error) {
    console.error("Error in products page:", error);
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        An unexpected error occurred. Please try again later.
      </div>
    );
  }
}

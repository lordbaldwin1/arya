import PaginationControls from "~/components/PaginationControls";
import ProductCard from "~/components/ProductCard";
import ProductSorter from "~/components/ProductSorter";
import { getProductsByPageAndSort, getTotalProductQuantity } from "~/server/db/queries";
import Link from "next/link";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products - Arya",
  description: "Browse our complete collection of jewelry pieces. Find your perfect accessory from our wide range of designs.",
};

const ITEMS_PER_PAGE = 50;

export default async function Page(props: { searchParams: Promise<{ sort?: string, page?: number }> }) {
  const { sort, page } = await props.searchParams;
  try {
    const sortOption = sort ?? "default";
    const pageNumber = page ?? 1;

    const [productResult, totalQuantityResult] = await Promise.all([
      getProductsByPageAndSort(sortOption, pageNumber, ITEMS_PER_PAGE),
      getTotalProductQuantity(),
    ]);

    if (!productResult.success) {
      return (
        <div className="flex h-screen items-center justify-center text-destructive">
          {`Failed to fetch products: ${productResult.error instanceof Error ? productResult.error.message : 'Unknown error'}`}
        </div>
      );
    }

    let quantityText = "Showing all categories";
    if (totalQuantityResult.success) {
      quantityText = `Browsing ${totalQuantityResult.data} product${totalQuantityResult.data === 1 ? '' : 's'}`;
    }

    const products = productResult.data;
    const totalPages = Math.ceil((totalQuantityResult?.data ?? 0) / ITEMS_PER_PAGE);

    if (!products || products.length === 0) {
      return (
        <div className="flex h-screen items-center justify-center text-destructive">
          No products available at this time.
        </div>
      );
    }

    return (
      <div className="flex-1 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
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
            Back to Home
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">All Products</h1>
              <p className="text-muted-foreground">{quantityText}</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <ProductSorter />
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <PaginationControls
              currentPage={pageNumber}
              totalPages={totalPages}
              sortOption={sortOption}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in products page:", error);
    return (
      <div className="flex h-screen items-center justify-center text-destructive">
        An unexpected error occurred. Please try again later.
      </div>
    );
  }
}

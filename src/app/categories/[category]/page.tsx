import { getCategoryDetails, getProductsByCategoryId, getTotalProductQuantityByCategoryId } from "~/server/db/queries";
import { notFound } from "next/navigation";
import ProductCard from "~/components/ProductCard";
import PaginationControls from "~/components/PaginationControls";
import ProductSorter from "~/components/ProductSorter";
import Link from "next/link";

const ITEMS_PER_PAGE = 50;

export default async function Page(props: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ sort?: string; page?: number }>;
}) {
  const { category } = await props.params;
  const { sort, page } = await props.searchParams;
  const result = await getCategoryDetails(category);
  if (!result.success || !result.data) {
    return notFound();
  }
  const categoryDetails = result.data;

  const sortOption = sort ?? "default";
  const pageNumber = page ?? 1;

  const [productsResult, totalQuantityResult] = await Promise.all([
    getProductsByCategoryId(categoryDetails.id, sortOption, pageNumber, ITEMS_PER_PAGE),
    getTotalProductQuantityByCategoryId(categoryDetails.id),
  ]);
  if (!productsResult.success || !productsResult.data) {
    return notFound();
  }

  let quantityText = `Showing ${categoryDetails.name} products`;
  if (totalQuantityResult.success) {
    quantityText = `Browsing ${totalQuantityResult.data} product${totalQuantityResult.data === 1 ? '' : 's'}`;
  }

  const products = productsResult.data;
  const totalPages = Math.ceil((totalQuantityResult?.data ?? 0) / ITEMS_PER_PAGE);

  if (!products || products.length === 0) {
    return notFound();
  }

  return (
    <div className="flex-1 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/categories"
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
          Back to Categories
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{categoryDetails.name}</h1>
            <p className="text-muted-foreground">{quantityText}</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <ProductSorter />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
}

import PaginationControls from "~/components/PaginationControls";
import ProductCard from "~/components/ProductCard";
import ProductSorter from "~/components/ProductSorter";
import { getProductsByPageAndSort, getTotalProductQuantity } from "~/server/db/queries";

const ITEMS_PER_PAGE = 50;

export default async function Page(props: { searchParams: Promise<{ sort?: string, page?: number }> }) {
  try {
    const { sort, page } = await props.searchParams;

    const sortOption = sort ?? "default";
    const pageNumber = page ?? 1;

    const [productResult, totalQuantityResult] = await Promise.all([
      getProductsByPageAndSort(sortOption, pageNumber, ITEMS_PER_PAGE),
      getTotalProductQuantity(),
    ]);

    if (!productResult.success) {
      return (
        <div className="flex h-screen items-center justify-center text-red-500">
          {`Failed to fetch products: ${productResult.error instanceof Error ? productResult.error.message : 'Unknown error'}`}
        </div>
      );
    }

    let quantityText = "Showing all categories";
    if (totalQuantityResult.success) {
      quantityText = `Browse ${totalQuantityResult.data} products`;
    }

    const products = productResult.data;
    const totalPages = Math.ceil((totalQuantityResult?.data ?? 0) / ITEMS_PER_PAGE);

    if (!products || products.length === 0) {
      return (
        <div className="flex h-screen items-center justify-center text-red-500">
          No products available at this time.
        </div>
      );
    }

    return (
    <div className="flex-1">
      <div className="flex justify-start mx-4 lg:mx-24">
        <h1 className="text-2xl font-bold">All Products</h1>
      </div>
      <div className="flex items-baseline justify-start mx-4 lg:mx-24 mb-2">
        <p className="text-gray-500">{quantityText}</p>
        <div className="ml-auto">
          <ProductSorter />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 mx-4 lg:mx-24">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      </div>
      <PaginationControls
        currentPage={pageNumber}
        totalPages={totalPages}
        sortOption={sortOption}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </div>
    );
  } catch (error) {
    console.error("Error in products page:", error);
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        An unexpected error occurred. Please try again later.
      </div>
    );
  }
}

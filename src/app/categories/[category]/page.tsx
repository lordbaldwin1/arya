import { getCategoryDetails, getProductsByCategoryId, getTotalProductQuantityByCategoryId } from "~/server/db/queries";
import { notFound } from "next/navigation";
import ProductCard from "~/components/ProductCard";
import PaginationControls from "~/components/PaginationControls";
import ProductSorter from "~/components/ProductSorter";

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
    quantityText = `Browse ${totalQuantityResult.data} products`;
  }

  const products = productsResult.data;
  const totalPages = Math.ceil((totalQuantityResult?.data ?? 0) / ITEMS_PER_PAGE);

  if (!products || products.length === 0) {
    return notFound();
  }

  return (
    <div className="flex-1">
      <div className="flex justify-start mx-4 lg:mx-24">
        <h1 className="text-2xl font-bold">{categoryDetails.name}</h1>
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
}

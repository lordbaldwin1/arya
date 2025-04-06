import { getCategoryId, getProductsByCategoryId } from "~/server/db/queries";
import { notFound } from "next/navigation";
import ProductCard from "~/components/ProductCard";

export default async function Page(props: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await props.params;
  const result = await getCategoryId(category);

  if (!result.success || !result.data) {
    return notFound();
  }

  const categoryId = result.data;
  const productsResult = await getProductsByCategoryId(categoryId);

  if (!productsResult.success || !productsResult.data) {
    return notFound();
  }

  const products = productsResult.data;

  return (
    <div>
      <h1>{category}</h1>
      <div className="grid grid-cols-3 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:mx-24">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

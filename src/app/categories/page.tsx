import CategoryCard from "~/components/CategoryCard";
import { getCategories, getCategoryCount } from "~/server/db/queries";
import { notFound } from "next/navigation";

export default async function Page() {
  try {
    const [categoriesResult, categoryCountResult] = await Promise.all([
      getCategories(),
      getCategoryCount(),
    ]);

    if (!categoriesResult.success) {
      return notFound();
    }

    const categories = categoriesResult.data;

    if (!categories || categories.length === 0) {
      return notFound();
    }

    const categoryCount = categoryCountResult.data;

    if (!categoryCount) {
      return notFound();
    }

    let quantityText = "Shop all categories";
    if (categoryCountResult.success) {
      quantityText = `Browse ${categoryCountResult.data} categories`;
    }

    return (
      <div className="flex-1">
        <div className="flex justify-start mx-4 lg:mx-24">
          <h1 className="text-2xl font-bold">All Categories</h1>
        </div>
        <div className="flex items-baseline justify-start mx-4 lg:mx-24 mb-2">
          <p className="text-gray-500">{quantityText}</p>
        </div>
        <CategoryCard categories={categories} />
      </div>
    );
  } catch (error) {
    console.error("Error in categories page:", error);
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        An unexpected error occurred. Please try again later.
      </div>
    );
  }
}
import CategoryCard from "~/components/CategoryCard";
import { getCategories } from "~/server/db/queries";


export default async function Page() {
  try {
    const result = await getCategories();

    if (!result.success) {
      return (
        <div className="flex h-screen items-center justify-center text-red-500">
          {`Failed to fetch categories: ${result.error instanceof Error ? result.error.message : 'Unknown error'}`}
        </div>
      );
    }

    const categories = result.data;

    if (!categories || categories.length === 0) {
      return (
        <div className="flex h-screen items-center justify-center text-red-500">
          No categories available at this time.
        </div>
      );
    }

    return <CategoryCard categories={categories} />;
  } catch (error) {
    console.error("Error in categories page:", error);
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        An unexpected error occurred. Please try again later.
      </div>
    );
  }
}
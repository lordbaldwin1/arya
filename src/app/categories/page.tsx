import CategoryCard from "~/components/CategoryCard";
import { getCategories, getCategoryCount } from "~/server/db/queries";
import { notFound } from "next/navigation";
import Link from "next/link";

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
              <h1 className="text-3xl font-bold text-foreground mb-2">All Categories</h1>
              <p className="text-muted-foreground">{quantityText}</p>
            </div>
          </div>
          
          <CategoryCard categories={categories} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in categories page:", error);
    return (
      <div className="flex h-screen items-center justify-center text-destructive">
        An unexpected error occurred. Please try again later.
      </div>
    );
  }
}
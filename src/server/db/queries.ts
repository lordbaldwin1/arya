import { eq, like, sql, desc } from "drizzle-orm";
import { db } from "./index";
import { categories, products, skus, productImages } from "./schema";

export async function getProducts() {
  try {
    const result = await db.select().from(products);
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to fetch products", error);
    return { success: false, error: error };
  }
}

export async function getCategoryCount() {
  try {
    const result = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(categories);
    return { success: true, data: result[0]?.count ?? 0 };
  } catch (error) {
    console.error("Failed to fetch category count", error);
    return { success: false, error: error };
  }
}

export async function getCategoryDetails(category: string) {
  try {
    const result = await db.query.categories.findFirst({
      where: (categories, { eq }) => eq(categories.slug, category),
    });
    if (!result) {
      return { success: false, error: "Category not found" };
    }
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to fetch category data", error);
    return { success: false, error: error };
  }
}

export async function getProductDetailsBySlug(slug: string) {
  try {
    const product = await db
      .select()
      .from(products)
      .where(eq(products.slug, slug))
      .then((res) => res[0]);

    if (!product) {
      return { success: false, error: "Product not found" };
    }

    const [productSkus, images] = await Promise.all([
      db.select().from(skus).where(eq(skus.productId, product.id)),
      db
        .select()
        .from(productImages)
        .where(eq(productImages.productId, product.id)),
    ]);

    return {
      success: true,
      data: {
        ...product,
        skus: productSkus,
        images: images,
      },
    };
  } catch (error) {
    console.error("Failed to fetch product by slug", error);
    return { success: false, error: error };
  }
}

export async function getProductsByPageAndSort(
  sort: string,
  page: number,
  itemsPerPage: number,
) {
  try {
    const offset = (page - 1) * itemsPerPage;
    
    const result = await db
      .select()
      .from(products)
      .orderBy(
        sort === "price-desc" ? desc(products.price) :
        sort === "price-asc" ? products.price :
        sort === "newest" ? desc(products.createdAt) :
        sort === "oldest" ? products.createdAt :
        products.id
      )
      .limit(itemsPerPage)
      .offset(offset);

    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to fetch products", error);
    return { success: false, error: error };
  }
}

export async function getProductsByCategoryId(
  categoryId: number,
  sort: string,
  page: number,
  itemsPerPage: number,
) {
  try {
    const offset = (page - 1) * itemsPerPage;
    const result = await db
      .select()
      .from(products)
      .where(eq(products.categoryId, categoryId))
      .limit(itemsPerPage)
      .offset(offset);

    if (sort === "price-asc") {
      return { success: true, data: result.sort((a, b) => a.price - b.price) };
    } else if (sort === "price-desc") {
      return { success: true, data: result.sort((a, b) => b.price - a.price) };
    } else if (sort === "newest") {
      return {
        success: true,
        data: result.sort((a, b) => b.createdAt - a.createdAt),
      };
    } else if (sort === "oldest") {
      return {
        success: true,
        data: result.sort((a, b) => a.createdAt - b.createdAt),
      };
    } else {
      return { success: true, data: result };
    }
  } catch (error) {
    console.error("Failed to fetch products by category id", error);
    return { success: false, error: error };
  }
}

export async function getCategories() {
  try {
    const result = await db.select().from(categories);
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to fetch categories", error);
    return { success: false, error: error };
  }
}

export async function getHomePageProducts() {
  try {
    const result = await db.select().from(products).limit(3);
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to fetch home page products", error);
    return { success: false, error: error };
  }
}

export async function getTotalProductQuantity() {
  try {
    const result = await db
      .select({ total: sql<number>`COUNT(*)` })
      .from(products);
    return { success: true, data: result[0]?.total ?? 0 };
  } catch (error) {
    console.error("Failed to fetch total product quantity", error);
    return { success: false, error: error };
  }
}

export async function getTotalProductQuantityByCategoryId(categoryId: number) {
  try {
    const result = await db
      .select({ total: sql<number>`COUNT(*)` })
      .from(products)
      .where(eq(products.categoryId, categoryId));
    return { success: true, data: result[0]?.total ?? 0 };
  } catch (error) {
    console.error(
      "Failed to fetch total product quantity by category id",
      error,
    );
    return { success: false, error: error };
  }
}
export async function getSearchResults(query: string) {
  try {
    const results = await db
      .select()
      .from(products)
      .where(like(products.name, `%${query}%`));
    return results;
  } catch (error) {
    console.error("Failed to fetch search results", error);
    return [];
  }
}

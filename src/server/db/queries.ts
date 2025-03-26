import { db } from "./index";
import { categories, products } from "./schema";

export async function getProducts() {
  try {
    const result = await db.select().from(products);
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to fetch products", error);
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
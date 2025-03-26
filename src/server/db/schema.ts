import { sql } from "drizzle-orm";
import { integer, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

export const createTable = sqliteTableCreator((name) => `lc_note_${name}`);

export const products = createTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  categoryId: integer("category_id").notNull(),
  price: integer("price").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: integer("created_at").default(sql`(unixepoch())`).notNull(),
  updatedAt: integer("updated_at").default(sql`(unixepoch())`).notNull(),
});

export type Product = typeof products.$inferSelect;

export const productImages = createTable("product_images", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  productId: integer("product_id").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: integer("created_at").default(sql`(unixepoch())`).notNull(),
  updatedAt: integer("updated_at").default(sql`(unixepoch())`).notNull(),
});

export type ProductImage = typeof productImages.$inferSelect;

export const categories = createTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: integer("created_at").default(sql`(unixepoch())`).notNull(),
  updatedAt: integer("updated_at").default(sql`(unixepoch())`).notNull(),
});

export type Category = typeof categories.$inferSelect;

export const skus = createTable("skus", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  productId: integer("product_id").notNull(),
  sku: text("sku").notNull(),
  price: integer("price").notNull(),
  size: text("size").notNull(),
  color: text("color").notNull(),
  quantity: integer("quantity").notNull(),
  createdAt: integer("created_at").default(sql`(unixepoch())`).notNull(),
  updatedAt: integer("updated_at").default(sql`(unixepoch())`).notNull(),
});

export type Sku = typeof skus.$inferSelect;

export const reservations = createTable("reservations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  skuId: integer("sku_id").notNull(),
  userId: integer("user_id").notNull(),
  quantity: integer("quantity").notNull(),
  expiresAt: integer("expires_at").notNull(),
  createdAt: integer("created_at").default(sql`(unixepoch())`).notNull(),
  updatedAt: integer("updated_at").default(sql`(unixepoch())`).notNull(),
});


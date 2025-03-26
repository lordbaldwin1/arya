import { db } from "~/server/db";
import { categories as categoriesTable, products as productsTable, productImages as productImagesTable, skus as skusTable } from "~/server/db/schema";

const products =
  [
    {
      name: "Product 1",
      slug: "product-1",
      categoryId: 1,
      price: 100,
      description: "Product 1 description",
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Product 2",
      slug: "product-2",
      categoryId: 1,
      price: 200,
      description: "Product 2 description",
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Product 3",
      slug: "product-3",
      categoryId: 2,
      price: 300,
      description: "Product 3 description",
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Product 4",
      slug: "product-4",
      categoryId: 2,
      price: 400,
      description: "Product 4 description",
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Product 5",
      slug: "product-5",
      categoryId: 3,
      price: 500,
      description: "Product 5 description",
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Product 6",
      slug: "product-6",
      categoryId: 3,
      price: 600,
      description: "Product 6 description",
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Product 7",
      slug: "product-7",
      categoryId: 4,
      price: 700,
      description: "Product 7 description",
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Product 8",
      slug: "product-8",
      categoryId: 4,
      price: 800,
      description: "Product 8 description",
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Product 9",
      slug: "product-9",
      categoryId: 5,
      price: 900,
      description: "Product 9 description",
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Product 10",
      slug: "product-10",
      categoryId: 5,
      price: 1000,
      description: "Product 10 description",
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  
  const productImages = [
    {
      productId: 1,
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      productId: 1,
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      productId: 1,
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      productId: 2,
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }, 
    {
      productId: 2,
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      productId: 2,
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      productId: 3,
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      productId: 3,
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      productId: 3,
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },  
    {
      productId: 4,
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },  
    {
      productId: 4,
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      productId: 4,
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      productId: 5,
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },  
    {
      productId: 5,
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      productId: 5,  
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      productId: 6,
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },  
    {
      productId: 6,
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      productId: 6,  
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      productId: 7,
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },    
    {
      productId: 7,
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      productId: 7,  
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      productId: 8,
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },  
    {
      productId: 8,
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      productId: 8,  
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      productId: 9,
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },  
    {
      productId: 9,
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      productId: 9,  
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      productId: 10,
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      productId: 10,
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      productId: 10,
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const categories = [
    {
      name: "Category 1",
      slug: "category-1",
      description: "Category 1 description",
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Category 2",
      slug: "category-2",
      description: "Category 2 description",
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Category 3",
      slug: "category-3",
      description: "Category 3 description",
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Category 4",
      slug: "category-4",
      description: "Category 4 description",
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Category 5",
      slug: "category-5",
      description: "Category 5 description",
      imageUrl: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const skus = [
    {
      productId: 1,
      sku: "SKU 1",
      price: 100,
      size: "Small",
      color: "Red",
      quantity: 10,
    },
    {
      productId: 1,
      sku: "SKU 2",
      price: 200,
      size: "Medium", 
      color: "Blue",
      quantity: 20,
    },
    {
      productId: 1,
      sku: "SKU 3",
      price: 300,
      size: "Large",
      color: "Green",
      quantity: 30,
    },
    {
      productId: 2,
      sku: "SKU 4",
      price: 400,
      size: "Small",
      color: "Red",
      quantity: 40,
    },
    {
      productId: 2,
      sku: "SKU 5",
      price: 500,
      size: "Medium",
      color: "Blue",
      quantity: 50,
    },
    {
      productId: 2,
      sku: "SKU 6",
      price: 600,
      size: "Large",  
      color: "Green",
      quantity: 60,
    },
    {
      productId: 3,
      sku: "SKU 7",
      price: 700,
      size: "Small",
      color: "Red",
      quantity: 70,
    },
    {
      productId: 3, 
      sku: "SKU 8",
      price: 800,
      size: "Medium",
      color: "Blue",
      quantity: 80,
    },    
    {
      productId: 3,
      sku: "SKU 9",
      price: 900,
      size: "Large",
      color: "Green", 
      quantity: 90,
    },
    {
      productId: 4,
      sku: "SKU 10",
      price: 1000,
      size: "Small",
      color: "Red",
      quantity: 100,
    },
    {
      productId: 4,
      sku: "SKU 11",  
      price: 1100,
      size: "Medium",
      color: "Blue",
      quantity: 110,
    },
    {
      productId: 4,
      sku: "SKU 12",
      price: 1200,
      size: "Large",
      color: "Green",
      quantity: 120,
    },  
    {
      productId: 5,
      sku: "SKU 13",
      price: 1300,
      size: "Small",  
      color: "Red",
      quantity: 20,
    },
    {
      productId: 6,
      sku: "SKU 14",
      price: 1400,
      size: "Medium",
      color: "Blue",
      quantity: 140,
    },
    {
      productId: 7,
      sku: "SKU 15",
      price: 1500,
      size: "Large",
      color: "Green",
      quantity: 150,
    },
    {
      productId: 8,
      sku: "SKU 16",
      price: 1600,
      size: "Small",
      color: "Red",
      quantity: 160,
    },
    {
      productId: 9,
      sku: "SKU 17",
      price: 1700,
      size: "Medium",
      color: "Blue",
      quantity: 170,
    },
    {
      productId: 10,
      sku: "SKU 18",
      price: 1800,
      size: "Large",
      color: "Green",
      quantity: 180,
    },
  ];

  async function insertData() {
    await db.insert(categoriesTable).values(categories).returning();
    await db.insert(productsTable).values(products).returning();
    await db.insert(productImagesTable).values(productImages).returning();
    await db.insert(skusTable).values(skus).returning();
    return { message: "Data inserted successfully" };
  }
  
  export default async function SandboxPage() {
    return (
      <div className="p-8">
        <h1 className="mb-4 text-2xl font-bold">Database Sandbox</h1>
        <form
          action={async () => {
            "use server";
            await insertData();
          }}
        >
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Insert Mock Data
          </button>
        </form>
      </div>
    );
  }
  

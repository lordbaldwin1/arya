import { Button } from "~/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getCategories, getHomePageProducts } from "~/server/db/queries";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Arya - Affordable Luxury Jewelry",
  description: "Discover our collection of premium quality jewelry at accessible prices. Beautiful designs that do not compromise on craftsmanship.",
};

export default async function HomePage() {
  const [productResult, categoriesResult] = await Promise.all([
    getHomePageProducts(),
    getCategories(),
  ]);

  if (!productResult.success) {
    console.error("Failed to fetch home page products", productResult.error);
    return <div>Error fetching products</div>;
  }

  if (!categoriesResult.success) {
    console.error("Failed to fetch categories", categoriesResult.error);
    return <div>Error fetching categories</div>;
  }

  const products = productResult.data;
  const categories = categoriesResult.data;

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
                  Affordable
                  <br />
                  <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Luxury
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground md:text-2xl">
                  Premium quality jewelry at accessible prices. Beautiful designs that do not compromise on craftsmanship.
                </p>
              </div>
              
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <Link prefetch={true} href="/categories/rings">
                  <Button size="lg" className="cursor-pointer text-lg px-8 py-6 bg-primary hover:bg-primary/90">
                    Shop Collection
                  </Button>
                </Link>
                <Link 
                  prefetch={true} 
                  href="/all" 
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                >
                  View All Pieces
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative max-w-lg mx-auto w-full aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1565206077212-4eb48d41f54b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Luxury ring collection"
                fill
                priority
                className="object-cover rounded-sm"
                quality={100}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Collection</h2>
            <p className="mt-4 text-muted-foreground text-lg">Discover our most popular pieces</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products?.map((product) => (
              <div key={product.id} className="group relative overflow-hidden bg-background/50 backdrop-blur-sm border border-border/50 transition-all hover:border-accent/50 hover:shadow-lg">
                <Link prefetch={true} href={`/product/${product.slug}`} className="absolute inset-0 z-10">
                  <span className="sr-only">View Product</span>
                </Link>
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold tracking-tight">{product.name}</h3>
                  <p className="mt-2 text-muted-foreground line-clamp-2">{product.description}</p>
                  <p className="mt-4 text-lg font-medium text-accent">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Shop by Category</h2>
            <p className="mt-4 text-muted-foreground text-lg">Find your perfect piece</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {categories?.map((category) => (
              <Link 
                prefetch={true}
                key={category.id} 
                href={`/categories/${category.slug}`} 
                className="group relative overflow-hidden aspect-square"
              >
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 transition-opacity group-hover:opacity-90" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white tracking-wide">{category.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

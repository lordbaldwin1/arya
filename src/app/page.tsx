import { Button } from "~/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getCategories, getHomePageProducts } from "~/server/db/queries";

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
    <section className="lg:mx-24">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4 flex flex-col justify-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Discover our
              <br />
              Curated Rings
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our carefully selected rings to bring a touch of elegance to your life.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link prefetch={true} href="/categories/rings">
                <Button variant="default">Shop Now</Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <Image
              src="https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Featured Product"
              width={400}
              height={400}
              className="rounded-lg object-cover w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>

    {/* Products Section */}
    <section className="lg:mx-24">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mx-auto px-4 py-12 md:px-6 md:py-16 lg:py-20">
        {products?.map((product) => (
          <div key={product.id} className="group relative overflow-hidden rounded-lg border">
            <Link prefetch={true} href={`/product/${product.slug}`} className="absolute inset-0 z-10">
              <span className="sr-only">View Product</span>
            </Link>
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={500}
              height={500}
              className="h-[300px] w-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="p-4">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.description}</p>
              <p className="mt-2 font-medium">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Categories Section */}
    <section className="lg:mx-24">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <h2 className="mb-8 text-2xl font-bold tracking-tight">Shop by Category</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories?.map((category) => (
            <Link 
              prefetch={true}
              key={category.id} 
              href={`/categories/${category.slug}`} 
              className="group relative overflow-hidden rounded-lg"
            >
              <Image
                src={category.imageUrl}
                alt={category.name}
                width={400}
                height={400}
                className="h-[200px] w-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-white">{category.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <footer className="border-t flex justify-center items-center">
    <div className="container px-4 py-6 md:px-6 md:py-8">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 text-center">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Shop</h3>
            <ul className="grid gap-2 text-sm">
              <li>
                <Link prefetch={true} href="#" className="text-gray-500 hover:text-gray-900">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link prefetch={true} href="#" className="text-gray-500 hover:text-gray-900">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link prefetch={true} href="#" className="text-gray-500 hover:text-gray-900">
                  Sale
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">About</h3>
            <ul className="grid gap-2 text-sm">
              <li>
                <Link prefetch={true} href="#" className="text-gray-500 hover:text-gray-900">
                  Our Story
                </Link>
              </li>
              <li>
                <Link prefetch={true} href="#" className="text-gray-500 hover:text-gray-900">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link prefetch={true} href="#" className="text-gray-500 hover:text-gray-900">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Support</h3>
            <ul className="grid gap-2 text-sm">
              <li>
                <Link prefetch={true} href="#" className="text-gray-500 hover:text-gray-900">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link prefetch={true} href="#" className="text-gray-500 hover:text-gray-900">
                  FAQs
                </Link>
              </li>
              <li>
                <Link prefetch={true} href="#" className="text-gray-500 hover:text-gray-900">
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Connect</h3>
            <ul className="grid gap-2 text-sm">
              <li>
                <Link prefetch={true} href="#" className="text-gray-500 hover:text-gray-900">
                  Instagram
                </Link>
              </li>
              <li>
                <Link prefetch={true} href="#" className="text-gray-500 hover:text-gray-900">
                  Twitter
                </Link>
              </li>
              <li>
                <Link prefetch={true} href="#" className="text-gray-500 hover:text-gray-900">
                  Facebook
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6">
          <div className="flex justify-center items-center">
            <p className="text-sm text-gray-500">© 2025 Arya Jewelry. All rights reserved.</p>
          </div>
        </div>
      </div>
      </footer>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: number;
  name: string;
  slug: string;
  price: number;
  imageUrl: string;
}

export default function ProductCard(props: { products: ProductCardProps[] }) {
  const { products } = props;

  if (!products) return null;

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:mx-24">
      {products.map((product) => {
        return (
          <div key={product.id} className="group">
            <div className="relative mb-2 aspect-square">
              <Link
              prefetch={true}
              href={`/products/${product.slug}`}
              className="block"
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              <Image
                src={product.imageUrl ?? "/placeholder.svg"}
                alt={`A photo of ${product.name}`}
                fill={true}
                quality={65}
                priority
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover transition-opacity hover:opacity-90"
              />
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <Link
              prefetch={true}
              href={`/products/${product.slug}`}
              className="text-sm font-light hover:text-gray-600 text-center"
            >
              {product.name}
            </Link>
          </div>
          <div className="mt-1 flex items-center justify-center">
            <p className="text-sm">{`$${product.price}`}</p>
          </div>
          </div>
        );
      })}
    </div>
  );
}

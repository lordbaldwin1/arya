import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: number;
  name: string;
  slug: string;
  price: number;
  imageUrl: string;
}

export default function ProductCard(props: { product: ProductCardProps }) {
  const { product } = props;

  if (!product) return null;

  return (
    <div
      key={product.id}
      className="group bg-background/30 backdrop-blur-sm border-2 border-border/80 p-4 flex flex-col items-center transition-all duration-300 hover:border-accent hover:shadow-md"
    >
      <Link
        prefetch={true}
        href={`/product/${product.slug}`}
        className="block w-full"
        style={{ position: "relative", width: "100%", height: "auto" }}
      >
        <div className="relative w-full aspect-square mb-4 overflow-hidden bg-muted">
          <Image
            src={product.imageUrl ?? "/placeholder.svg"}
            alt={`A photo of ${product.name}`}
            fill={true}
            quality={75}
            priority
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <Link
        prefetch={true}
        href={`/product/${product.slug}`}
        className="text-base font-medium text-card-foreground hover:text-accent-foreground text-center mb-2 transition-colors duration-200 line-clamp-2"
      >
        {product.name}
      </Link>
      <p className="text-sm font-medium text-muted-foreground">{`$${product.price.toFixed(2)}`}</p>
    </div>
  );
}

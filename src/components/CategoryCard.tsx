import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  categories: {
    id: number;
    name: string;
    slug: string;
    description: string;
    imageUrl: string;
  }[];
}

export default function CategoryCard(props: CategoryCardProps) {
  const { categories } = props;

  if (!categories) return null; 

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <div
          key={category.id}
          className="group bg-card border border-border p-4 flex flex-col items-center transition-all duration-300 hover:border-accent hover:shadow-md"
        >
          <Link
            prefetch={true}
            href={`/categories/${category.slug}`}
            className="block w-full"
            style={{ position: "relative", width: "100%", height: "auto" }}
          >
            <div className="relative w-full aspect-square mb-4 overflow-hidden bg-muted">
              <Image
                src={category.imageUrl ?? "/placeholder.svg"}
                alt={`A photo of ${category.name}`}
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
            href={`/categories/${category.slug}`}
            className="text-base font-medium text-card-foreground hover:text-accent-foreground text-center transition-colors duration-200 line-clamp-2"
          >
            {category.name}
          </Link>
        </div>
      ))}
    </div>
  );
}

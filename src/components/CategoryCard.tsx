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
    <div className="grid grid-cols-3 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:mx-24">
      {categories.map((category) => {
        return (
          <div key={category.id} className="group">
            <div className="relative mb-2 aspect-square">
              <Link
              prefetch={true}
              href={`/categories/${category.slug}`}
              className="block"
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              <Image
                src={category.imageUrl ?? "/placeholder.svg"}
                alt={`A photo of ${category.name}`}
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
              href={`/categories/${category.slug}`}
              className="text-sm font-light hover:text-gray-600 text-center"
            >
              {category.name}
            </Link>
          </div>
          </div>
        );
      })}
    </div>
  );
}

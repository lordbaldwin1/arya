import { notFound } from "next/navigation";
import { getProductDetailsBySlug } from "~/server/db/queries";
import { ProductOptions } from "~/components/ProductOptions";
import { Suspense } from "react";

function LoadingState() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="h-12 w-3/4 bg-muted rounded-lg mb-8" />
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
          <div className="aspect-square bg-muted rounded-xl" />
          <div className="space-y-8 mt-8 lg:mt-0">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-2/3 bg-muted rounded" />
            <div className="h-10 w-1/2 bg-muted rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function Page(props: {
  params: Promise<{ product: string }>;
}) {
  const { product: productParam } = await props.params;
  const urlDecodedProduct = decodeURIComponent(productParam);

  const product = await getProductDetailsBySlug(urlDecodedProduct);

  if (!product.success || !product.data) {
    return notFound();
  }

  const { images, skus, ...productDetails } = product.data;

  return (
    <Suspense fallback={<LoadingState />}>
      <ProductOptions 
        images={images} 
        skus={skus} 
        product={productDetails} 
      />
    </Suspense>
  );
}

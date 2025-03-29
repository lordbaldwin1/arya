import { notFound } from "next/navigation";
import { getProductDetailsBySlug } from "~/server/db/queries";
import { ProductOptions } from "~/components/ProductOptions";

export default async function Page(props: {
  params: Promise<{ product: string }>;
}) {
  const { product: productParam } = await props.params;
  const urlDecodedProduct = decodeURIComponent(productParam);

  const product = await getProductDetailsBySlug(urlDecodedProduct);

  if (!product.success) {
    return notFound();
  }

  const { data: productData } = product;
  if (!productData) {
    return notFound();
  }

  const { images, skus, ...productDetails } = productData;

  return (
      <ProductOptions images={images} skus={skus} product={productDetails} />
  );
}

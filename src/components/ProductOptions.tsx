"use client";

import type { ProductImage, Sku, Product } from "~/server/db/schema";
import Image from "next/image";
import { useState } from "react";
import { AddToCartForm } from "./AddToCartForm";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export function ProductOptions(props: {
  images: ProductImage[];
  skus: Sku[];
  product: Product;
}) {
  const { images, skus, product } = props;
  const [selectedColor, setSelectedColor] = useState<string>(
    skus[0]?.color ?? "",
  );
  const [selectedSize, setSelectedSize] = useState<string>(skus[0]?.size ?? "");

  const uniqueColors = Array.from(new Set(skus.map((sku) => sku.color)));
  const uniqueSizes = Array.from(new Set(skus.map((sku) => sku.size)));

  const selectedSku = skus.find(
    (sku) => sku.color === selectedColor && sku.size === selectedSize,
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
      </div>
      
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        {/* Image Column */}
        <div className="mx-auto mb-8 w-full max-w-2xl lg:max-w-none lg:mb-0 lg:px-0">
          <Carousel className="w-full">
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem key={image.id}>
                  <div className="relative aspect-square overflow-hidden rounded-md">
                    <Image
                      src={image.imageUrl}
                      alt={product.name}
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      fill
                      priority={true}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
          </Carousel>
        </div>

        {/* Options Column */}
        <div className="space-y-6 lg:sticky lg:top-4">
          <p className="mt-2 text-muted-foreground">{product.description}</p>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Select Color</h2>
            <div className="flex flex-wrap gap-3">
              {uniqueColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`min-w-[4rem] rounded-md border px-3 py-2 text-sm font-medium text-foreground ${
                    selectedColor === color
                      ? "border-primary bg-accent"
                      : "border-border hover:border-border/80 hover:bg-accent/50"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Select Size</h2>
            <div className="flex flex-wrap gap-2">
              {uniqueSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[4rem] rounded-md border px-3 py-2 text-sm font-medium text-foreground ${
                    selectedSize === size
                      ? "border-primary bg-accent"
                      : "border-border hover:border-border/80 hover:bg-accent/50"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Price and Stock */}
          {selectedSku ? (
            <div className="mt-6 space-y-2">
              <p className="text-2xl font-bold text-foreground">
                ${(selectedSku.price / 100).toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">
                {selectedSku.quantity > 0
                  ? `${selectedSku.quantity} in stock`
                  : "Out of stock"}
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-2">
              <p className="text-2xl font-bold text-foreground">
                ${(product.price / 100).toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">
                Out of stock
              </p>
            </div>
          )}

          {/* Add to Cart Button */}
          <AddToCartForm
            productSlug={product.slug}
            skuId={selectedSku?.id?.toString() ?? ""}
            color={selectedColor}
            size={selectedSize}
            selectedSku={selectedSku}
            hasSelectedOptions={!!(selectedColor && selectedSize)}
          />
        </div>
      </div>
    </div>
  );
}

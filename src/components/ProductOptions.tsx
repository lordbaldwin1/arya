"use client";

import type { ProductImage, Sku, Product } from "~/server/db/schema";
import Image from "next/image";
import Link from "next/link";
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
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
        <Link
            href="/all"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Products
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {product.name}
          </h1>
        </div>
        
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
          {/* Image Column */}
          <div className="mx-auto mb-8 w-full max-w-2xl lg:max-w-none lg:mb-0">
            <div className="relative mx-auto max-w-[600px] rounded-xl overflow-hidden shadow-lg">
              <Carousel className="w-full">
                <CarouselContent>
                  {images.map((image) => (
                    <CarouselItem key={image.id}>
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={image.imageUrl}
                          alt={product.name}
                          className="object-cover transition-transform duration-300 hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          fill
                          priority={true}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/90 hover:text-gray-800 text-black shadow-lg rounded-full p-2 z-10 border border-border" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/90 hover:text-gray-800 text-black shadow-lg rounded-full p-2 z-10 border border-border" />
              </Carousel>
            </div>
          </div>

          {/* Options Column */}
          <div className="space-y-8 lg:sticky lg:top-8">
            <div className="prose prose-sm text-muted-foreground">
              <p className="text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Color Selection */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Color</h2>
              <div className="flex flex-wrap gap-3">
                {uniqueColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`min-w-[5rem] rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                      selectedColor === color
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50 hover:bg-accent/50"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Size</h2>
              <div className="flex flex-wrap gap-3">
                {uniqueSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[4rem] rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                      selectedSize === size
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50 hover:bg-accent/50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price and Stock */}
            <div className="mt-8 space-y-4 border-t border-border pt-6">
              {selectedSku ? (
                <>
                  <div className="flex items-baseline justify-between">
                    <p className="text-3xl font-bold text-foreground">
                      ${selectedSku.price.toFixed(2)}
                    </p>
                    <p className="text-sm font-medium text-muted-foreground">
                      {selectedSku.quantity > 0
                        ? `${selectedSku.quantity} in stock`
                        : "Out of stock"}
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-sm font-medium text-muted-foreground">
                  Out of stock
                </p>
              )}
            </div>

            {/* Add to Cart Button */}
            <div className="mt-8">
              <AddToCartForm
                productSlug={product.slug}
                skuId={selectedSku?.id ?? 0}
                color={selectedColor}
                size={selectedSize}
                selectedSku={selectedSku}
                hasSelectedOptions={!!(selectedColor && selectedSize)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

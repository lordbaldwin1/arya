"use client";

import type { ProductImage, Sku, Product } from "~/server/db/schema";
import Image from "next/image";
import { useState } from "react";
import { AddToCartForm } from "./AddToCartForm";
export function ProductOptions(props: {
  images: ProductImage[];
  skus: Sku[];
  product: Product;
}) {
  const { images, skus, product } = props;
  const [selectedColor, setSelectedColor] = useState<string>(skus[0]?.color ?? "");
  const [selectedSize, setSelectedSize] = useState<string>(skus[0]?.size ?? "");

  const uniqueColors = Array.from(new Set(skus.map((sku) => sku.color)));
  const uniqueSizes = Array.from(new Set(skus.map((sku) => sku.size)));

  const selectedSku = skus.find(
    (sku) => sku.color === selectedColor && sku.size === selectedSize,
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        <p className="mt-2 text-gray-600">{product.description}</p>
      </div>

      {/* Product Images Section */}
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="grid grid-cols-2 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative aspect-square overflow-hidden rounded-lg transition-opacity hover:opacity-75"
            >
              <Image
                src={image.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>

        {/* Product Options Section */}
        <div className="space-y-6">
          {/* Color Selection */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Select Color
            </h2>
            <div className="flex flex-wrap gap-3">
              {uniqueColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`min-w-[4rem] rounded-md border px-3 py-2 text-sm font-medium ${
                    selectedColor === color
                      ? "border-gray-900"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Select Size</h2>
            <div className="flex flex-wrap gap-2">
              {uniqueSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[4rem] rounded-md border px-3 py-2 text-sm font-medium ${
                    selectedSize === size
                      ? "border-gray-900"
                      : "border-gray-200 hover:border-gray-400"
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
              <p className="text-2xl font-bold text-gray-900">
                ${(selectedSku.price / 100).toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                {selectedSku.quantity > 0
                  ? `${selectedSku.quantity} in stock`
                  : "Out of stock"}
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-2">
              <p className="text-2xl font-bold text-gray-900">
                ${(product.price / 100).toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                Sorry! This size and color are out of stock.
              </p>
            </div>
          )}

          {/* Add to Cart Button */}
          {selectedColor && selectedSize ? (
            <AddToCartForm
              productSlug={product.slug}
              skuId={selectedSku?.id?.toString() ?? ""}
              color={selectedColor}
              size={selectedSize}
              disabled={!selectedSku || selectedSku.quantity < 0}
            >
              {!selectedSku ? "Out of stock" : "Add to Cart"}
            </AddToCartForm>
          ) : (
            <button
              disabled
              className="w-full rounded-md bg-gray-200 px-4 py-2 text-gray-500"
            >
              Select options
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

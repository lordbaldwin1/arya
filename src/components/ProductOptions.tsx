"use client";

import type { ProductImage, Sku, Product } from "~/server/db/schema";
import Image from "next/image";
import { useState } from "react";

export function ProductOptions(props: {
  images: ProductImage[];
  skus: Sku[];
  product: Product;
}) {
  const { images, skus, product } = props;
  const [selectedColor, setSelectedColor] = useState<string>();
  const [selectedSize, setSelectedSize] = useState<string>();

  const uniqueColors = Array.from(new Set(skus.map(sku => sku.color)));
  const uniqueSizes = Array.from(new Set(skus.map(sku => sku.size)));

  const selectedSku = skus.find(
    sku => sku.color === selectedColor && sku.size === selectedSize
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        <p className="mt-2 text-gray-600">{product.description}</p>
      </div>

      {/* Product Images Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="grid grid-cols-2 gap-4">
          {images.map((image) => (
            <div 
              key={image.id} 
              className="relative aspect-square overflow-hidden rounded-lg hover:opacity-75 transition-opacity"
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
            <h2 className="text-lg font-semibold text-gray-900">Select Color</h2>
            <div className="flex flex-wrap gap-3">
              {uniqueColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`group relative h-12 w-12 rounded-full border-2 p-0.5 
                    ${selectedColor === color 
                      ? 'border-gray-900' 
                      : 'border-gray-200 hover:border-gray-400'}`}
                >
                  <span 
                    className="absolute inset-1 rounded-full"
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                  <span className="sr-only">{color}</span>
                  {/* Color tooltip */}
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 
                    whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white 
                    opacity-0 group-hover:opacity-100 transition-opacity">
                    {color}
                  </span>
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
                  className={`min-w-[4rem] rounded-md border px-3 py-2 text-sm font-medium
                    ${selectedSize === size
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-200 hover:border-gray-400'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Price and Stock */}
          {selectedSku && (
            <div className="mt-6 space-y-2">
              <p className="text-2xl font-bold text-gray-900">
                ${(selectedSku.price / 100).toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                {selectedSku.quantity > 0 
                  ? `${selectedSku.quantity} in stock` 
                  : 'Out of stock'}
              </p>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            disabled={!selectedSku}
            className="w-full bg-black text-white py-3 px-4 rounded-lg 
              hover:bg-gray-800 transition-colors disabled:bg-gray-300 
              disabled:cursor-not-allowed"
          >
            {!selectedColor || !selectedSize 
              ? 'Select options' 
              : selectedSku 
                ? 'Add to Cart' 
                : 'Out of stock'}
          </button>
        </div>
      </div>
    </div>
  );
}

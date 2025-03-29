"use server";

import { getCart, updateCart } from "./cart";

export async function addToCart(prevState: unknown, formData: FormData) {
  const prevCart = await getCart();
  const productSlug = formData.get("productSlug");
  const productColor = formData.get("color");
  const productSize = formData.get("size");
  if (typeof productSlug !== "string" || typeof productColor !== "string" || typeof productSize !== "string") {
    return;
  }

  const itemAlreadyExists = prevCart.find(
    (item) => item.productSlug === productSlug && item.color === productColor && item.size === productSize,
  );

  if (itemAlreadyExists) {
    const newQuantity = itemAlreadyExists.quantity + 1;
    const newCart = prevCart.map((item) => {
      if (item.productSlug === productSlug) {
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });
    await updateCart(newCart);
  } else {
    const newCart = [...prevCart, { productSlug, quantity: 1, color: productColor, size: productSize }];
    await updateCart(newCart);
  }

  return "Item added to cart";
}

export async function removeFromCart(formData: FormData) {
  const prevCart = await getCart();
  const productSlug = formData.get("productSlug");
  const productColor = formData.get("color");
  const productSize = formData.get("size");
  if (typeof productSlug !== "string" || typeof productColor !== "string" || typeof productSize !== "string") {
    return;
  }
  const itemAlreadyExists = prevCart.find(
    (item) => item.productSlug === productSlug && item.color === productColor && item.size === productSize,
  );
  if (!itemAlreadyExists) {
    return;
  }
  const newCart = prevCart.filter((item) => item.productSlug !== productSlug || item.color !== productColor || item.size !== productSize);
  await updateCart(newCart);
}

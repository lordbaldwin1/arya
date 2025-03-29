# New Arya Jewelry Site

# TODO
- [x] Add pagination/sorting
- [] Add product pages
- [] Add cart page
- [] Setup stripe
- [] Look into adding 'Quick-Add' to product cards (selecting size/color and display price on hover)
- [] Look into testing

# Understanding Reservations
- Need to get a UUID sessionId stored in cookie for each user when they add an item to cart

# Understanding Pagination
- Items per page: 50 (3 for testing)
- Query db with URL page param, offset by items per page

# Understanding Sorting
- Store sort order in URL param
- Query db with sort order param
- Sort orders: price-asc, price-desc, A-Z, Z-A

# Notes to get back into it
- Hook up AddToCartForm in ProductOptions
- Add a check in ProductOptions to check if sku.quantity > 0
- Make sure to re-add stock when cart items are removed or expire (look into how to implement expiration!)
- Restyle the product page/ProductOptions components
- Create cart page to verify it is working

# Understanding Product Page
- Get detailed product information (product, skus, productimages)
- Pass those arrays to ProductOptions
- Display images, sizes, colors. Add state for selectedColor/selectedSize
- To find the matching SKU, skus.find((sku) => sku.color === selectedColor && sku.size === selectedSize,);
- Pass information to cart form which handles addToCart action

# Handling Cart

# Actions
## `addToCart(prevState: unknown, formData: FormData)`
- Pass slug, color, size, and skuId to addToCart action from props
- Add to cart gets the previous cart, extracts form data, validates types, if the item already exists, update cart quantity.
- Creates a new array and calls `updateCart(newCart)`
## `removeFromCart(formData: FormData)`
- gets previous cart, extracts form data, validates types, checks if item exists, if it does, filter it out with `prevCart.filter((item) => item.productSlug !== productSlug || item.color !== productColor || item.size !== productSize || item.skuId !== skuId);` then call updateCart(newCart)

# Cookie/Query/Schema
## `cartSchema`
- Array: productSlug, skuId, quantity, color, size
## `CartItem`
- type is CartSchema but singular
## `getCart()`
- `const cart = (await cookies()).get("cart");`
- `return cartSchema.parse(JSON.parse(cart.value));` to parse it into an array of type cartSchema
## `detailedCart()`
- calls `getCart()` to fetch cart
- queries db using product slug
- adds quantity and skuId (maybe doesn't need skuId??)



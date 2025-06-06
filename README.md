# Arya Jewelry Storefront

A jewelry e-commerce platform built with Next.js, featuring a responsive design, real-time inventory management, and secure checkout.

## Features

- **Product Lists**
  - Browse all products or by categories
  - Product pages with size and color options
  - Stock management
  - Pagination
  - Multiple sorting options

- **Shopping Cart**
  - Session-based cart management
  - Real-time stock reservation
  - Automatic cart expiration

- **User Experience**
  - Responsive design for all screen sizes
  - Modern UI
  - Intuitive navigation

## Technical Implementation

### Cart Management
- Session-based cart storage using cookies
- Cart schema includes: productSlug, skuId, quantity, color, size
- Automatic stock reservation when items are added to cart
- Stock release on cart item removal or expiration

### Product Management
- Detailed product information including:
  - Product details
  - SKU information
  - Product images
  - Size and color variants
- Real-time stock tracking
- Pagination and sorting capabilities

### Database Queries
- Efficient product fetching with pagination
- Category-based filtering
- Dynamic sorting options
- Total product count tracking

## Development Status

### Completed
- [x] Pagination and sorting implementation
- [x] Product pages with detailed views
- [x] Shopping cart functionality
- [x] Reservation expiration system
- [x] Stripe integration

### Future work
- [ ] Quick-Add feature for product cards
- [ ] More extensive testing
- [ ] Additional UI/UX improvements

## Technical Notes

### Reservation System
- Uses UUID sessionId stored in cookies
- Automatic expiration of reservations through cron jobs

### Pagination
- URL-based page parameter
- Dynamic offset calculation

### Sorting
- URL parameter-based sort order
- Supported options:
  - Price ascending/descending
  - Alphabetical (A-Z, Z-A)

## Getting Started

1. Clone the repository
2. Install dependencies
3. Set up environment variables
4. Run the development server

## Environment Variables

Check `.env.example` for required environment variables

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# TODO
- [x] Add pagination/sorting
- [x] Add product pages
- [x] Add cart page
- [x] Add cron job for reservation expiration
- [x] Setup stripe
- [] Look into adding 'Quick-Add' to product cards (selecting size/color and display price on hover)

## Notes taken during development

# Understanding Reservation Expiration
- What needs to update?
- Cookies (user's cart) automatically expire
- Reservation expire, stock added back to SKU
- When Cron Job run, check all reservations table, add all of that stock back then delete reservations.
- Add a button to test the stock updating for now.

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



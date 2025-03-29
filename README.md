# New Arya Jewelry Site

# TODO
- [x] Add pagination/sorting
- [] Add product pages
- [] Add cart page
- [] Setup stripe
- [] Look into adding 'Quick-Add' to product cards (selecting size/color and display price on hover)
- [] Look into testing

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

Error in products page: Error: Dynamic server usage: Route /all couldn't be rendered statically because it used ``await searchParams`, `searchParams.then`, or similar`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error
    at y (.next/server/chunks/617.js:1:71564)
    at Object.get (.next/server/chunks/617.js:15:4505)
    at d (.next/server/app/all/page.js:1:11320)
    at stringify (<anonymous>) {
  description: "Route /all couldn't be rendered statically because it used ``await searchParams`, `searchParams.then`, or similar`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error",
  digest: 'DYNAMIC_SERVER_USAGE'
}


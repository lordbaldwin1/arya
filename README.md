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
- 


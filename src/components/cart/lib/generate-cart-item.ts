export function generateCartItem(item: any) {
  return {
    id: String(item.id),  // force en string
    name: item.name,
    slug: item.slug,
    unit: item.unit,
    image: item.image?.url,
    stock: item.quantity,
    price: Number(item.sale_price ? item.sale_price : item.price),
    shop: {
      slug: item.shop.slug,
      name: item.shop.name,
    },
    language: item.language,
  };
}

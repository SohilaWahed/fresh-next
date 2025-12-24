"use server"

export default async function getRelatedProductsCategory(categoryId: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`
  )
  const payload = await res.json()
  return payload
}

"use server"

export default async function getRelatedProductsBrand(brandId: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`
  )

  const payload = await res.json()
  return payload
}

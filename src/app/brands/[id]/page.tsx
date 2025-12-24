import React from "react"
import Image from "next/image"
import { ProductType } from "@/types/product.type"
import SingleProduct from "@/app/_/components/singleProduct/singleProduct"
import getRelatedProductsBrand from "@/productCategoryActions/relatedProductBrand.action"

export default async function BrandDetails({ params }: { params: { id: string } }) {
  const { id } = params

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
  const { data: brand } = await res.json()

  if (!brand) {
    return (
      <h1 className="text-red-600 font-bold text-5xl text-center mt-28">
        Brand Not Found
      </h1>
    )
  }

  const relatedProducts = await getRelatedProductsBrand(id)

  return (
    <div className="w-[90%] mx-auto my-10">
      <div className="flex flex-col items-center">
        <Image
          src={brand.image}
          alt={brand.name}
          width={250}
          height={250}
          className="rounded-lg shadow"
        />
        <h2 className="text-3xl font-bold mt-4">{brand.name}</h2>
      </div>

      <div className="flex flex-wrap gap-6 justify-center mt-10">
        {relatedProducts?.data?.length > 0 ? (
          relatedProducts.data.map((product: ProductType) => (
            <SingleProduct key={product._id} product={product} />
          ))
        ) : (
          <p className="text-gray-600 text-lg mt-6">No products for this brand.</p>
        )}
      </div>
    </div>
  )
}

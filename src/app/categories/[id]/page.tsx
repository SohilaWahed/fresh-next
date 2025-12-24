import React from 'react'
import Image from 'next/image';
import SubCategories from '../subCategory/[id]/page';
import getRelatedProductsCategory from '@/productCategoryActions/relatedProductCategory.action';
import { ProductType } from '@/types/product.type';
import SingleProduct from '@/app/_/components/singleProduct/singleProduct';


export default async function categoryDetails({params}:{params:Promise<{id:string}>}) {
 
    const {id}= await params

    
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);


    const {data} = await response.json();

    if(!data){
      return <h1 className='text-red-600 font-bold text-5xl text-center mt-28 '>No categories here</h1>
    }


  const relatedProducts = await getRelatedProductsCategory(id)

  return (
    <>


       <div className="flex flex-col items-center mt-20 ">
        <div className="shadow p-6">
      <Image src={data.image} alt={data.name} width={300} height={300} className="rounded-lg shadow" />
      <h1 className="text-3xl font-bold mt-6 text-center">{data.name}</h1>
  </div>
    
<SubCategories categoryId={id} />


 <div className="flex flex-wrap gap-6 justify-center mt-10">
        {relatedProducts?.data?.length > 0 ? (
          relatedProducts.data.map((product: ProductType) => (
            <SingleProduct key={product._id} product={product} />
          ))
        ) : (
          <p className="text-gray-600 text-lg">No products for this category.</p>
        )}
      </div>

</div>

    </>
  )
}


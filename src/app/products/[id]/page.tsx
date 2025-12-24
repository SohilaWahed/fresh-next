import React from 'react'
import Image from 'next/image';
import AddBtn from '@/app/_/components/AddBtn/AddBtn';
import getRelatedProducts from '@/productCategoryActions/relatedProduct.action';
import { ProductType } from '@/types/product.type';
import SingleProduct from '@/app/_/components/singleProduct/singleProduct';


export default async function ProductDetails({params}:{params:Promise<{id:string}>}) {
 
    const {id}= await params

    
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`);


    const {data}= await response.json();

    if(!data){
      return <h1 className='text-red-600 font-bold text-5xl text-center mt-28 '>No products here</h1>
    }

    const RelateProducts =await getRelatedProducts(data.category._id)
   

  return (
    <>
<div className='w-[80%] mx-auto flex p-6 border rounded-lg shadow-lg mt-24 '>
    <div className='w-1/4'>
        <Image src={data.imageCover} alt="image"  className='w-full' width={100} height={100}/>
    </div>

    <div className='w-3/4'>
       <div className='p-5'>
         <h1 className='text-2xl font-bold p-3'>
            {data.title}
        </h1>

        <p>{data.description}</p>
        <p className='text-emerald-500 my-3 '>{data.category.name}</p>

        <div className='flex justify-between w-full'>
    <span>{data.price}EGP</span>
<span>{data.ratingsAverage} <i className='fa fa-star text-yellow-400'></i></span>
  
   </div>
  <div  className='mt-5'>
<AddBtn id={data.id}/>
</div>
       </div>
    </div>
</div>


<div className='w-[80%] mx-auto my-14'>
       <div className='flex flex-wrap'>
             {RelateProducts.data.map((product:ProductType)=> (
             <SingleProduct key={product.id} product={product} /> ))}
           </div>
          </div>
    </>
  )
}


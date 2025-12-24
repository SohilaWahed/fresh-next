import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import Image from 'next/image'
import  {ProductType} from './../../../../types/product.type';
import AddBtn from '../AddBtn/AddBtn'
import Addwishlist from '../Addwishlist/Addwishlist';

export default function SingleProduct({product}:{product:ProductType}) {
  return  <>
        <div className='w-full xl:w-1/5 md:w-1/2 lg:w-1/4' >

<div className='p-2'>

  <Card className='gap-1 p-2'>
<Addwishlist  id={product.id}/>
    <Link href={`/products/${product.id}`}>
  <CardHeader>
    <CardTitle>
<Image src={product.imageCover} alt="image" width={500} height={500} />
    </CardTitle>
    <CardDescription className='text-emerald-700'>{product.category.name}</CardDescription>
  </CardHeader>
  <CardContent className='font-bold'>
    <p className='line-clamp-1'>{product.title}</p>
  </CardContent>
  <CardFooter>
   <div className='flex justify-between w-full'>
    <span>{product.price}EGP</span>
<span>{product.ratingsAverage} <i className='fa fa-star text-yellow-400'></i></span>
  
   </div>
  </CardFooter>
  </Link>
  <AddBtn id={product.id}/>
</Card>
</div>
      </div>
      </>
  
}

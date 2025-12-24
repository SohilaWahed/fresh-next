import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import Image from 'next/image'
import AllBrand from '@/api/AllBrand';
import { BrandType } from '@/types/brand.type';

export default async function Brands() {
const data=  await AllBrand();


  return (
    <>

      <div className='w-[80%] mx-auto my-14'>
           <div className='flex flex-wrap'>
                 {data.map((brand:BrandType)=> (
      <div className='w-full xl:w-1/5 md:w-1/2 lg:w-1/4 '  key={brand._id}>
       
<div className='p-2'>

  <Card className='gap-1 p-2'>
    <Link href={`/brands/${brand._id}`}>
  <CardHeader>
    <CardTitle>
<Image src={brand.image} alt="image" width={500} height={500} />
    </CardTitle>
  </CardHeader>
  <CardContent className='font-bold'>
     <p className='text-center'>{brand.name}</p>
  </CardContent>

  </Link>
</Card>
</div>
      </div>))}
      </div>
      </div>
    </>
  )
}



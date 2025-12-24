"use client"
import React from 'react'
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Autoplay } from 'swiper/modules'
import { CategoryType } from '@/types/category.type';



export default function CategorySwiper({data}:{data:CategoryType[]}) {
  
  return (
    <>
     <div className='hidden md:block w-[80%] mx-auto my-10 '>
  <h3 className='mb-3'>Shop Popular Categories </h3>

    <SwiperSlide className=' border'> 
    <Swiper
      spaceBetween={0}
      slidesPerView={7}
    modules={[Autoplay]}
    autoplay={{ delay: 3000 }}
    >
      {data.map((category:CategoryType)=>
      <SwiperSlide  key={category._id}>
       <div>
         <Image src={category.image} alt='slider1' className='w-full h-[150px] object-cover' width={100} height={100}/>
        
    <p className='text-center font-bold'>{category.name}</p>
       </div>
    </SwiperSlide>
    )}
    </Swiper>
  </SwiperSlide>

   
</div>  
    </>
  )
}

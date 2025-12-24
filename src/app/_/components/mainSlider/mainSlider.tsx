"use client"
import React from 'react'
import slider1 from '../../../../../public/slider-image-1.jpeg'
import slider2 from '../../../../../public/slider-image-2.jpeg'
import slider3 from '../../../../../public/slider-image-3.jpeg'
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Autoplay } from 'swiper/modules'

export default function MainSlider() {
  return (
    <>
<div className='w-full md:w-[80%] mx-auto my-10 flex'>
    <div className='w-3/4 '>


    <Swiper
      spaceBetween={0}
      slidesPerView={1}
    modules={[Autoplay]}
    autoplay={{ delay: 3000 }}
    >
      <SwiperSlide><Image src={slider1} alt='slider1' className='w-full h-[400px] object-cover'/></SwiperSlide>
      <SwiperSlide><Image src={slider2} alt='slider1' className='w-full h-[400px] object-cover'/></SwiperSlide>
      <SwiperSlide><Image src={slider3} alt='slider1' className='w-full h-[400px] object-cover'/></SwiperSlide>
    
    </Swiper>
    </div>  
    <div className='w-1/4'>
        <Image src={slider2} alt='slider2' className='w-full h-[200px] object-cover'/>
        <Image src={slider3} alt='slider3' className='w-full h-[200px] object-cover'/>
    </div>  
</div>  
  </>
  )
}

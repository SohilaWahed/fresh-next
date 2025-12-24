import React from 'react'
import CategorySwiper from '../categorySwiper/categorySwiper';
import GetAllCategories from '@/api/getAllCategories';

export default async  function CategorySlider() {

    const data=await GetAllCategories();

    

  return (
    <>
      <CategorySwiper data={data}/>
    </>
  )
}

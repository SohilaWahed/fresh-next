"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import getLoggedUserWishlist from '@/wshlistAction/getUserwishlist.action'
import RemoveItemFromWishlist from '@/wshlistAction/removewishlist.action'
import { WishlistType } from '@/types/wishlist.type'
import AddBtn from '../_/components/AddBtn/AddBtn'

export default  function Wishlist() {
const[products,setproducts]=useState([])
const[removeDesiable,setremoveDesiable]=useState <string | null>(null)


 async function getUserWishlist() {

    try {

      const res = await getLoggedUserWishlist();  

      if (res.status === "success") {
        setproducts(res.data);
      }
    } catch (err:unknown) {
      if(err instanceof Error){
        return
    } 
      toast.error("Failed to load wishlist");
    }  
  }

async function deleteProduct(id:string) {
      setremoveDesiable(id);
      const res = await RemoveItemFromWishlist(id);
      if (res.status === "success") {
                setproducts(res.data);
        toast.success("Product removed from wishlist");
        getUserWishlist(); 
      } else {
        toast.error("Failed to remove product");
         setremoveDesiable(null);
      }
    
}



useEffect(()=>{
  getUserWishlist()
},[])



  return (
    <>
      <div className='w-[80%] mx-auto mt-24'>
        {products?.length> 0 ? <>

  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-neutral-500 dark:text-neutral-400">
        <thead className="text-xs text-neutral-700 uppercase bg-neutral-50 dark:bg-neutral-700 dark:text-neutral-400">
          <tr>
            <th scope="col" className="px-16 py-3">
            Image
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            
            <th scope="col" className="px-6 py-3 ">
              Price
            </th> 
           
            <th scope="col" className="px-6 py-3 text-center" colSpan={2}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          
{products.map((product:WishlistType)=>
<tr key={product._id} className="bg-white border-b dark:bg-neutral-800 dark:border-neutral-700 border-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-600">
            <td className="p-4">
            {product.imageCover ? (
  <Image
    src={product.imageCover}
    alt={product.title || "product"}
    className="w-16 md:w-32 max-w-full max-h-full"
    width={100}
    height={100}
  />
) : (
  <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
    No Image
  </div>
)}
            </td>
            <td className="px-6 py-4 font-semibold text-neutral-900 dark:text-white">
              {product.title}  </td>
            
            <td className="px-6 py-4 font-semibold text-neutral-900 dark:text-white">{product.price}EGP</td>
            <td className="px-6 py-4 font-semibold text-neutral-900 dark:text-white">
              <AddBtn id={product._id} />
           </td>
           
            <td className="px-6 py-4 ">
              
            <button
  disabled={removeDesiable === product._id}
  onClick={() => deleteProduct(product._id)}
  className="font-medium text-red-600 dark:text-red-500 hover:underline flex items-center disabled:text-gray-400 cursor-pointer">
  <i className='fa fa-trash me-2'></i>
  Remove
</button>
             
            </td>
          </tr>
)}
      </tbody>
      </table>
       </div>
</>:<h1 className="text-center bg-red-300 mt-20 text-red-700 text-4xl py-6 ">❌ No products added yet </h1>}
   </div> 

    </>
  )
}

















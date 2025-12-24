"use client"
import clearCartItem from '@/CartActions/clearCartItem.action'
import getLoggedUserCart from '@/CartActions/getUserCart.action'
import RemoveItemFromCart from '@/CartActions/removeCart.action'
import updateCartQuantity from '@/CartActions/updateCartQuantity.action'
import { cartContext } from '@/context/cartContext'
import { cartProductType } from '@/types/cart.type'
import {  Spinner } from 'flowbite-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import Link from 'next/link';
import { Button } from '@/components/ui/button'

export default  function Cart() {
  const context=useContext(cartContext)
  if(!context)throw new Error
    const{numberOfCartItem,setnumberOfCartItem}=context
const[products,setproducts]=useState([])
const[isLoading,setisLoading]=useState(true)
const[removeDesiable,setremoveDesiable]=useState(false)
const[updateDesiable,setupdateDesiable]=useState(false)
const[loadingUpdate,setloadingUpdate]=useState(false)
const[currentId,setcurrentId]=useState("")
const[total,settotal]=useState(0)
const[cartId,setcartId]=useState("")


async function getUserCart(){

try{
  const res=await getLoggedUserCart()
  if(res.status==="success"){
    settotal(res.data.totalCartPrice)
    setproducts(res.data.products) 
    setisLoading(false)
    setcartId(res.data._id)
    toast.success("Cart loaded successfully", { position: "top-center" })

  }
 
}
catch(err:unknown){
  if(err instanceof Error){
        return
    } 
  toast.error("Failed to load cart", { position: "top-center" })
  setisLoading(false)
}
}

async function deleteProduct(id:string) {
  setremoveDesiable(true)
const res = await  RemoveItemFromCart(id)

  if(res.status==="success"){
    setproducts(res.data.products) 
toast.success("Product removed from cart", { position: "top-center" })
getUserCart()
let sum = 0

    res.data.products.forEach((product:cartProductType)=>{
    sum += product.count
    })
   setnumberOfCartItem(sum)
 

  setremoveDesiable(false)

}
else{
  toast.error("Failed to remove product", { position: "top-center" })
    setremoveDesiable(false)

}
}

async function updateCart(id:string,count:string, sign:string) {
  setcurrentId(id)
  setloadingUpdate(true)
 setupdateDesiable(true)
const res = await  updateCartQuantity(id,count)

  if(res.status==="success"){
    setproducts(res.data.products) 
toast.success("Cart updated successfully", { position: "top-center" })
 setupdateDesiable(false)
 setloadingUpdate(false)
getUserCart()

 if(sign==="+"){
  setnumberOfCartItem(numberOfCartItem+1)

 }
 if(sign==="-"){
  setnumberOfCartItem(numberOfCartItem-1)

 }
}
else{
  toast.error("Failed to update cart", { position: "top-center" })
   setupdateDesiable(false)
   setloadingUpdate(false)
}
}

async function clear() {
    setremoveDesiable(true)
const res = await clearCartItem()
if(res.message === "success"){
  getUserCart()
    setremoveDesiable(false)

}
}

useEffect(()=>{
  getUserCart()
},[])

if(isLoading){
return <div className="text-center mt-36">
        <Spinner aria-label="Center-aligned spinner example Extra large"  size="xl" />
      </div>
}
  return (
    <>
      <div className='w-[80%] mx-auto mt-24'>
        {products?.length> 0 ? <>

<div className="flex justify-end mb-4">
              <button
              disabled={removeDesiable}
              onClick={()=>clear()}
                className="px-5 py-2 hover:text-red-700 text-red-900  cursor-pointer">
              <i className='fa fa-trash me-2'></i>  
                 Clear Cart</button>
            </div>

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
            <th scope="col" className="px-6 py-3">
              Qty
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          
{products.map((product:cartProductType)=>
<tr key={product._id} className="bg-white border-b dark:bg-neutral-800 dark:border-neutral-700 border-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-600">
            <td className="p-4">
              <Image
          
                src={product.product.imageCover}
                alt={product.product.title}
                className="w-16 md:w-32 max-w-full max-h-full"
                width={100}
                height={100}
              />
            </td>
            <td className="px-6 py-4 font-semibold text-neutral-900 dark:text-white">
{product.product.title}            </td>
            <td className="px-6 py-4">
              <div className="flex items-center">

                <button
                disabled={updateDesiable}
                onClick={()=>updateCart(product.product.id , `${product.count-1}`,"-")}
                  type="button" 
                  className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 
                             text-neutral-500 bg-white border border-neutral-300 rounded-full 
                             hover:bg-neutral-100 focus:ring-4 focus:ring-neutral-200 
                             dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-600 
                             dark:hover:bg-neutral-700 dark:hover:border-neutral-600 
                             dark:focus:ring-neutral-700"
                >
                  <span className="sr-only">Decrease quantity</span>
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h16"
                    />
                  </svg>
                </button>
{product.product.id === currentId ? (
  loadingUpdate ? (
    <Spinner aria-label="Center-aligned spinner example Extra large" size="sm" />
  ) : (
    <span>{product.count}</span>
  )
) : (
  <span>{product.count}</span>
)}



                <button
                onClick={()=>updateCart(product.product.id , `${product.count+1}`,"+")}
                disabled={updateDesiable}
                  type="button"
                  className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium 
                             text-neutral-500 bg-white border border-neutral-300 rounded-full 
                             hover:bg-neutral-100 focus:ring-4 focus:ring-neutral-200 
                             dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-600 
                             dark:hover:bg-neutral-700 dark:hover:border-neutral-600 
                             dark:focus:ring-neutral-700"
                >
                  <span className="sr-only">Increase quantity</span>
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </button>
              </div>
            </td>
            <td className="px-6 py-4 font-semibold text-neutral-900 dark:text-white">{product.price*product.count}EGP</td>
            <td className="px-6 py-4">

              <button disabled={removeDesiable} onClick={()=>deleteProduct(product.product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline flex items-center disabled:text-gray-400"> 
                <i className='fa fa-trash me-2'></i>  
                 Remove
                </button>
             
            </td>
          </tr>


)}

          
       
       
        </tbody>
        
              <tfoot>
  <tr>
    <td colSpan={5} className="px-6 py-4  dark:bg-neutral-800 ">
<h1 className="font-bold text-lg text-neutral-900 dark:text-white text-center">     
   Total cart price: {total} EGP
</h1> 
<Link href={`/checkout/${cartId}`}>
<Button className="cursor-pointer">Check out</Button>
</Link>
    </td>
  </tr>
</tfoot>
        
      </table>
    </div>

        </>:<h1 className="text-center bg-red-300 mt-20 text-red-700 text-4xl py-6 ">❌ No products added yet </h1>}


      

        </div> 

    </>
  )
}

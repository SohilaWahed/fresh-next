"use client"
import AddToCart from '@/CartActions/addToCart.action'
import { Button } from '@/components/ui/button'
import { cartContext } from '@/context/cartContext'
import { Spinner } from 'flowbite-react'
import React, { useContext, useState } from 'react'
import { toast } from 'sonner'

export default function AddBtn({id}:{id:string}) {
const context=useContext(cartContext)
if(!context)throw new Error
  const{numberOfCartItem,setnumberOfCartItem}=context
  const[isLoading,setisLoading]=useState(false)


    async function checkAddProduct(id:string){
       
           setisLoading(true)

  const res=   await AddToCart(id)

  if(res.status==="success"){
toast.success("product added to cart" ,{position:"top-center"})
    setisLoading(false)
setnumberOfCartItem(numberOfCartItem+1)
  }
    else{
toast.error(res.message ,{position:"top-center"})
    setisLoading(false)
    }
         
        
        }

  return (
    <>

       <Button
      disabled={isLoading}
      onClick={() => checkAddProduct(id)}
      variant="outline"
      className="cursor-pointer">
      {isLoading ?  <Spinner aria-label="Center-aligned spinner example Extra large" size="sm"/>
       : "Add to Cart" }
    </Button>
    </>
  )
}

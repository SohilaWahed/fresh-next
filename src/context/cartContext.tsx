"use client"
import getLoggedUserCart from "@/CartActions/getUserCart.action"
import React, { createContext, useEffect, useState, ReactNode } from "react"


interface CartContextType {
  numberOfCartItem: number
  setnumberOfCartItem: React.Dispatch<React.SetStateAction<number>>
}

export const cartContext = createContext<CartContextType | undefined>(undefined)

interface CartContextProviderProps {
  children: ReactNode
}

export default function CartContextProvider({ children }: CartContextProviderProps) {
  const [numberOfCartItem, setnumberOfCartItem] = useState<number>(0)

  async function getUserCart() {
    try {
      const res = await getLoggedUserCart()
      if (res.status === "success") {
        let sum = 0
        res.data.products.forEach((product: { count: number }) => {
          sum += product.count
        })
        setnumberOfCartItem(sum)
      }
    } catch (err) {
      console.error("Error fetching cart:", err)
    }
  }

  useEffect(() => {
    getUserCart()
  }, [])

  return (
    <cartContext.Provider value={{ numberOfCartItem, setnumberOfCartItem }}>
      {children}
    </cartContext.Provider>
  )
}

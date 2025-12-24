"use server"

import { getMyToken } from "@/utilities/getMyToken"

export async function getUserOrders(userId: string) {
  const token = await getMyToken()
  if (!token) {
    throw new Error("not authorized")
  }

  
    if (!userId) {
    throw new Error("No userId provided to fetch orders")           
     }

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    {
      method: "GET",
      headers: {
        token,
        "Content-Type": "application/json",
      },
    }
  )

const data = await res.json()
console.log(" response:", data)
return data
}
"use client" 
import React, { useState, useEffect } from "react"
import { Badge } from "flowbite-react"
import Image from "next/image"
import { AllOrdersType, CartItem } from "@/types/allOrders.type"
import getAllOrders from "@/api/orders" 

export default function Orders() {
  const [orders, setOrders] = useState<AllOrdersType[]>([])
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllOrders().then((data) => {
      setOrders(data)
      setLoading(false)
    })
  }, [])

  if (loading) return <p className="text-center mt-12">Loading orders...</p>

  return (
    <div className="w-[90%] md:w-[70%] mx-auto mt-12 space-y-6">
      {orders.map((order: AllOrdersType, index: number) => (
        <div
          key={order._id}
          className="border rounded-xl shadow-lg hover:shadow-2xl transition p-5 cursor-pointer bg-white dark:bg-neutral-800 dark:border-neutral-700"
        >
          <div
            className="flex justify-between items-center"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <h2 className="font-bold text-lg text-neutral-800 dark:text-neutral-200">
              Order ID: {order._id.slice(0, 8)}...
            </h2>
            <Badge color={order.isPaid ? "success" : "failure"}>
              {order.isPaid ? "Paid ✅" : "Not Paid ❌"}
            </Badge>
          </div>

          
          {openIndex === index && (
            <div className="mt-4 space-y-4">
             
              <div className="bg-neutral-50 dark:bg-neutral-700 p-3 rounded-md flex items-center gap-2">
                <i className="fa-solid fa-user text-blue-500 w-5 h-5"></i>
                <div className="text-neutral-800 dark:text-neutral-200">
                  <h3 className="font-semibold text-md mb-1">Customer Info:</h3>
                  <p><span className="font-semibold">Name:</span> {order.user.name}</p>
                  <p><span className="font-semibold">Email:</span> {order.user.email}</p>
                  <p><span className="font-semibold">Phone:</span> {order.user.phone}</p>
                </div>
              </div>

              
              <div className="bg-neutral-50 dark:bg-neutral-700 p-3 rounded-md flex items-center gap-2">
                <i className="fa-solid fa-map-marker-alt text-red-500 w-5 h-5"></i>
                <div className="text-neutral-800 dark:text-neutral-200">
                  <h3 className="font-semibold text-md mb-1">Shipping Address:</h3>
                  <p><span className="font-semibold">City:</span> {order.shippingAddress.city}</p>
                  <p><span className="font-semibold">Details:</span> {order.shippingAddress.details}</p>
                  <p><span className="font-semibold">Phone:</span> {order.shippingAddress.phone}</p>
                </div>
              </div>

              
              <div className="bg-neutral-50 dark:bg-neutral-700 p-3 rounded-md flex items-center gap-2">
                <i className="fa-solid fa-money-bill text-green-500 w-5 h-5"></i>
                <div className="flex justify-between w-full text-neutral-800 dark:text-neutral-200">
                  <div><span className="font-semibold">Payment Method:</span> {order.paymentMethodType}</div>
                  <div><span className="font-semibold">Delivery Status:</span> {order.isDelivered ? "Delivered ✅" : "Not Delivered ❌"}</div>
                </div>
              </div>

             
              <div className="bg-neutral-50 dark:bg-neutral-700 p-3 rounded-md">
                <h3 className="font-semibold text-md mb-2 flex items-center gap-2 text-neutral-800 dark:text-neutral-200">
                  <i className="fa-solid fa-box-open text-purple-500 w-5 h-5"></i> Products:
                </h3>
                <ul className="space-y-3">
                  {order.cartItems.map((product: CartItem) => (
                    <li key={product._id} className="flex items-center gap-4 border-b border-neutral-300 dark:border-neutral-600 pb-2">
                      <div className="w-20 h-20 overflow-hidden rounded-md">
                        <Image src={product.product.imageCover} alt={product.product.title} className="w-full h-full object-cover" width={500} height={500} />
                      </div>
                      <div className="flex-1 text-neutral-800 dark:text-neutral-200">
                        <p className="font-semibold">{product.product.title}</p>
                        <p className="text-sm text-neutral-500 dark:text-neutral-300">Qty: {product.count} × {product.price} EGP</p>
                        <p className="text-xs text-neutral-400 dark:text-neutral-400">Category: {product.product.category.name}</p>
                        <p className="text-xs text-neutral-400 dark:text-neutral-400">Brand: {product.product.brand.name}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-right font-bold text-lg text-neutral-800 dark:text-neutral-200">
                Total: {order.totalOrderPrice} EGP
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

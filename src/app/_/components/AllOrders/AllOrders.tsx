"use client"
import { useEffect, useState } from "react"
import { Badge, Spinner } from "flowbite-react"
import { toast } from "sonner"
import { getUserOrders } from "@/ordersAction/orders.action"
import { CartItem, orderType } from "@/types/orders.type"
import Image from 'next/image'



export default function AllOrders({ user }: { user: { id: string } | null }) { 
     const [orders, setOrders] = useState<orderType[]>([])
     const[isLoading,setisLoading]=useState(true)
       const [openIndex, setOpenIndex] = useState<number | null>(null)

     

  async function fetchOrders() {
  try {
    setisLoading(true)
    if (!user?.id) {
      setisLoading(false)
      return
    }
    const res = await getUserOrders(user?.id)
    setOrders(res)
    setisLoading(false) 
  } catch (err:unknown) {
    if(err instanceof Error){
        return
    } 
    toast.error("Failed to fetch orders", { position: "top-center" })
    setisLoading(false) 
  }
}

  useEffect(() => {
    fetchOrders()
  }, [user?.id])

if(isLoading){
return <div className="text-center mt-36">
        <Spinner aria-label="Center-aligned spinner example Extra large"  size="xl" />
      </div>
} 

  if (!orders.length) {
    return (
      <h1 className="text-center bg-red-300 mt-20 text-red-700 text-4xl py-6">
        ❌ No orders found
      </h1>
    )
  }

  return (
    <>
<div className="w-[90%] md:w-[70%] mx-auto mt-12 space-y-6">
  {orders.map((order: orderType, index: number) => (
    <div
      key={order._id}
      className="border rounded-xl shadow-lg hover:shadow-2xl transition p-5 cursor-pointer bg-white dark:bg-neutral-900"
    >
     
      <div
        className="flex justify-between items-center"
        onClick={() => setOpenIndex(openIndex === index ? null : index)}
      >
        <h2 className="font-bold text-lg text-neutral-900 dark:text-neutral-100">
          Order ID: {order._id}
        </h2>
        <Badge color={order.isPaid ? "success" : "failure"}>
          {order.isPaid ? "Paid ✅" : "Not Paid ❌"}
        </Badge>
      </div>

    
      {openIndex === index && (
        <div className="mt-4 space-y-4">

          <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-md flex items-center gap-2">
            <i className="fa-solid fa-user text-blue-500 dark:text-blue-400 w-5 h-5"></i>
            <div>
              <h3 className="font-semibold text-md mb-1 text-neutral-900 dark:text-neutral-100">Customer Info:</h3>
              <p className="text-neutral-800 dark:text-neutral-200"><span className="font-semibold">Name:</span> {order.user.name}</p>
              <p className="text-neutral-800 dark:text-neutral-200"><span className="font-semibold">Email:</span> {order.user.email}</p>
              <p className="text-neutral-800 dark:text-neutral-200"><span className="font-semibold">Phone:</span> {order.user.phone}</p>
            </div>
          </div>

          <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-md flex items-center gap-2">
            <i className="fa-solid fa-map-marker-alt text-red-500 dark:text-red-400 w-5 h-5"></i>
            <div>
              <h3 className="font-semibold text-md mb-1 text-neutral-900 dark:text-neutral-100">Shipping Address:</h3>
              <p className="text-neutral-800 dark:text-neutral-200"><span className="font-semibold">City:</span> {order.shippingAddress.city}</p>
              <p className="text-neutral-800 dark:text-neutral-200"><span className="font-semibold">Details:</span> {order.shippingAddress.details}</p>
              <p className="text-neutral-800 dark:text-neutral-200"><span className="font-semibold">Phone:</span> {order.shippingAddress.phone}</p>
            </div>
          </div>

          <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-md flex items-center gap-2">
            <i className="fa-solid fa-money-bill text-green-500 dark:text-green-400 w-5 h-5"></i>
            <div className="flex justify-between w-full text-neutral-900 dark:text-neutral-100">
              <div><span className="font-semibold">Payment Method:</span> {order.paymentMethodType}</div>
              <div><span className="font-semibold">Delivery Status:</span> {order.isDelivered ? "Delivered ✅" : "Not Delivered ❌"}</div>
            </div>
          </div>

          
          <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-md">
            <h3 className="font-semibold text-md mb-2 flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
              <i className="fa-solid fa-box-open text-purple-500 dark:text-purple-400 w-5 h-5"></i> Products:
            </h3>
            <ul className="space-y-3">
              {order.cartItems.map((product: CartItem) => (
                <li key={product._id} className="flex items-center gap-4 border-b pb-2 border-neutral-200 dark:border-neutral-700">
                  
                  <div className="w-20 h-20 overflow-hidden rounded-md">
                    <Image src={product.product.imageCover} alt={product.product.title} className="w-full h-full object-cover" width={500} height={500}/>
                  </div>

                  <div className="flex-1 text-neutral-900 dark:text-neutral-100">
                    <p className="font-semibold">{product.product.title}</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Qty: {product.count} × {product.price} EGP</p>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500">Category: {product.product.category.name}</p>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500">Brand: {product.product.brand.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

    
          <div className="text-right font-bold text-lg text-neutral-900 dark:text-neutral-100">
            Total: {order.totalOrderPrice} EGP
          </div>

        </div>
      )}
    </div>
  ))}
</div>



 </> )
}

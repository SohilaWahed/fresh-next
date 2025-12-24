"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from "sonner"
import { useParams } from 'next/navigation'  
import { Spinner } from 'flowbite-react'
import { checkoutSchema, CheckOutType } from '@/schema/checkOut.schema'
import onlinePayment from '@/checkoutActions/onlineCheckout.action'
import cashPayment from '@/checkoutActions/CashCheckout.action'
import { useRouter } from "next/navigation"
import AddressList from '@/app/_/components/AddressList/AddressList'
import Link from 'next/link';


export default function CheckOut() {
  const params = useParams();
  const id = params?.id as string;
const router=useRouter()

  const [isLoading, setisLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"online"|"cash">("online") 
    const [selectedAddress, setSelectedAddress] = useState<string>("")


  const form = useForm<CheckOutType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(checkoutSchema)
  })

  function button() {
    if (paymentMethod === "online") return "Pay Online"
    return "Pay Cash"
  }

   async function handleCheckOut(values: CheckOutType) { 
     if (!selectedAddress) {
      toast.error("Please select an address before checkout", { position: "top-center" })
      return;
    }
    setisLoading(true)

    let res;
    if (paymentMethod === "online") {
      res = await onlinePayment(id, "", values)
      if (res.status === "success") {
        window.location.href = res.session.url
      }
    } else {
      res = await cashPayment(id, values)
      if (res.status === "success") {
                toast.success("Cash order created successfully", { position: "top-center" });
  router.push("/allorders")

      }
    }

    if(res?.status !== "success"){
      toast.error("Payment failed, please try again", { position: "top-center" });
    }

    setisLoading(false)
  }

  return (
    <>
      <div className='w-1/2 mx-auto my-20'>
        <h1 className='text-2xl font-bold text-center my-4'>CheckOut Now</h1>

<div className="mb-15 border p-6 shadow">
  <AddressList 
          selectedAddress={selectedAddress} 
          setSelectedAddress={setSelectedAddress} 
        />
       <Button className="cursor-pointer">
<Link href="/address">Address</Link>
</Button>
</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCheckOut)} >

            <div className='my-4'>
              <FormField 
                control={form.control}
                name="details"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>details:</FormLabel>
                    <FormControl>
                      <Input type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='my-4'>
              <FormField
                control={form.control}
                name="phone"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>phone:</FormLabel>
                    <FormControl>
                      <Input type='tel' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='my-4'>
              <FormField
                control={form.control}
                name="city"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>city:</FormLabel>
                    <FormControl>
                      <Input type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='my-4 flex gap-4'>
              <label className='flex items-center gap-2'>
                <input 
                  type="radio" 
                  value="online" 
                  checked={paymentMethod==="online"} 
                  onChange={() => setPaymentMethod("online")} 
                />
                Online
              </label>
              <label className='flex items-center gap-2'>
                <input 
                  type="radio" 
                  value="cash" 
                  checked={paymentMethod==="cash"} 
                  onChange={() => setPaymentMethod("cash")} 
                />
                Cash
              </label>
            </div>

            <Button disabled={isLoading || !selectedAddress} type='submit' className='my-4 cursor-pointer'>
              {isLoading 
                ? <Spinner aria-label="Center-aligned spinner example Extra large" size="sm" />  
                : button()}
            </Button>

          </form>
        </Form>
      </div>   
    </>
  )
}
              

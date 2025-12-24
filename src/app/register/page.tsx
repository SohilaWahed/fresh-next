"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { registerSchema, RegisterType } from '@/schema/register.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import  axios, { AxiosError }  from 'axios';
import { Spinner } from 'flowbite-react'
import Link from 'next/link'



export default function Register() {
    const[isLoading,setisLoading]=useState(false)

const router=useRouter()

  const form=useForm<RegisterType> ({
defaultValues:{
  name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
},
resolver:zodResolver(registerSchema)
  })

async function handleRegister(vaules:RegisterType){
            setisLoading(true)


try {
const res=await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",vaules)

if(res.data.message==="success"){

  toast.success("Registered Successfully",{
    position:"top-center"})
  router.push("/login")
    setisLoading(false)

}
}
catch(err:unknown){
  if(err instanceof AxiosError){
  toast.error(err?.response?.data.message ,{position:"top-center"})
      setisLoading(false)
  }
}
}
  return (
    <>
<div className='w-1/2 mx-auto my-20'>
  <h1 className='text-2xl font-bold text-center my-4'>Register Now</h1>
<Form {...form}>
 <form onSubmit={form.handleSubmit(handleRegister)} >

 <div className='my-4'>
  <FormField
    control={form.control}
    name="name"
    render={({field}) => (
      <FormItem>
        <FormLabel >Name:</FormLabel>
        <FormControl>
         <Input {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</div>

  <div className='my-4'>
  <FormField 
    control={form.control}
    name="email"
    render={({field}) => (
      <FormItem>
        <FormLabel >Email:</FormLabel>
        <FormControl>
         <Input type='email' {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  </div>

 <div className='my-4'>
  <FormField
    control={form.control}
    name="password"
    render={({field}) => (
      <FormItem>
        <FormLabel >Password:</FormLabel>
        <FormControl>
         <Input type='password' {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</div>

  <div className='my-4'>
  <FormField
    control={form.control}
    name="rePassword"
    render={({field}) => (
      <FormItem>
        <FormLabel >RePassword:</FormLabel>
        <FormControl>
         <Input type='password' {...field} />
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
        <FormLabel >Phone:</FormLabel>
        <FormControl>
         <Input type='tel' {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</div>

   <div>
     <Link href="/login" className=" hover:text-neutral-600 flex justify-end">Login</Link>
</div>
    

    <Button disabled={isLoading} type='submit' className='my-4 cursor-pointer'>
      {isLoading ? 
        <Spinner aria-label="Center-aligned spinner example Extra large" size="sm"  />  : " Register" }
     </Button>

 </form>
</Form>
</div>   
 </>
  )
}

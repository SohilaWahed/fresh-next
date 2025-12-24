"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from "sonner"
import { loginSchema, LoginType } from '@/schema/login.schema'
import { signIn } from 'next-auth/react'   
import { Spinner } from 'flowbite-react'
import Link from 'next/link'



export default function Login() {
    const[isLoading,setisLoading]=useState(false)


  const form=useForm<LoginType> ({
defaultValues:{
    email:"",
    password:"",
},
resolver:zodResolver(loginSchema)
  })

async function handleLogin(vaules:LoginType){ 
            setisLoading(true)

  const response= await signIn("credentials",{
    email:vaules.email,
    password:vaules.password, 
    redirect:false,
    callbackUrl:"/"
  })

  if(response?.ok){
    toast.success("logined Successfully" ,{position:"top-center"})
window.location.href="/" 
    setisLoading(false)

 } else{
    toast.error(response?.error ,{position:"top-center"})
        setisLoading(false)

  }


}
  return (
    <>
<div className='w-1/2 mx-auto my-20'>
  <h1 className='text-2xl font-bold text-center my-4'>Login Now</h1>
<Form {...form}>
 <form onSubmit={form.handleSubmit(handleLogin)} >



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

 <div className="flex flex-col md:flex-row justify-around">
    <Link href="/register" className=" hover:text-neutral-600">Register</Link>
    <Link href="/forgotPassword" className=" hover:text-neutral-600">Forgot Password</Link>
 </div>


    <Button disabled={isLoading} type='submit' className='my-4 cursor-pointer'>
    {isLoading ? 
        <Spinner aria-label="Center-aligned spinner example Extra large" size="sm"  />  : "Login" }</Button>

 </form>
</Form>
</div>   
 </>
  )
}

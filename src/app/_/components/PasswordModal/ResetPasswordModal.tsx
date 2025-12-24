"use client"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from "sonner"
import { resetPassword } from "@/passowrdAction/resetPassowrd.action"
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordSchema, ResetPasswordType } from "@/schema/ResetPassword.schema"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { useState } from "react"

export function ResetPasswordForm() {
    const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
 
 

  const form = useForm<ResetPasswordType>({
     defaultValues: {
       email: "",
        newPassword: "" 
      } , resolver: zodResolver(resetPasswordSchema) 
    })

  async function handleResetPassword(values:ResetPasswordType) {
     setIsLoading(true)

const res = await resetPassword(values.email, values.newPassword)

    if (!res.error) {
      toast.success("Password reset successfully ",{position:"top-center"})

 setIsLoading(false)
     
      const resetRes = await signIn("credentials", {
        email: values.email,
        password: values.newPassword,
        redirect: false,
        callbackUrl: "/"
      })

      if (resetRes?.ok) {
        window.location.href="/"
      } else {
        toast.error("Password changed but login failed ",{position:"top-center"})
        router.push("/login")
      }
    } else {
      toast.error("Failed to reset password ❌",{position:"top-center"})
    }
     setIsLoading(false)

  }
  
 
  return (
    <div className="w-1/2 mx-auto my-20">
      <h1 className="text-2xl font-bold text-center my-4">Reset Password</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleResetPassword)}>

                    <div className="my-4">

          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl><Input type="email" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="newPassword" render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl><Input type="password" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
</div>


  <Button
            type="submit"
            disabled={isLoading}
            className="my-4 cursor-pointer"
          >
            {isLoading ? "Loading..." : "Reset Password"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

"use client"
import { useState } from "react"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import changeMyPassword from "@/passowrdAction/changePassword.action"
import { zodResolver } from '@hookform/resolvers/zod'
import { changePasswordSchema, changePasswordType } from "@/schema/changePassword.schema"
import { useRouter } from 'next/navigation'
import { signOut } from "next-auth/react"

export function ChangePasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<changePasswordType>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      rePassword: ""
    },
    resolver: zodResolver(changePasswordSchema)
  })

  async function handleChangePassword(values: changePasswordType) {
    setIsLoading(true)

    const res = await changeMyPassword(
      values.currentPassword,
      values.newPassword,
      values.rePassword
    )

    if (!res.error) {
      toast.success("Password changed successfully",{position:"top-center"})

      form.reset()
 setIsLoading(false)
      await signOut({ redirect: false })

      router.push("/")
    

    } else {
      toast.error("Failed to change password",{position:"top-center"})
    }

    setIsLoading(false)
  }

  return (
    <div className="w-1/2 mx-auto my-20">
      <h1 className="text-2xl font-bold text-center my-4">Change Password</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleChangePassword)}>
          <div className="my-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="my-4">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="my-4">
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Re-enter New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="my-4 cursor-pointer"
          >
            {isLoading ? "Loading..." : "Change Password"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

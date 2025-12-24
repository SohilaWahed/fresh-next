"use client"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from "sonner"
import { verifyResetCode } from "@/passowrdAction/resetCode.action"
import { zodResolver } from '@hookform/resolvers/zod'
import { verifyCodeSchema, VerifyCodeType } from "@/schema/verifyCode.schema"
import { useRouter } from "next/navigation"
import { useState } from "react"


export function VerifyCodeForm() {
    const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<VerifyCodeType>({ 
    defaultValues: { code: "" },
    resolver: zodResolver(verifyCodeSchema)
  })

  async function handleVerifyCode(values: VerifyCodeType) {
     setIsLoading(true)
    const res = await verifyResetCode(values.code)
    
    if (!res.error) {
      toast.success("Code verified successfully",{position:"top-center"})
       setIsLoading(false)

      router.push("/resetPassword")   
    } else {
      toast.error("Invalid code, please try again ❌",{position:"top-center"})
    }
     setIsLoading(false)

  }

  return (
    <div className="w-1/2 mx-auto my-20">
      <h1 className="text-2xl font-bold text-center my-4">Verify Reset Code</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleVerifyCode)}>
                    <div className="my-4">

          <FormField 
            control={form.control} 
            name="code" 
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reset Code</FormLabel>
                <FormControl><Input {...field} /></FormControl>
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
                      {isLoading ? "Loading..." : "Enter Code"}
                    </Button>

        </form>
      </Form>
    </div>
  )
}

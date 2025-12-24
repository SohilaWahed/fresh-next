import z from "zod";

export const loginSchema = z.object({

  email: z.email().nonempty("Email is required" ),

    password: z.string()
    .nonempty("Password is required" )
    .min(6, "Passmin length is 6 " ),

   
})

export type LoginType = z.infer<typeof loginSchema>;

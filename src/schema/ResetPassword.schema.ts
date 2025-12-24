import z from "zod";

export const resetPasswordSchema = z.object({

  email: z.email().nonempty("Email is required" ),

    newPassword: z.string()
    .nonempty("Password is required" )
    .min(6, "Passmin length is 6 " ),

   
})

export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;

import z from "zod";

export const changePasswordSchema = z.object({

      currentPassword:z.string()
          .nonempty("Password is required" )
          .min(6, "Passmin length is 6 " ),
      newPassword:z.string()
          .nonempty("Password is required" )
          .min(6, "Passmin length is 6 " ),
      rePassword:z.string()
          .nonempty("RePassword is required" ),

}).refine((object) => object.newPassword === object.rePassword, {
    path: ["rePassword"],
    error: "Passwords don't match",
});

export type changePasswordType = z.infer<typeof changePasswordSchema>;

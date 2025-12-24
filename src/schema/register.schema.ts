import z from "zod";

export const registerSchema = z.object({
  name: z.string()
  .nonempty("Name is required" )
  .min(2, "min length is 2 " )
  .max(10, "max length is 50 " ),

  email: z.email().nonempty("Email is required" ),

    password: z.string()
    .nonempty("Password is required" )
    .min(6, "Passmin length is 6 " ),

    rePassword: z.string()
    .nonempty("RePassword is required" ),

    phone: z.string().regex(/^(010|011|012|015)[0-9]{8}$/),
}).refine((object) => object.password === object.rePassword, {
    path: ["rePassword"],
    error: "Passwords don't match",
});

export type RegisterType = z.infer<typeof registerSchema>;


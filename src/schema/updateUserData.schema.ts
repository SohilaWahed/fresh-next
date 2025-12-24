import z from "zod";

export const updateUserDataSchema = z.object({

  email: z.email().nonempty("Email is required" ),

   name: z.string()
     .nonempty("Name is required" )
     .min(2, "min length is 2 " )
     .max(10, "max length is 50 " ),
   
      phone: z.string().regex(/^(010|011|012|015)[0-9]{8}$/),

   
})

export type UpdateUserDataType = z.infer<typeof updateUserDataSchema>;

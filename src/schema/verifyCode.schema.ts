import z from "zod";

export const verifyCodeSchema = z.object({

code: z
    .string()
    .nonempty("Code is required")
    .regex(/^\d+$/, "Code must contain only numbers")
    
})

export type VerifyCodeType = z.infer<typeof verifyCodeSchema>;

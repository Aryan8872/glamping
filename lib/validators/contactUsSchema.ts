import z from "zod";

export const contactUsSchema= z.object({
    email:z.string().email(),
    phoneNumber: z
    .string()
    .regex(
      /^\+977-\d{10}$/,
      "Phone number must be in format +977-XXXXXXXXXX (10 digits)"
    ),
    address: z.string()
})

export type ContactUsType = z.infer<typeof contactUsSchema>
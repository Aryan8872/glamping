import { HttpDelete, HttpGet, HttpPatch, HttpPost } from "@/lib/http/http"
import { ABOUT_US_TAG, AboutUs, Stat } from "../types/AboutUsTypes"
import { revalidateTag } from "next/cache"
import { ContactUsType } from "@/types/ContactUsType"
import { contactUsSchema } from "@/lib/validators/contactUsSchema"
import z from "zod"


export async function apiGetContactUs(): Promise<ContactUsType> {
    const json = await HttpGet(`contact/all`, {
        next: {
            tags: [ABOUT_US_TAG]
        }
    })
    const responseSchema = z.object({
        message: z.string(),
        data: contactUsSchema
    })
    const validated = responseSchema.safeParse(json)
    if (!validated.success) {
        console.log("zod validation error", validated.error.flatten().fieldErrors)
        return {
            email: "",
            phoneNumber: "",
            address: ""
        }
    }
    return validated.data.data
}

import z from "zod"
import { contactUsSchema } from "../validators/contactUsSchema"
import { ContactUsType } from "@/types/ContactUsType"

export const getContactUs=async ():Promise<ContactUsType> =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/contact/all`,{
        method:"GET",
        headers:{Accept:"application/json"},
        next:{
            tags:["contact"]
        }
    })

    if(!res.ok){
        throw new Error(`faield to get contact data ${res.status} ${res.statusText}`)
    }

    const json = await res.json()
    console.log(json)
    const responseSchema = z.object({
        message:z.string(),
        data:contactUsSchema
    })
    const validated = responseSchema.safeParse(json)
    if(!validated.success){
        console.log("zod validation error",validated.error.flatten().fieldErrors)
        return {
            email:"",
            phoneNumber:"",
            address:""
        }
    }
    return validated.data.data
}
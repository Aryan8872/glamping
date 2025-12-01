"use server"
import { apiGetContactUs } from "../api/contactUsApi";
import { ContactUsType } from "@/types/ContactUsType";

export async function getContactUsContent(): Promise<ContactUsType> {
    const items = await apiGetContactUs();
    return items
}



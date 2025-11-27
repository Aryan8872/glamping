"use server"
import { revalidateTag } from "next/cache";
import { ABOUT_US_TAG, AboutUs, AboutUsSchema } from "../types/AboutUsTypes";
import { apiGetAboutUs } from "../api/aboutUsApi";

export async function getAboutUsContent(): Promise<AboutUs> {
    const items = await apiGetAboutUs();
    const parsed = AboutUsSchema.safeParse(items);
    if (!parsed.success) {
        console.log(parsed.error)
        throw new Error("failed to parse")
    }
    return parsed.data
}



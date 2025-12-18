import { HttpGet } from "@/lib/http/http";
import { Adventure } from "../types/adventureTypes";
export async function getAdventuresApi(): Promise<Adventure[]> {
    const res = await HttpGet('adventure/all', {
        next: {
            tags: ['adventures'],
            revalidate: 60
        }
    })
    return res.data
}

export async function getAdventureBySlugApi(slug:string): Promise<Adventure> {
    const res = await HttpGet(`adventure/slug/${slug}`)
    return res.data
}
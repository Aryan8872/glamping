import { HttpGet } from "@/lib/http/http";
import { Adventure } from "../types/adventureTypes";
export async function getAdventuresApi(): Promise<Adventure[]> {
    const res = await HttpGet('adventure/all')
    console.log("api", res)
    return res.data
}
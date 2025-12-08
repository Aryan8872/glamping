import { httpGet } from "./http";
import { AboutUs } from "@/types/AboutUsType";

export async function getAboutUs(): Promise<AboutUs | null> {
    try {
        const res = await httpGet("/aboutus", {
            next: { tags: ["about-us"], revalidate: 60 },
        });
        return res.data;
    } catch (error) {
        console.error("Failed to fetch About Us data:", error);
        return null;
    }
}

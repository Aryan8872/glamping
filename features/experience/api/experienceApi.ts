import { HttpGet } from "@/lib/http/http";
import { Experience } from "../types/ExperienceTypes";

const EXPERIENCE_TAG = "experiences";

export async function apiGetAllExperiences() {
    const response = await HttpGet("experience/all", {
        next: {
            tags: [EXPERIENCE_TAG],
            revalidate: 60
        }
    });
    return (response as any).data as Experience[];
}

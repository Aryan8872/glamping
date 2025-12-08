import { HttpGet } from "@/lib/http/http";
import { Experience } from "../types/ExperienceTypes";

const EXPERIENCE_TAG = "experiences";

export async function apiGetAllExperiences() {
    const response = await HttpGet("experience/all", {
        next: {
            tags: [EXPERIENCE_TAG]
        }
    });
    // Backend returns { message: string, data: Experience[] } or just data array depending on impl.
    // Based on experienceService.js it returns array directly OR wrapper.
    // experienceController.js: res.status(200).json({ message: "...", data: experiences });
    return (response as any).data as Experience[];
}

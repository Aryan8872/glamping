import { HttpDelete, HttpGet, HttpPatch, HttpPost } from "@/lib/http/http";
import { Camp, PaginatedResponse, SearchFilters, Facility } from "../types/CampTypes";

const CAMP_TAG = "camps";

export async function apiGetAllCamps() {
    const data = await HttpGet("camp/all", {
        next: {
            tags: [CAMP_TAG]
        }
    });
    return data as Camp[];
}

export async function apiGetCampById(id: number) {
    const res = await HttpGet(`camp/${id}`, {
        next: {
            tags: [CAMP_TAG]
        }
    });
    return res.data as Camp;
}

export async function apiCreateCamp(payload: FormData) {
    const data = await HttpPost("camp/new", payload);
    return data;
}

export async function apiUpdateCamp(id: number, payload: Partial<Camp> | FormData) {
    const data = await HttpPatch(`camp/${id}`, payload);
    return data;
}

export async function apiDeleteCamp(id: number) {
    const data = await HttpDelete(`camp/${id}`);
    return data;
}

export async function apiSearchCamps(filters: SearchFilters) {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        if (Array.isArray(value)) {
            value.forEach((v) => params.append(key, v.toString()));
        } else {
            params.set(key, value.toString());
        }
    });

    const res = await HttpGet(`camp/search?${params.toString()}`, {

    });
    console.log(res)

    return res as Promise<PaginatedResponse<Camp>>;

}

export async function apiGetFacilities() {
    const response = await HttpGet("facility/all", {
        next: {
            tags: ["facilities"]
        }
    });
    // Backend returns { message: string, data: Facility[] }
    return (response as any).data as Facility[];
}
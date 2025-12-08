import { HttpDelete, HttpGet, HttpPatch, HttpPost } from "@/lib/http/http";
import { Camp, PaginatedResponse, SearchFilters, Facility } from "../types/CampTypes";

const CAMP_TAG = "camps";

export async function apiGetAllCamps() {
    const data = await HttpGet("campsite/all", {
        next: {
            tags: [CAMP_TAG]
        }
    });
    return data as Camp[];
}

export async function apiGetCampById(id: number) {
    const res = await HttpGet(`campsite/${id}`, {
        next: {
            tags: [CAMP_TAG]
        }
    });
    return res.data as Camp;
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

    const res = await HttpGet(`campsite/search?${params.toString()}`, {

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
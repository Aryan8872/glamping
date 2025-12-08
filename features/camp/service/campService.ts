"use server";

import { apiGetAllCamps, apiGetCampById, apiSearchCamps, apiGetFacilities } from "../api/campApi";
import { Camp, SearchFilters } from "../types/CampTypes";

export async function getAllCamps(): Promise<Camp[]> {
    const camps = await apiGetAllCamps();
    return camps;
}

export async function getCampById(id: number): Promise<Camp> {
    const camp = await apiGetCampById(id);
    return camp;
}

export async function searchCampsites(filters: SearchFilters) {
    const normalized: SearchFilters = {
        q: filters.q || "",
        experience: filters.experience,
        destination: filters.destination,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        checkIn: filters.checkIn,
        checkOut: filters.checkOut,
        facilityIds: filters.facilityIds,
        adults: filters.adults,
        children: filters.children,
        pets: filters.pets,
        sort: filters.sort,
        page: filters.page ?? 1,
        limit: filters.limit ?? 12,
    };

    return apiSearchCamps(normalized);
}

export async function getFacilities() {
    return await apiGetFacilities();
}
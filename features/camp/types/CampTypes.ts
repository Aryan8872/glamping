export const CAMP_TAG = "camps";

export interface Camp {
    id: number;
    name: string;
    description: string;
    location: string;
    pricePerNight: number;
    images: string[];
    rating: number;
    reviews: number;
    maxAdult: number,
    maxChildren: number,
    maxPets: number,
    latitude?: number,
    longitude?: number,
    hostId?: number,
    isAvailable: boolean,
    campSiteFacilities: CampFacility[],
    campHost: CampHost,
    createdAt: string;
    updatedAt: string;
}

export interface CampResponse {
    message: string;
    data: Camp | Camp[];
}
export interface CampFacility {
    id: number,
    campId: number,
    facility: {
        id: number,
        name: string,
        icon: string,
        slug: string,
    }
}

export interface CampHost {
    id: number,
    fullName: string,
    email: string,
    phoneNumber: string,
    profilePicture?: string
    userStatus: USER_STATUS,
    createdAt?: string,
    updatedAt?: string

}

export type USER_STATUS = "ENABLED" | "DISABLED"

export interface SearchFilters {
    q?: string;
    minPrice?: number;
    maxPrice?: number;
    startDate?: string;
    endDate?: string;
    features?: string[];
    page?: number;
    limit?: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
}
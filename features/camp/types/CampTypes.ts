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
    discountedPrice?: number;
    originalPrice?: number;
    discountPercentage?: number;
    discountName?: string;
}

export interface CampResponse {
    message: string;
    data: Camp | Camp[];
}
export interface CampFacility {
    id: number,
    campId: number,
    facility: Facility
}

export interface Facility {
    id: number,
    name: string,
    icon: string,
    slug: string,
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
    experience?: string;
    destination?: string;
    minPrice?: number;
    maxPrice?: number;
    checkIn?: string;
    checkOut?: string;
    facilityIds?: string[];
    adults?: number;
    children?: number;
    pets?: number;
    sort?: string;
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
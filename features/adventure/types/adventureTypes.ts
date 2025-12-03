import { Camp } from "@/features/camp/types/CampTypes";

const ADVENTURE_KEY = "adventure"


export interface Adventure {
    id: number;
    name: string;
    slug: string;
    description: string;
    coverImage: string;
    bannerImage: string;
    title: string;
    pageDescription: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    campSites: Camp[];
}
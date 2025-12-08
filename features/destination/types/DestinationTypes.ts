export interface Destination {
    id: number;
    name: string;
    slug: string;
    description?: string;
    imageUrl?: string;
    isFeatured: boolean;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface DiscountOffer {
    id: string;
    title: string;
    description: string;
    discountPercentage: number;
    discountLabel?: string;
    type?: "PERCENTAGE" | "FIXED";
    expiryDate: string; // ISO string
    code?: string;
    link?: string;
    campId?: string | number;
    adventureId?: string | number;
    campSlug?: string;
    adventureSlug?: string;
}

export interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

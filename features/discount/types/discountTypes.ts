export interface DiscountOffer {
    id: string;
    title: string;
    description: string;
    discountPercentage: number;
    expiryDate: string; // ISO string
    code?: string;
    link?: string;
}

export interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

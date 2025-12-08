import { DiscountOffer } from "../types/discountTypes";

export const fetchActiveDiscount = async (): Promise<DiscountOffer | null> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_RESOLVED_API_BASE_URL}/discount/featured`);
        if (!res.ok) throw new Error("Failed to fetch featured discount");

        const json = await res.json();
        const data = json.data;

        if (!data) return null;

        return {
            id: data.id.toString(),
            title: data.name,
            description: data.description || "",
            discountPercentage: data.type === "PERCENTAGE"
                ? data.amount
                : data.amount, // Returning amount even if fixed, UI might need adjustment if using % symbol blindly
            expiryDate: data.endsAt || data.startsAt, // Fallback if endsAt is null? Featured should have expiry usually.
            code: "DISCOUNT", // Dummy code since backend doesn't have it
            link: "#" // Dummy link
        };
    } catch (error) {
        console.error("Error fetching discount:", error);
        return null;
    }
};

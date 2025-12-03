import { DiscountOffer } from "../types/discountTypes";

export const fetchActiveDiscount = async (): Promise<DiscountOffer> => {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            const futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + 2); // 2 days from now

            resolve({
                id: "travel-tuesday-2024",
                title: "TRAVEL TUESDAY",
                description: "We want to provide an alternative to overconsumption. Buy memories instead of unnecessary products!",
                discountPercentage: 30,
                expiryDate: futureDate.toISOString(),
                code: "TRAVEL30",
                link: "/travel-tuesday"
            });
        }, 500);
    });
};

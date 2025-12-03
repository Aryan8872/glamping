import { useState, useEffect } from "react";
import { DiscountOffer } from "../types/discountTypes";
import { fetchActiveDiscount } from "../api/discountApi";

export const useDiscount = () => {
    const [discount, setDiscount] = useState<DiscountOffer | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadDiscount = async () => {
            try {
                const data = await fetchActiveDiscount();
                setDiscount(data);
            } catch (err) {
                setError("Failed to load discount");
            } finally {
                setLoading(false);
            }
        };

        loadDiscount();
    }, []);

    return { discount, loading, error };
};

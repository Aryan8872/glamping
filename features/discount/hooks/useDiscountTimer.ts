import { useState, useEffect } from "react";
import { TimeLeft } from "../types/discountTypes";
import { calculateTimeLeft } from "../utils/discountUtils";

export function useDiscountTimer(expiryDate: string) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(expiryDate));

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft(expiryDate));
        }, 1000);

        return () => clearTimeout(timer);
    });

    return timeLeft;
}

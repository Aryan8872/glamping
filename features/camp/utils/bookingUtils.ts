import { differenceInDays } from "date-fns";
import { DateRange } from "react-day-picker";

export const calculateNights = (dateRange: DateRange | undefined): number => {
    if (dateRange?.from && dateRange?.to) {
        return differenceInDays(dateRange.to, dateRange.from);
    }
    return 0;
};

export const calculateTotalPrice = (
    nights: number,
    pricePerNight: number
): number => {
    return nights * pricePerNight;
};

export const calculateTotalSavings = (
    originalPrice: number,
    discountedPrice: number,
    nights: number
): number => {
    if (discountedPrice >= originalPrice) return 0;
    return (originalPrice - discountedPrice) * nights;
};

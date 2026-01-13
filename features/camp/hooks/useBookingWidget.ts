import { useReducer } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Camp } from "../types/CampTypes";
import {
    bookingReducer,
    initialBookingState,
    BookingState,
    BookingAction,
} from "./useBookingReducer";

export function useBookingWidget(campData: Camp) {
    const [state, dispatch] = useReducer(bookingReducer, initialBookingState);
    const router = useRouter();
    const { openModal, dateRange, guests } = state;

    const handleContinue = () => {
        if (!dateRange?.from || !dateRange?.to) return;

        if (
            guests.adults + guests.children + guests.pets >
            campData.maxAdult + campData.maxChildren + campData.maxPets
        ) {
            toast.error("Guest count exceeds maximum capacity");
            return;
        }

        const params = new URLSearchParams({
            checkIn: dateRange.from.toISOString(),
            checkOut: dateRange.to.toISOString(),
            adults: guests.adults.toString(),
            children: guests.children.toString(),
            pets: guests.pets.toString(),
        });

        router.push(`/booking/${campData.id}?${params.toString()}`);
    };

    return {
        state,
        dispatch,
        handleContinue,
    };
}

import { useEffect, useReducer } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Camp } from "../types/CampTypes";
import {
    bookingReducer,
    initialBookingState,
} from "./useBookingReducer";
import { apiGetCampAvailability } from "../api/campApi";
import { format } from "date-fns";

export function useBookingWidget(campData: Camp) {
    const [state, dispatch] = useReducer(bookingReducer, initialBookingState);
    const router = useRouter();
    const { dateRange, guests } = state;

    useEffect(() => {
        if (dateRange?.from && dateRange?.to) {
            const fetchAvailability = async () => {
                dispatch({ type: "SET_LOADING_AVAILABILITY", payload: true });
                try {
                    const data = await apiGetCampAvailability(
                        campData.id,
                        format(dateRange.from!, "yyyy-MM-dd"),
                        format(dateRange.to!, "yyyy-MM-dd")
                    );
                    dispatch({ type: "SET_AVAILABILITY", payload: data });
                } catch (err) {
                    console.error("Failed to fetch availability:", err);
                    toast.error("Could not verify availability");
                } finally {
                    dispatch({ type: "SET_LOADING_AVAILABILITY", payload: false });
                }
            };
            fetchAvailability();
        }
    }, [dateRange?.from, dateRange?.to, campData.id]);

    const handleContinue = () => {
        if (!dateRange?.from || !dateRange?.to) return;

        if (
            guests.adults + guests.children >
            campData.maxAdult + campData.maxChildren
        ) {
            toast.error("Guest count exceeds maximum capacity");
            return;
        }

        // Check daily availability if fetched
        if (state.availability) {
            const requested = guests.adults + guests.children;
            const hasSpace = state.availability.every(day => day.remainingSlots >= requested);
            if (!hasSpace) {
                toast.error("Requested dates exceed remaining daily capacity");
                return;
            }
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

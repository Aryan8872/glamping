import { DateRange } from "react-day-picker";

export type ModalType = "date" | "guest" | null;

export interface GuestCounts {
    adults: number;
    children: number;
    pets: number;
}

export interface BookingState {
    openModal: ModalType;
    dateRange: DateRange | undefined;
    guests: GuestCounts;
}

export type BookingAction =
    | { type: "SET_OPEN_MODAL"; payload: ModalType }
    | { type: "SET_DATE_RANGE"; payload: DateRange | undefined }
    | {
        type: "UPDATE_GUESTS";
        payload: { type: keyof GuestCounts; delta: number };
    }
    | { type: "RESET_DATES" };

export const initialBookingState: BookingState = {
    openModal: null,
    dateRange: undefined,
    guests: {
        adults: 1,
        children: 0,
        pets: 0,
    },
};

export function bookingReducer(
    state: BookingState,
    action: BookingAction
): BookingState {
    switch (action.type) {
        case "SET_OPEN_MODAL":
            return { ...state, openModal: action.payload };
        case "SET_DATE_RANGE":
            return { ...state, dateRange: action.payload };
        case "UPDATE_GUESTS":
            return {
                ...state,
                guests: {
                    ...state.guests,
                    [action.payload.type]: Math.max(
                        0,
                        state.guests[action.payload.type] + action.payload.delta
                    ),
                },
            };
        case "RESET_DATES":
            return { ...state, dateRange: undefined };
        default:
            return state;
    }
}

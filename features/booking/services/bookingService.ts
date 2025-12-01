import { apiCreateBooking } from "../api/bookingApi";
import { BookingData, BookingResponse } from "../types/BookingTypes";

export const createBooking = async (data: BookingData): Promise<BookingResponse> => {
    return await apiCreateBooking(data);
};

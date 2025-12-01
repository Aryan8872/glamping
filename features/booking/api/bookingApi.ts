import { HttpPost } from "@/lib/http/http";
import { BookingData, BookingResponse } from "../types/BookingTypes";

export async function apiCreateBooking(data: BookingData) {
    const response = await HttpPost("booking/new", data);
    return response as BookingResponse;
}

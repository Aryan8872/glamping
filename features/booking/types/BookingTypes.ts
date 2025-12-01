export interface BookingData {
    campSiteId: number;
    checkInDate: string;
    checkOutDate: string;
    adults: number;
    children: number;
    pets: number;
    userId?: number;
    guestUserFullName?: string;
    guestUserEmail?: string;
    guestUserPhoneNumber?: string;
}

export interface BookingResponse {
    id: number;
    totalPrice: number;
    bookingStatus: string;
    // Add other fields as needed
}

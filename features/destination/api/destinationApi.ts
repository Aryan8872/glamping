import { HttpGet } from "@/lib/http/http";
import { Destination } from "../types/DestinationTypes";

const DESTINATION_TAG = "destinations";

export async function apiGetAllDestinations() {
    const response = await HttpGet("destination/all", {
        next: {
            tags: [DESTINATION_TAG]
        }
    });
    // destinationController.js uses json({ message: "...", data: destinations })
    return (response as any).data as Destination[];
}

export async function apiGetFeaturedDestinations() {
    // Assuming we can filter on client or backend. Ideally backend should have /featured endpoint or query param.
    // For now, let's fetch all and filter or assume backend added support.
    // Wait, I implemented getAllDestinations in backend service. 
    // And searchCamp supports filtering by destination.
    // But to SHOW top destinations, I need destinations where isFeatured = true.
    // I did not add `getFeaturedDestinations` in backend explicitly.
    // I can fetch all and filter in frontend for now as dataset is small, or add param.
    // Let's filter in frontend or use getAll.

    const all = await apiGetAllDestinations();
    return all.filter(d => d.isFeatured);
}

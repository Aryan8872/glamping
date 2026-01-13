"use client";

import { FaMapMarkerAlt } from "react-icons/fa";
import dynamic from "next/dynamic";
import { Camp } from "../../types/CampTypes";
import { buildImageUrl } from "@/lib/http/http";

const LeafletMap = dynamic(() => import("../LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center rounded-xl">
      <span className="text-gray-400">Loading map...</span>
    </div>
  ),
});

export default function CampLocationMap({ campData }: { campData: Camp }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-primary-green mb-4">Location</h2>
      {campData.latitude && campData.longitude ? (
        <div className="h-[400px] w-full rounded-xl overflow-hidden border border-gray-200 z-0 relative">
          <LeafletMap
            locations={[
              {
                id: campData.id,
                latitude: campData.latitude,
                longitude: campData.longitude,
                title: campData.name,
                price: campData.pricePerNight,
                image: campData.images?.[0]
                  ? buildImageUrl(campData.images[0])
                  : undefined,
              },
            ]}
            center={[campData.latitude, campData.longitude]}
            zoom={13}
            className="w-full h-full"
          />
        </div>
      ) : (
        <div className="h-[400px] w-full bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
          <span className="flex items-center gap-2">
            <FaMapMarkerAlt /> Location data not available
          </span>
        </div>
      )}
    </div>
  );
}

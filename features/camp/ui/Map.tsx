"use client";

import { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Camp } from "@/features/camp/types/CampTypes";

// Dynamically import the map component with no SSR
const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] rounded-xl overflow-hidden border shadow-sm bg-gray-100 animate-pulse flex items-center justify-center">
      <span className="text-gray-500">Loading map...</span>
    </div>
  ),
});

export default function Map({ camps }: { camps: Camp[] }) {
  const locations = useMemo(
    () =>
      camps
        .filter((c) => c.latitude && c.longitude)
        .map((c) => ({
          id: c.id,
          latitude: c.latitude!,
          longitude: c.longitude!,
          title: c.name,
          price: c.pricePerNight,
          image: c.images?.[0]
            ? `${process.env.NEXT_PUBLIC_RESOLVED_API_BASE_URL}${c.images[0]}`
            : undefined,
        })),
    [camps]
  );

  return (
    <LeafletMap
      locations={locations}
      className="w-full h-full min-h-[calc(100vh-100px)] sticky top-24"
    />
  );
}

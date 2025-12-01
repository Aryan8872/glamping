"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Camp } from "@/features/camp/types/CampTypes";

// Dynamically import the map component with no SSR
const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen  rounded-xl overflow-hidden border shadow-sm bg-gray-100 animate-pulse flex items-center justify-center">
      <span className="text-gray-500">Loading map...</span>
    </div>
  ),
});

export default function Map({ camps }: { camps: Camp[] }) {
  return <MapComponent camps={camps} />;
}

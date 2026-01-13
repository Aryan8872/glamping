"use client";

import { Camp } from "../types/CampTypes";
import CampDetailImageGrid from "./CampDetailImageGrid";
import CampHeader from "./details/CampHeader";
import CampDescription from "./details/CampDescription";
import CampFacilities from "./details/CampFacilities";
import CampHostInfo from "./details/CampHostInfo";
import CampLocationMap from "./details/CampLocationMap";
import BookingWidget from "./details/BookingWidget";

export default function CampDetail({ campData }: { campData: Camp }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <CampDetailImageGrid images={campData.images} />

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 mt-8">
        {/* Left Column: Camp Details */}
        <div className="flex flex-col gap-8">
          <CampHeader campData={campData} />

          <CampDescription description={campData.description} />

          <CampFacilities campData={campData} />

          <div className="border-t border-gray-100 my-2"></div>

          <CampHostInfo host={campData.campHost} />

          <div className="border-t border-gray-100 my-2"></div>

          <CampLocationMap campData={campData} />
        </div>

        {/* Right Column: Booking Widget */}
        <BookingWidget campData={campData} />
      </div>
    </div>
  );
}

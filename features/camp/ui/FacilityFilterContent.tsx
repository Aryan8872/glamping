"use client";

import { Facility } from "../types/CampTypes";

interface FacilityFilterContentProps {
  facilities: Facility[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  loading?: boolean;
}

export default function FacilityFilterContent({
  facilities,
  selectedIds,
  onChange,
  loading,
}: FacilityFilterContentProps) {
  const toggleFacility = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((i) => i !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-10 bg-gray-100 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {facilities.map((facility) => (
        <label
          key={facility.id}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex items-center">
            <input
              type="checkbox"
              checked={selectedIds.includes(facility.id.toString())}
              onChange={() => toggleFacility(facility.id.toString())}
              className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-black checked:bg-black"
            />
            <svg
              className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-700 group-hover:text-black transition-colors">
            {facility.name}
          </span>
        </label>
      ))}
    </div>
  );
}

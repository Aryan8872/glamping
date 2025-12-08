"use client";

import FilterModal from "./FilterModal";
import GuestFilterContent from "./GuestFilterContent";

interface GuestCounts {
  adults: number;
  children: number;
  pets: number;
}

interface GuestFilterModalProps {
  onClose: () => void;
  guests: GuestCounts;
  onChange: (type: keyof GuestCounts, delta: number) => void;
  className?: string; // Allow overriding styles/position if needed
}

export default function GuestFilterModal({
  onClose,
  guests,
  onChange,
  className = "w-72",
}: GuestFilterModalProps) {
  return (
    <FilterModal
      onClose={onClose}
      title="Who's coming?"
      position="right"
      className={className}
    >
      <GuestFilterContent guests={guests} onChange={onChange} />
    </FilterModal>
  );
}

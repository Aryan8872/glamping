"use client";

import FilterModal from "./FilterModal";
import PriceFilterContent from "./PriceFilterContent";

interface PriceFilterModalProps {
  onClose: () => void;
  priceRange: number[]; // [min, max]
  onChange: (min: number, max: number) => void;
}

export default function PriceFilterModal({
  onClose,
  priceRange,
  onChange,
}: PriceFilterModalProps) {
  return (
    <FilterModal
      onClose={onClose}
      title="Price Range"
      position="right"
      className="w-80"
    >
      <PriceFilterContent priceRange={priceRange} onChange={onChange} />
    </FilterModal>
  );
}

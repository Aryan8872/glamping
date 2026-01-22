"use client";

import { useState } from "react";
import { IoClose } from "react-icons/io5";
import GuestFilterContent from "./GuestFilterContent";
import PriceFilterContent from "./PriceFilterContent";
import DateFilterContent from "./DateFilterContent";
import { useSearchStore } from "@/lib/store/searchStore";

interface AllFiltersModalProps {
  onClose: () => void;
}

export default function AllFiltersModal({ onClose }: AllFiltersModalProps) {
  const { filters, setFilters, search, reset } = useSearchStore();

  // Local state for deferred application
  const [checkIn, setCheckIn] = useState(filters.checkIn ?? "");
  const [checkOut, setCheckOut] = useState(filters.checkOut ?? "");
  const [guests, setGuests] = useState({
    adults: filters.adults ?? 1,
    children: filters.children ?? 0,
    pets: filters.pets ?? 0,
  });
  const [priceRange, setPriceRange] = useState([
    filters.minPrice ?? 0,
    filters.maxPrice ?? 5000,
  ]);

  const handleApply = () => {
    setFilters({
      ...filters,
      checkIn: checkIn || undefined,
      checkOut: checkOut || undefined,
      adults: guests.adults,
      children: guests.children,
      pets: guests.pets,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
    search();
    onClose();
  };

  const handleClear = () => {
    // Reset store to initial state (wipes everything)
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z[10001] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full sm:w-[500px] h-[90vh] sm:h-auto sm:max-h-[85vh] rounded-t-2xl sm:rounded-2xl flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoClose size={24} />
          </button>
          <h2 className="font-bold text-lg">Filters</h2>
          <div className="w-10"></div> {/* Spacer for cleanup alignment */}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Dates - Hidden above 1024px as they are in the search bar */}
          <section className="lg:hidden">
            <h3 className="font-semibold text-lg mb-4">Dates</h3>
            <DateFilterContent
              checkIn={checkIn}
              checkOut={checkOut}
              onChange={(ci, co) => {
                setCheckIn(ci);
                setCheckOut(co);
              }}
            />
            <hr className="border-gray-100 mt-8" />
          </section>

          {/* Price */}
          <section>
            <h3 className="font-semibold text-lg mb-4">Price Range</h3>
            <PriceFilterContent
              priceRange={priceRange}
              onChange={(min, max) => setPriceRange([min, max])}
            />
          </section>

          <hr className="border-gray-100" />

          {/* Guests - Hidden above 1024px */}
          <section className="lg:hidden">
            <h3 className="font-semibold text-lg mb-4">Guests</h3>
            <GuestFilterContent
              guests={guests}
              onChange={(type, delta) =>
                setGuests((prev) => ({
                  ...prev,
                  [type]: Math.max(0, prev[type] + delta),
                }))
              }
            />
            <hr className="border-gray-100 mt-8" />
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex justify-between items-center gap-4 bg-white">
          <button
            onClick={handleClear}
            className="font-semibold underline text-sm hover:text-gray-600 px-4 py-2"
          >
            Clear all
          </button>
          <button
            onClick={handleApply}
            className="bg-primary-green text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors flex-1 shadow-md active:scale-[0.98]"
          >
            Show results
          </button>
        </div>
      </div>
    </div>
  );
}

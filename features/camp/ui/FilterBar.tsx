"use client";

import { IoSearch, IoClose } from "react-icons/io5";
import {
  HiOutlineMapPin,
  HiOutlineCalendar,
  HiOutlineUsers,
} from "react-icons/hi2";
import { BiSliderAlt } from "react-icons/bi";
import DateFilterModal from "./DateFilterModal";
import GuestFilterModal from "./GuestFilterModal";
import PriceFilterModal from "./PriceFilterModal";
import AllFiltersModal from "./AllFiltersModal";
import { useFilterBar } from "../hooks/useFilterBar";

export default function FilterBar() {
  const {
    location,
    setLocation,
    checkIn,
    checkOut,
    guests,
    priceRange,
    setPriceRange,
    openModal,
    setOpenModal,
    handleDateChange,
    handleGuestChange,
    handleSearch,
  } = useFilterBar();

  return (
    <div className="relative w-full max-w-[950px]">
      {/* Desktop Design (Visible above 1024px) */}
      <div className="hidden lg:flex items-center border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white h-[60px]">
        {/* Location Segment */}
        <div
          className="flex items-center min-w-[240px] flex-[1.6] px-6 border-r border-gray-200 cursor-text hover:bg-gray-50 transition-colors h-full"
          onClick={() => setOpenModal("all")}
        >
          <HiOutlineMapPin className="text-gray-400 mr-3 shrink-0" size={22} />
          <div className="flex flex-col w-full">
            <span className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">
              Location
            </span>
            <input
              className="bg-transparent text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none w-full font-semibold"
              placeholder="Search destinations"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          {location && (
            <IoClose
              className="text-gray-400 hover:text-gray-600 cursor-pointer ml-1"
              size={18}
              onClick={(e) => {
                e.stopPropagation();
                setLocation("");
              }}
            />
          )}
        </div>

        {/* Date Segment */}
        <div
          className="flex items-center min-w-[180px] flex-1 px-6 border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors h-full"
          onClick={() => setOpenModal("date")}
        >
          <HiOutlineCalendar
            className="text-gray-400 mr-3 shrink-0"
            size={22}
          />
          <div className="flex flex-col truncate">
            <span className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">
              Dates
            </span>
            <span className="text-[14px] text-gray-700 font-bold">
              {checkIn && checkOut ? `${checkIn} - ${checkOut}` : "Add dates"}
            </span>
          </div>
        </div>

        {/* Guests Segment */}
        <div
          className="flex items-center min-w-[280px] flex-[1.3] px-6 cursor-pointer hover:bg-gray-50 transition-colors relative h-full"
          onClick={() => setOpenModal("guest")}
        >
          <HiOutlineUsers className="text-gray-400 mr-4 shrink-0" size={22} />
          <div className="flex flex-col flex-1 leading-tight">
            <span className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">
              Guests
            </span>
            <span className="text-[14px] text-gray-900 font-bold whitespace-nowrap">
              {guests.adults + guests.children} guests
            </span>
          </div>

          {/* Action Buttons inside Guests Segment */}
          <div className="flex items-center gap-3 ml-4 shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenModal("all");
              }}
              className="p-2 border border-gray-200 rounded-lg bg-white hover:scale-105 transition-transform text-gray-500 shadow-sm"
            >
              <BiSliderAlt size={18} />
            </button>
            <button
              className="p-3 rounded-lg bg-primary-green text-white hover:scale-105 transition-transform shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                handleSearch();
              }}
            >
              <IoSearch size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Design (Visible below 1024px) */}
      <div className="lg:hidden flex items-center h-14 w-full border border-gray-200 rounded-xl px-4 py-2 bg-white shadow-sm">
        <IoSearch
          className="text-gray-400 mr-3 shrink-0 cursor-pointer hover:text-primary-green transition-colors"
          size={22}
          onClick={handleSearch}
        />
        <div className="flex flex-col flex-1 min-w-0">
          <input
            className="bg-transparent text-[15px] font-bold text-gray-900 placeholder:text-gray-400 focus:outline-none w-full"
            placeholder="Search destination..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <div className="flex items-center gap-2 text-[12px] text-gray-500 font-medium">
            <span
              onClick={() => setOpenModal("date")}
              className="cursor-pointer hover:text-primary-green underline-offset-2 hover:underline"
            >
              {checkIn && checkOut ? `${checkIn} - ${checkOut}` : "Add dates"}
            </span>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <span
              onClick={() => setOpenModal("guest")}
              className="cursor-pointer hover:text-primary-green underline-offset-2 hover:underline"
            >
              {guests.adults + guests.children} Guests
            </span>
          </div>
        </div>
        <button
          onClick={() => setOpenModal("all")}
          className="ml-3 px-5 py-2 border border-gray-200 rounded-lg text-xs font-bold text-gray-900 bg-gray-50 active:scale-95 transition-all uppercase tracking-wider"
        >
          Filters
        </button>
      </div>

      {/* Modals */}
      {openModal === "date" && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-[100]">
          <DateFilterModal
            onClose={() => setOpenModal(null)}
            onChange={handleDateChange}
            checkIn={checkIn}
            checkOut={checkOut}
          />
        </div>
      )}

      {openModal === "guest" && (
        <div className="absolute top-full left-3/4 -translate-x-1/2 mt-4 z-[100]">
          <GuestFilterModal
            onClose={() => setOpenModal(null)}
            guests={guests}
            onChange={handleGuestChange}
          />
        </div>
      )}

      {openModal === "price" && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-[100]">
          <PriceFilterModal
            onClose={() => setOpenModal(null)}
            priceRange={priceRange}
            onChange={(min, max) => setPriceRange([min, max])}
          />
        </div>
      )}

      {openModal === "all" && (
        <AllFiltersModal onClose={() => setOpenModal(null)} />
      )}
    </div>
  );
}

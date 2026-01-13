"use client";

import { IoSearch, IoClose } from "react-icons/io5";
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
  } = useFilterBar();

  return (
    <div className="w-full">
      <div className="flex xl:grid xl:grid-cols-[2fr_1fr] items-center gap-4">
        {/* ---------------------- Location ---------------------- */}
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <IoSearch size={20} />
          </div>
          <input
            className="w-full pl-12 pr-10 py-3 border border-gray-200 rounded-full shadow-sm text-sm placeholder:text-gray-400 hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-black/5"
            placeholder="Search destinations..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {location && (
            <button
              onClick={() => setLocation("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
            >
              <IoClose size={18} />
            </button>
          )}
        </div>

        {/* ---------------------- Mobile Filter Trigger ---------------------- */}
        <div className="xl:hidden">
          <button
            onClick={() => setOpenModal("all")}
            className="p-3 border border-gray-200 rounded-full hover:shadow-md transition-all active:scale-95 bg-white"
          >
            <div className="relative">
              <span className="w-5 h-5 grid place-items-center">
                <svg
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: "16px",
                    width: "16px",
                    fill: "currentcolor",
                  }}
                >
                  <path d="M5 8c1.306 0 2.418.835 2.83 2H14v2H7.829A3.001 3.001 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.829 4H2V4h6.17A3.001 3.001 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                </svg>
              </span>
            </div>
          </button>
        </div>

        {/* ---------------------- Desktop Filters ---------------------- */}
        <div className="hidden xl:flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setOpenModal(openModal === "date" ? null : "date")}
              className={`flex items-center gap-3 px-5 py-2.5 border rounded-full transition-all hover:shadow-md text-sm ${
                openModal === "date"
                  ? "border-black bg-gray-50"
                  : "border-gray-200"
              }`}
            >
              <div className="text-left">
                {checkIn && checkOut ? (
                  <span className="font-medium">
                    {checkIn} - {checkOut}
                  </span>
                ) : (
                  <span className="text-gray-600">Add dates</span>
                )}
              </div>
            </button>
            {openModal === "date" && (
              <DateFilterModal
                onClose={() => setOpenModal(null)}
                onChange={handleDateChange}
                checkIn={checkIn}
                checkOut={checkOut}
              />
            )}
          </div>

          <div className="relative">
            <button
              onClick={() =>
                setOpenModal(openModal === "guest" ? null : "guest")
              }
              className={`flex items-center gap-3 px-5 py-2.5 border rounded-full transition-all hover:shadow-md text-sm ${
                openModal === "guest"
                  ? "border-black bg-gray-50"
                  : "border-gray-200"
              }`}
            >
              <div className="text-left">
                {guests.adults + guests.children > 0 ? (
                  <span className="font-medium">
                    {guests.adults + guests.children} guests
                  </span>
                ) : (
                  <span className="text-gray-600">Add guests</span>
                )}
              </div>
            </button>
            {openModal === "guest" && (
              <GuestFilterModal
                onClose={() => setOpenModal(null)}
                guests={guests}
                onChange={handleGuestChange}
              />
            )}
          </div>

          <div className="relative">
            <button
              onClick={() =>
                setOpenModal(openModal === "price" ? null : "price")
              }
              className={`flex items-center gap-3 px-5 py-2.5 border rounded-full transition-all hover:shadow-md text-sm ${
                openModal === "price"
                  ? "border-black bg-gray-50"
                  : "border-gray-200"
              }`}
            >
              <div className="text-left">
                {priceRange[0] > 0 || priceRange[1] < 5000 ? (
                  <span className="font-medium">
                    NPR {priceRange[0]} - {priceRange[1]}
                  </span>
                ) : (
                  <span className="text-gray-600">Price</span>
                )}
              </div>
            </button>
            {openModal === "price" && (
              <PriceFilterModal
                onClose={() => setOpenModal(null)}
                priceRange={priceRange}
                onChange={(min, max) => setPriceRange([min, max])}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Modal */}
      {openModal === "all" && (
        <AllFiltersModal onClose={() => setOpenModal(null)} />
      )}
    </div>
  );
}

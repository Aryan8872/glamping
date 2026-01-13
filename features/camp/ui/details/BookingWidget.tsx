"use client";

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { FaStar } from "react-icons/fa";

import { Camp } from "../../types/CampTypes";
import FilterModal from "../FilterModal";
import GuestFilterModal from "../GuestFilterModal";
import { useBookingWidget } from "../../hooks/useBookingWidget";
import { calculateNights } from "../../utils/bookingUtils";

export default function BookingWidget({ campData }: { campData: Camp }) {
  const { state, dispatch, handleContinue } = useBookingWidget(campData);
  const { openModal, dateRange, guests } = state;

  // Calculate nights and price
  const nights = calculateNights(dateRange);

  return (
    <div className="relative">
      <div className="sticky top-24 border border-gray-200 shadow-lg rounded-2xl p-6 bg-white">
        {/* Price & Rating Header */}
        <div className="flex justify-between items-end mb-6">
          <div className="flex flex-col">
            {campData.discountedPrice &&
            campData.discountedPrice < campData.pricePerNight ? (
              <>
                <span className="text-sm text-red-500 line-through font-medium">
                  Rs {campData.originalPrice || campData.pricePerNight}
                </span>
                <div>
                  <span className="text-2xl font-bold text-green-700">
                    Rs {campData.discountedPrice}
                  </span>
                  <span className="text-gray-500 text-sm"> / night</span>
                </div>
              </>
            ) : (
              <div>
                <span className="text-2xl font-bold text-black">
                  Rs {campData.pricePerNight}
                </span>
                <span className="text-gray-500 text-sm"> / night</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 text-sm font-medium">
            <FaStar className="text-yellow-400" />
            <span>4.8</span>
            <span className="text-gray-400 font-normal">(12 reviews)</span>
          </div>
        </div>

        {/* Inputs */}
        <div className="border border-gray-300 rounded-xl overflow-hidden mb-4">
          <div className="flex border-b border-gray-300">
            <button
              onClick={() =>
                dispatch({
                  type: "SET_OPEN_MODAL",
                  payload: openModal === "date" ? null : "date",
                })
              }
              className="flex-1 p-3 text-left hover:bg-gray-50 transition-colors border-r border-gray-300 relative"
            >
              <div className="text-[10px] font-bold uppercase text-gray-800">
                Check-in
              </div>
              <div className="text-sm text-gray-600 truncate">
                {dateRange?.from
                  ? format(dateRange.from, "MMM dd, yyyy")
                  : "Add date"}
              </div>
            </button>
            <button
              onClick={() =>
                dispatch({
                  type: "SET_OPEN_MODAL",
                  payload: openModal === "date" ? null : "date",
                })
              }
              className="flex-1 p-3 text-left hover:bg-gray-50 transition-colors relative"
            >
              <div className="text-[10px] font-bold uppercase text-gray-800">
                Check-out
              </div>
              <div className="text-sm text-gray-600 truncate">
                {dateRange?.to
                  ? format(dateRange.to, "MMM dd, yyyy")
                  : "Add date"}
              </div>
            </button>
          </div>
          <button
            onClick={() =>
              dispatch({
                type: "SET_OPEN_MODAL",
                payload: openModal === "guest" ? null : "guest",
              })
            }
            className="w-full p-3 text-left hover:bg-gray-50 transition-colors relative"
          >
            <div className="text-[10px] font-bold uppercase text-gray-800">
              Guests
            </div>
            <div className="text-sm text-gray-600">
              {guests.adults + guests.children} guests
              {guests.pets > 0 && `, ${guests.pets} pets`}
            </div>
          </button>
        </div>

        {/* Date Modal */}
        {openModal === "date" && (
          <FilterModal
            onClose={() => dispatch({ type: "SET_OPEN_MODAL", payload: null })}
            title="Select dates"
            position="right"
            className="w-[350px] xs:w-[340px] sm:w-auto sm:min-w-[660px] z-20"
          >
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">
                    Add your travel dates for exact pricing
                  </p>
                </div>
              </div>

              <div className="flex justify-center w-full">
                <style>{`
                  .rdp-months { justify-content: center; }
                  @media (max-width: 640px) {
                    .rdp-months { flex-direction: column; }
                    .rdp-month:nth-child(2) { display: none; }
                  }
                `}</style>
                <DayPicker
                  mode="range"
                  selected={dateRange}
                  onSelect={(range) =>
                    dispatch({ type: "SET_DATE_RANGE", payload: range })
                  }
                  numberOfMonths={2}
                  pagedNavigation
                  showOutsideDays
                  disabled={{ before: new Date() }}
                  classNames={{
                    months:
                      "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                    month: "space-y-4",
                    caption: "flex justify-center pt-1 relative items-center",
                    caption_label: "text-sm font-medium",
                    nav: "space-x-1 flex items-center",
                    nav_button: "p-1 hover:opacity-50",
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell:
                      "text-gray-500 rounded-md w-9 font-normal text-[0.8rem]",
                    row: "flex w-full mt-2",
                    cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-gray-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                    day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 rounded-full",
                    day_selected:
                      "bg-black text-white hover:bg-black hover:text-white focus:bg-black focus:text-white",
                    day_today: "bg-gray-100 text-gray-900",
                    day_outside: "text-gray-500 opacity-50",
                    day_disabled: "text-gray-500 opacity-50",
                    day_range_middle:
                      "aria-selected:bg-gray-100 aria-selected:text-gray-900",
                    day_hidden: "invisible",
                  }}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  onClick={() => dispatch({ type: "RESET_DATES" })}
                  className="px-4 py-2 text-sm font-semibold underline hover:bg-gray-100 rounded-lg"
                >
                  Clear dates
                </button>
                <button
                  onClick={() =>
                    dispatch({ type: "SET_OPEN_MODAL", payload: null })
                  }
                  className="px-6 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800"
                >
                  Close
                </button>
              </div>
            </div>
          </FilterModal>
        )}

        {/* Guest Modal */}
        {openModal === "guest" && (
          <GuestFilterModal
            onClose={() => dispatch({ type: "SET_OPEN_MODAL", payload: null })}
            guests={guests}
            maxPets={campData.maxPets}
            maxGuests={campData.maxAdult + campData.maxChildren}
            onChange={(type, delta) =>
              dispatch({
                type: "UPDATE_GUESTS",
                payload: { type, delta },
              })
            }
            className="w-[300px] sm:w-80 top-[200px] z-20"
          />
        )}

        <button
          onClick={handleContinue}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3.5 rounded-xl mt-4 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
          disabled={!dateRange?.from || !dateRange?.to}
        >
          Reserve dates
        </button>

        <p className="text-center text-sm text-gray-500 mt-3">
          You won&apos;t be charged yet
        </p>

        {nights > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
            <div className="flex justify-between text-gray-600">
              <span className="underline decoration-gray-300">
                Rs {campData.discountedPrice || campData.pricePerNight} x{" "}
                {nights} nights
              </span>
              <span>
                Rs{" "}
                {(
                  (campData.discountedPrice || campData.pricePerNight) * nights
                ).toLocaleString()}
              </span>
            </div>
            {campData.discountedPrice &&
              campData.discountedPrice < campData.pricePerNight && (
                <div className="flex justify-between text-green-700 font-medium">
                  <span>Total Savings</span>
                  <span>
                    - Rs{" "}
                    {(
                      (campData.pricePerNight - campData.discountedPrice) *
                      nights
                    ).toLocaleString()}
                  </span>
                </div>
              )}
            <div className="flex justify-between font-bold text-lg pt-4 border-t border-gray-100 text-gray-900">
              <span>Total</span>
              <span>
                Rs{" "}
                {(
                  (campData.discountedPrice || campData.pricePerNight) * nights
                ).toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

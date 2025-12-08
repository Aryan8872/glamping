"use client";

import Image from "next/image";
import { Camp } from "../types/CampTypes";
import CampDetailImageGrid from "./CampDetailImageGrid";
import {
  FaCalendarAlt,
  FaUserFriends,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";
import { useReducer, useEffect } from "react";
import FilterModal from "./FilterModal";
import GuestFilterModal from "./GuestFilterModal";
import { DayPicker, DateRange } from "react-day-picker";
import { format, differenceInDays } from "date-fns";
import "react-day-picker/dist/style.css";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center rounded-xl">
      <span className="text-gray-400">Loading map...</span>
    </div>
  ),
});

// --- Types & Reducer ---

type ModalType = "date" | "guest" | null;

interface GuestCounts {
  adults: number;
  children: number;
  pets: number;
}

interface State {
  openModal: ModalType;
  dateRange: DateRange | undefined;
  guests: GuestCounts;
}

type Action =
  | { type: "SET_OPEN_MODAL"; payload: ModalType }
  | { type: "SET_DATE_RANGE"; payload: DateRange | undefined }
  | {
      type: "UPDATE_GUESTS";
      payload: { type: keyof GuestCounts; delta: number };
    }
  | { type: "RESET_DATES" };

const initialState: State = {
  openModal: null,
  dateRange: undefined,
  guests: {
    adults: 1,
    children: 0,
    pets: 0,
  },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_OPEN_MODAL":
      return { ...state, openModal: action.payload };
    case "SET_DATE_RANGE":
      return { ...state, dateRange: action.payload };
    case "UPDATE_GUESTS":
      return {
        ...state,
        guests: {
          ...state.guests,
          [action.payload.type]: Math.max(
            0,
            state.guests[action.payload.type] + action.payload.delta
          ),
        },
      };
    case "RESET_DATES":
      return { ...state, dateRange: undefined };
    default:
      return state;
  }
}

export default function CampDetail({ campData }: { campData: Camp }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  const { openModal, dateRange, guests } = state;

  // Calculate nights and price
  const nights =
    dateRange?.from && dateRange?.to
      ? differenceInDays(dateRange.to, dateRange.from)
      : 0;

  const totalPrice = nights * campData.pricePerNight;

  const handleContinue = () => {
    if (!dateRange?.from || !dateRange?.to) return;

    const params = new URLSearchParams({
      checkIn: dateRange.from.toISOString(),
      checkOut: dateRange.to.toISOString(),
      adults: guests.adults.toString(),
      children: guests.children.toString(),
      pets: guests.pets.toString(),
    });

    router.push(`/booking/${campData.id}?${params.toString()}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <CampDetailImageGrid images={campData.images} />

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 mt-8">
        {/* Left Column: Camp Details */}
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="border-b border-gray-100 pb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-green mb-2">
              {campData.name}
            </h1>
            <div className="flex items-center gap-4 text-gray-600 text-sm sm:text-base">
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-gray-400" />
                {campData.location || "Location not specified"}
              </span>
              <span>•</span>
              <span>{campData.maxAdult + campData.maxChildren} Guests</span>
              <span>•</span>
              <span>{campData.maxPets > 0 ? "Pets allowed" : "No pets"}</span>
            </div>
          </div>

          {/* Description */}
          <div className="text-gray-600 leading-relaxed text-lg">
            {campData.description}
          </div>

          {/* Facilities */}
          <div>
            <h2 className="text-xl font-bold text-main-heading-green mb-4">
              Facilities
            </h2>
            <div className="flex flex-wrap gap-3">
              {campData.campSiteFacilities?.map((facility, index) => (
                <span
                  className="px-4 py-2 bg-primary-green rounded-lg text-sm text-white font-medium"
                  key={index}
                >
                  {facility.facility.name}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 my-2"></div>

          {/* Host Info */}
          <div className="flex items-center gap-6">
            <div className="h-16 w-16 rounded-full bg-black flex items-center justify-center text-2xl text-white font-bold">
              {campData.campHost?.fullName?.charAt(0) || "H"}
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-600">
                Hosted by {campData.campHost?.fullName}
              </h3>
              <p className="text-gray-500 text-sm">Joined in 2023</p>
            </div>
          </div>

          <div className="border-t border-gray-100 my-2"></div>

          {/* Map Section */}
          <div>
            <h2 className="text-xl font-bold text-primary-green mb-4">
              Location
            </h2>
            {campData.latitude && campData.longitude ? (
              <div className="h-[400px] w-full rounded-xl overflow-hidden border border-gray-200 z-0 relative">
                <LeafletMap
                  locations={[
                    {
                      id: campData.id,
                      latitude: campData.latitude,
                      longitude: campData.longitude,
                      title: campData.name,
                      price: campData.pricePerNight,
                      image: campData.images?.[0]
                        ? `${process.env.NEXT_PUBLIC_RESOLVED_API_BASE_URL}${campData.images[0]}`
                        : undefined,
                    },
                  ]}
                  center={[campData.latitude, campData.longitude]}
                  zoom={13}
                  className="w-full h-full"
                />
              </div>
            ) : (
              <div className="h-[400px] w-full bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt /> Location data not available
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Booking Widget */}
        <div className="relative">
          <div className="sticky top-24 border border-gray-200 shadow-lg rounded-2xl p-6 bg-white">
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

            {/* Date Modal - Omitted for brevity since unchanged in this logic block, but kept structure */}
            {openModal === "date" && (
              <FilterModal
                onClose={() =>
                  dispatch({ type: "SET_OPEN_MODAL", payload: null })
                }
                title="Select dates"
                position="right"
                className="w-auto min-w-[660px]"
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
                        caption:
                          "flex justify-center pt-1 relative items-center",
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
                onClose={() =>
                  dispatch({ type: "SET_OPEN_MODAL", payload: null })
                }
                guests={guests}
                onChange={(type, delta) =>
                  dispatch({
                    type: "UPDATE_GUESTS",
                    payload: { type, delta },
                  })
                }
                className="w-80 top-[200px]"
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
                      (campData.discountedPrice || campData.pricePerNight) *
                      nights
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
                      (campData.discountedPrice || campData.pricePerNight) *
                      nights
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

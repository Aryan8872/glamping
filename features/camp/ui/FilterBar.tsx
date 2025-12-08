"use client";

import { useState, useEffect, useRef } from "react";
import { SearchFilters, Facility } from "@/features/camp/types/CampTypes";
import { getFacilities } from "@/features/camp/service/campService";
import { IoSearch, IoClose } from "react-icons/io5";
import { FaCalendarAlt, FaUserFriends, FaDollarSign } from "react-icons/fa";
import { useSearchStore } from "@/lib/store/searchStore";

/* ---------------------------------------------------
   Reusable Modal Wrapper (Handles outside click)
--------------------------------------------------- */
export function ModalWrapper({
  children,
  onClose,
  className = "",
}: {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export default function FilterBar() {
  const { filters, updateFilter, setFilters } = useSearchStore();

  // Inputs
  const [location, setLocation] = useState(filters.q ?? "");
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

  // Modal states
  const [openModal, setOpenModal] = useState<"date" | "guest" | "price" | null>(
    null
  );

  // Facilities
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loadingFacilities, setLoadingFacilities] = useState(true);

  /* Load facilities */
  useEffect(() => {
    async function load() {
      try {
        const data = await getFacilities();
        setFacilities(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingFacilities(false);
      }
    }
    load();
  }, []);

  /* Sync from Store to Local State */
  useEffect(() => {
    if (filters.q !== undefined && filters.q !== location) {
      setLocation(filters.q);
    }
  }, [filters.q]);

  useEffect(() => {
    const min = filters.minPrice ?? 0;
    const max = filters.maxPrice ?? 5000;
    if (priceRange[0] !== min || priceRange[1] !== max) {
      setPriceRange([min, max]);
    }
  }, [filters.minPrice, filters.maxPrice]);

  useEffect(() => {
    if (filters.checkIn !== checkIn) setCheckIn(filters.checkIn ?? "");
    if (filters.checkOut !== checkOut) setCheckOut(filters.checkOut ?? "");
  }, [filters.checkIn, filters.checkOut]);

  useEffect(() => {
    setGuests((prev) => {
      if (
        prev.adults !== (filters.adults ?? 1) ||
        prev.children !== (filters.children ?? 0) ||
        prev.pets !== (filters.pets ?? 0)
      ) {
        return {
          adults: filters.adults ?? 1,
          children: filters.children ?? 0,
          pets: filters.pets ?? 0,
        };
      }
      return prev;
    });
  }, [filters.adults, filters.children, filters.pets]);

  /* Debounce search (Write back to store) */
  useEffect(() => {
    const t = setTimeout(() => {
      if (location !== (filters.q ?? "")) {
        updateFilter("q", location);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [location, filters.q, updateFilter]);

  /* Update price filter (Write back to store) */
  useEffect(() => {
    const t = setTimeout(() => {
      const currentMin = filters.minPrice ?? 0;
      const currentMax = filters.maxPrice ?? 5000;
      if (priceRange[0] !== currentMin || priceRange[1] !== currentMax) {
        setFilters({
          ...filters,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
        });
      }
    }, 250);
    return () => clearTimeout(t);
  }, [priceRange, filters, setFilters]);

  /* Dates */
  const handleDateChange = (ci: string, co: string) => {
    setCheckIn(ci);
    setCheckOut(co);
    setFilters({
      ...filters,
      checkIn: ci || undefined,
      checkOut: co || undefined,
    });
  };

  /* Guests */
  const handleGuestChange = (
    type: "adults" | "children" | "pets",
    delta: number
  ) => {
    const updated = {
      ...guests,
      [type]: Math.max(0, guests[type] + delta),
    };
    setGuests(updated);
    setFilters({
      ...filters,
      adults: updated.adults,
      children: updated.children,
      pets: updated.pets,
    });
  };

  /* Facility toggle */
  const toggleFacility = (id: string) => {
    // filters.facilityIds is string[] | undefined
    const list = filters.facilityIds || [];
    const updated = list.includes(id)
      ? list.filter((x) => x !== id)
      : [...list, id];
    // updateFilter expects the value for the key. If key is 'facilityIds', value is string[]
    updateFilter("facilityIds", updated);
  };

  /* ---------------------------------------------------
         UI (modals now use ModalWrapper)
  --------------------------------------------------- */
  return (
    <div className="w-full">
      <div className="flex flex-wrap lg:flex-nowrap gap-3 items-center">
        {/* ---------------------- Location ---------------------- */}
        <div className="flex-1 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <IoSearch size={20} />
          </div>
          <input
            className="w-full pl-12 pr-10 py-2.5 border border-gray-300 rounded-xl text-sm placeholder:text-gray-400"
            placeholder="Search destinations..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {location && (
            <button
              onClick={() => setLocation("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <IoClose size={18} />
            </button>
          )}
        </div>

        {/* ---------------------- Dates ---------------------- */}
        <div className="relative min-w-[100px]">
          <button
            onClick={() => setOpenModal(openModal === "date" ? null : "date")}
            className="w-full flex items-center gap-3 px-4 py-1 border border-gray-300 rounded-xl"
          >
            <FaCalendarAlt className="text-gray-400" size={18} />
            <div>
              <div className="text-xs text-gray-500 uppercase">Dates</div>
              <div className="text-sm">
                {checkIn && checkOut
                  ? `${checkIn} - ${checkOut}`
                  : "Select dates"}
              </div>
            </div>
          </button>

          {openModal === "date" && (
            <ModalWrapper
              onClose={() => setOpenModal(null)}
              className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border p-6 z-50"
            >
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-bold">Check In</label>
                  <input
                    type="date"
                    className="w-full border p-3 rounded-lg"
                    value={checkIn}
                    onChange={(e) => handleDateChange(e.target.value, checkOut)}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold">Check Out</label>
                  <input
                    type="date"
                    className="w-full border p-3 rounded-lg"
                    value={checkOut}
                    onChange={(e) => handleDateChange(checkIn, e.target.value)}
                  />
                </div>
              </div>
            </ModalWrapper>
          )}
        </div>

        {/* ---------------------- Guests ---------------------- */}
        <div className="relative min-w-[100px]">
          <button
            onClick={() => setOpenModal(openModal === "guest" ? null : "guest")}
            className="w-full flex items-center gap-3 px-4 py-1 border border-gray-300 rounded-xl"
          >
            <FaUserFriends className="text-gray-400" size={18} />
            <div>
              <div className="text-xs text-gray-500 uppercase">Guests</div>
              <div className="text-sm">
                {guests.adults + guests.children} guests
              </div>
            </div>
          </button>

          {openModal === "guest" && (
            <ModalWrapper
              onClose={() => setOpenModal(null)}
              className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border p-6 z-50"
            >
              <div className="space-y-5">
                {(["adults", "children", "pets"] as const).map((type) => (
                  <div key={type} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold capitalize">
                        {type}
                      </div>
                      <div className="text-xs text-gray-500">
                        {type === "adults" && "Ages 13+"}
                        {type === "children" && "Ages 2-12"}
                        {type === "pets" && "Pets allowed"}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        className="w-9 h-9 rounded-full border-2 border-gray-300 hover:border-black"
                        onClick={() => handleGuestChange(type, -1)}
                        disabled={guests[type] === 0}
                      >
                        −
                      </button>
                      <span className="w-8 text-center">{guests[type]}</span>
                      <button
                        className="w-9 h-9 rounded-full border-2 border-gray-300 hover:border-black"
                        onClick={() => handleGuestChange(type, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </ModalWrapper>
          )}
        </div>

        {/* ---------------------- Price ---------------------- */}
        <div className="relative min-w-[100px]">
          <button
            onClick={() => setOpenModal(openModal === "price" ? null : "price")}
            className="w-full flex items-center gap-3 px-4 py-1 border border-gray-300 rounded-xl"
          >
            <FaDollarSign className="text-gray-400" size={18} />
            <div>
              <div className="text-xs text-gray-500 uppercase">Price</div>
              <div className="text-sm">
                NPR {priceRange[0]} - {priceRange[1]}
              </div>
            </div>
          </button>

          {openModal === "price" && (
            <ModalWrapper
              onClose={() => setOpenModal(null)}
              className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border p-6 z-50"
            >
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm font-semibold">Price Range</span>
                  <span className="text-sm font-bold">
                    NPR {priceRange[0]} - {priceRange[1]}
                  </span>
                </div>

                <input
                  type="range"
                  min={0}
                  max={5000}
                  step={100}
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg accent-black"
                />
              </div>
            </ModalWrapper>
          )}
        </div>
      </div>
    </div>
  );
}

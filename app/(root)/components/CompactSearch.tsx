"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserFriends } from "react-icons/fa";

export default function CompactSearch() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    pets: 0,
  });
  const [showGuestModal, setShowGuestModal] = useState(false);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set("q", destination);
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    if (guests.adults) params.set("adults", String(guests.adults));
    if (guests.children) params.set("children", String(guests.children));
    if (guests.pets) params.set("pets", String(guests.pets));

    router.push(`/search?${params.toString()}`);
  };

  const handleGuestChange = (
    type: "adults" | "children" | "pets",
    delta: number
  ) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta),
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-2 w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[2fr_1.5fr_1.5fr_1.5fr_auto] gap-2 xl:gap-0 items-center">
        {/* Where */}
        <div className="relative px-4 py-3 border-b sm:border-b-0 sm:border-r border-gray-100 xl:border-r xl:border-gray-200">
          <label className="block text-xs font-extrabold text-gray-900 uppercase tracking-wider mb-1">
            Where
          </label>
          <input
            className="w-full text-sm text-gray-700 placeholder-gray-400 font-medium outline-none bg-transparent"
            placeholder="Search destinations"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        {/* Check-in */}
        <div className="relative px-4 py-3 border-b sm:border-b-0 sm:border-r border-gray-100 xl:border-r xl:border-gray-200">
          <label className="block text-xs font-extrabold text-gray-900 uppercase tracking-wider mb-1">
            Check-in
          </label>
          <input
            type="date"
            className="w-full text-sm text-gray-700 font-medium outline-none bg-transparent"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>

        {/* Check-out */}
        <div className="relative px-4 py-3 border-b sm:border-b-0 xl:border-r border-gray-100 xl:border-gray-200">
          <label className="block text-xs font-extrabold text-gray-900 uppercase tracking-wider mb-1">
            Check-out
          </label>
          <input
            type="date"
            className="w-full text-sm text-gray-700 font-medium outline-none bg-transparent"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>

        {/* Guests */}
        <div className="relative px-4 py-3">
          <label className="block text-xs font-extrabold text-gray-900 uppercase tracking-wider mb-1">
            Guests
          </label>
          <button
            onClick={() => setShowGuestModal(!showGuestModal)}
            className="w-full text-sm text-gray-700 font-medium text-left flex items-center justify-between outline-none"
          >
            <span>{guests.adults + guests.children} guests</span>
            <FaUserFriends className="text-gray-400" />
          </button>

          {/* Guest Modal */}
          {showGuestModal && (
            <div className="absolute top-full left-0 mt-4 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 z-50">
              <div className="space-y-5">
                {(["adults", "children", "pets"] as const).map((type) => (
                  <div key={type} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-gray-900 capitalize">
                        {type}
                      </div>
                      <div className="text-xs text-gray-500">
                        {type === "adults" && "Ages 13+"}
                        {type === "children" && "Ages 2-12"}
                        {type === "pets" && "Service animals allowed"}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-emerald-500 hover:text-emerald-600 transition-colors disabled:opacity-30"
                        onClick={() => handleGuestChange(type, -1)}
                        disabled={guests[type] === 0}
                      >
                        -
                      </button>
                      <span className="w-4 text-center text-sm font-bold text-gray-900">
                        {guests[type]}
                      </span>
                      <button
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-emerald-500 hover:text-emerald-600 transition-colors"
                        onClick={() => handleGuestChange(type, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Search Button */}
        <div className="p-1 col-span-1 sm:col-span-2 xl:col-span-1">
          <button
            onClick={handleSearch}
            className="w-full h-full px-2 min-h-[56px] bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-lg rounded-lg transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-2"
          >
            Search 
          </button>
        </div>
      </div>
    </div>
  );
}

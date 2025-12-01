"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserFriends } from "react-icons/fa";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = (delay = 0.08) => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
});

export default function HeroSearch() {
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
    <section className="relative -mt-24 z-20 px-4">
      <div className="mx-auto w-full max-w-[1100px]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger(0.05)}
          className="rounded-3xl border border-white/20 bg-white/90 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] px-6 sm:px-10 py-8"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-xl sm:text-2xl font-bold text-gray-800 mb-6"
          >
            Where do you want to go?
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {/* Location */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Location
              </label>
              <input
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium text-gray-700 placeholder:text-gray-400"
                placeholder="Search destination..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            {/* Check In */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Check in
              </label>
              <input
                type="date"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium text-gray-600"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>

            {/* Check Out */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Check out
              </label>
              <input
                type="date"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium text-gray-600"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>

            {/* Guests */}
            <div className="flex flex-col gap-2 relative">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Guests
              </label>
              <button
                onClick={() => setShowGuestModal(!showGuestModal)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium text-gray-700 text-left flex items-center justify-between"
              >
                <span>
                  {guests.adults + guests.children}{" "}
                  {guests.adults + guests.children === 1 ? "guest" : "guests"}
                </span>
                <FaUserFriends className="text-gray-400" />
              </button>

              {/* Guest Modal */}
              {showGuestModal && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-50">
                  <div className="space-y-5">
                    {(["adults", "children", "pets"] as const).map((type) => (
                      <div
                        key={type}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <div className="text-sm font-semibold text-gray-800 capitalize">
                            {type}
                          </div>
                          <div className="text-xs text-gray-500">
                            {type === "adults" && "Ages 13+"}
                            {type === "children" && "Ages 2-12"}
                            {type === "pets" && "Bring your pets"}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            className="w-9 h-9 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-emerald-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            onClick={() => handleGuestChange(type, -1)}
                            disabled={guests[type] === 0}
                          >
                            <span className="text-lg font-semibold">−</span>
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">
                            {guests[type]}
                          </span>
                          <button
                            className="w-9 h-9 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-emerald-500 transition-colors"
                            onClick={() => handleGuestChange(type, 1)}
                          >
                            <span className="text-lg font-semibold">+</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6"
          >
            <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-500">
              <span className="flex items-center gap-1">
                <span className="text-emerald-500 text-lg">✓</span> Best Prices
              </span>
              <span className="mx-2 text-gray-300">|</span>
              <span className="flex items-center gap-1">
                <span className="text-emerald-500 text-lg">✓</span> Verified
                Stays
              </span>
            </div>
            <button
              onClick={handleSearch}
              className="w-full sm:w-auto rounded-xl bg-emerald-600 px-8 py-4 font-bold text-white hover:bg-emerald-700 transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              Search Adventures
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaStar, FaHeart, FaBolt } from "react-icons/fa";
import { Camp } from "../types/CampTypes";

interface Props {
  results: Camp[];
  loading: boolean;
}

export default function SearchResults({ results, loading }: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
            <div className="h-64 w-full rounded-lg bg-gray-200 animate-pulse mb-3" />
            <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded mb-2" />
            <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🏕️</div>
        <h3 className="text-xl font-bold text-gray-800">No campsites found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((camp) => (
        <div key={camp.id} className="group relative block h-full">
          <div className="relative h-72 w-full overflow-hidden rounded-xl bg-gray-100">
            <button className="absolute top-3 right-3 z-20 rounded-full bg-white/50 p-2 text-white hover:bg-white hover:text-red-500 transition-all backdrop-blur-sm">
              <FaHeart size={18} />
            </button>

            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true, dynamicBullets: true }}
              className="h-full w-full"
            >
              {(camp.images.length ? camp.images : ["https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=60"]).map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img src={img} alt={camp.name} className="h-full w-full object-cover" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <Link href={`/camps/${camp.id}`} className="block mt-3">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-base font-bold text-gray-900 line-clamp-1 group-hover:underline decoration-2 underline-offset-2">
                  {camp.name}
                </h2>
                <p className="text-sm text-gray-500">{camp.location}</p>
                <p className="text-sm text-gray-500 mt-0.5">{camp.maxAdult + camp.maxChildren} guests</p>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 text-sm font-bold text-gray-900">
                  <FaBolt className="text-amber-500 text-xs" />
                  <span>€ {camp.pricePerNight}</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-gray-800 mt-1">
                  <FaStar className="text-amber-400" />
                  <span>{camp.rating || "New"}</span>
                  <span className="text-gray-400">({Math.floor(Math.random() * 50) + 1} reviews)</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

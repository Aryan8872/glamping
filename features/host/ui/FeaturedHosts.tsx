"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { apiGetFeaturedHosts } from "../api/hostApi";
import { FaStar, FaMedal } from "react-icons/fa";
import { Host } from "../types/HostTypes";
import FeaturedHostsSkeleton from "@/components/skeletons/FeaturedHostsSkeleton";

export default function FeaturedHosts() {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHosts() {
      try {
        const data = await apiGetFeaturedHosts();
        setHosts(data || []);
      } catch (error) {
        console.error("Failed to fetch featured hosts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHosts();
  }, []);

  if (loading) {
    return <FeaturedHostsSkeleton />;
  }

  if (!hosts || hosts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Meet Our Featured Hosts
          </h2>
          <p className="text-gray-600 mt-2">
            Experienced locals ready to make your stay unforgettable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {hosts.map((host) => (
            <div
              key={host.id}
              className="flex flex-col items-center bg-gray-50 rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-all"
            >
              <div className="relative w-24 h-24 mb-4">
                <Image
                  src={
                    host.profilePicture
                      ? `${
                          process.env.NEXT_PUBLIC_RESOLVED_API_BASE_URL
                        }/${host.profilePicture.replace(/\\/g, "/")}`
                      : "/placeholder-avatar.jpg"
                  }
                  alt={host.fullName}
                  fill
                  className="rounded-full object-cover border-4 border-white shadow-sm"
                />
                {host.isFeatured && (
                  <div
                    className="absolute -bottom-1 -right-1 bg-yellow-400 text-white p-1.5 rounded-full shadow-sm"
                    title="Featured Host"
                  >
                    <FaMedal size={12} />
                  </div>
                )}
              </div>

              <h3 className="font-bold text-lg text-gray-800">
                {host.fullName}
              </h3>
              {host.hostTagline && (
                <p className="text-sm text-green-600 font-medium mb-2">
                  {host.hostTagline}
                </p>
              )}

              <div className="flex items-center gap-1 text-amber-400 mb-3">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <div className="text-sm text-gray-500">
                {host.yearsOfExperience
                  ? `${host.yearsOfExperience}+ Years Experience`
                  : "Experienced Host"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

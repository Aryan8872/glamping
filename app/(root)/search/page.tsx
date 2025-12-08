"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSearchStore } from "@/lib/store/searchStore";
import Card from "../../../features/camp/ui/Card";
import { FaSearch } from "react-icons/fa";
import Map from "../../../features/camp/ui/Map";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const {
    results,
    loading,
    loadingMore,
    pagination,
    loadMore,
    search,
    setFilters,
    filters,
  } = useSearchStore();

  // Sync URL parameters to store on mount and when URL changes
  useEffect(() => {
    const experience = searchParams.get("experience");
    const destination = searchParams.get("destination");
    const q = searchParams.get("q");

    // Only update if there are URL params that differ from current filters
    if (experience || destination || q) {
      setFilters({
        ...filters,
        experience: experience || undefined,
        destination: destination || undefined,
        q: q || filters.q,
      });
    } else {
      // Trigger search with current filters
      search();
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="grid grid-cols-[1.5fr_1fr] gap-x-8 min-h-screen">
        <div className="w-full py-6 px-4">
          {/* Skeleton */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="h-80 bg-gray-200 animate-pulse rounded-xl"
                />
              ))}
            </div>
          )}
          {/* Results */}
          {!loading && results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {results.map((camp) => (
                <Card key={camp.id} camp={camp} />
              ))}
            </div>
          )}
          {/* Fallback UI */}
          {!loading && results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="bg-white p-6 rounded-full shadow-sm mb-4">
                <FaSearch className="text-gray-300 text-4xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No campsites found
              </h3>
              <p className="text-gray-500 max-w-md">
                We couldn't find any campsites matching your search. Try
                adjusting your filters or search for a different location.
              </p>
              <button
                onClick={() => useSearchStore.getState().reset()}
                className="mt-6 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
          {/* Load More */}
          {pagination?.hasMore && results.length > 0 && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="px-6 py-3 text-white bg-black rounded-lg disabled:opacity-50 hover:bg-gray-800 transition-colors font-medium"
              >
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
        <Map camps={results} />
      </div>
    </div>
  );
}

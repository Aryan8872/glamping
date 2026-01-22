"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSearchStore } from "@/lib/store/searchStore";
import Card from "../../../features/camp/ui/Card";
import { FaSearch } from "react-icons/fa";
import Map from "../../../features/camp/ui/Map";
import FilterBar from "@/features/camp/ui/FilterBar";


function SearchPageContent() {
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

    if (experience || destination || q) {
      setFilters({
        ...filters,
        experience: experience || undefined,
        destination: destination || undefined,
        q: q || filters.q,
      });
    } else {
      search();
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col min-h-screen -mx-3 xl:-mx-20 -mt-6">
      {/* Category Filter Pills Bar */}
      {/* <FilterPills /> */}

      <div className="grid lg:grid-cols-[1fr_450px] xl:grid-cols-[1fr_600px] 2xl:grid-cols-[1fr_800px] min-h-[calc(100vh-140px)]">
        {/* Results Side */}
        <div className="w-full flex flex-col gap-6 px-4 xl:px-8 py-8">
          {/* Skeleton */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="h-80 bg-gray-100 animate-pulse rounded-2xl"
                />
              ))}
            </div>
          )}

          {/* Results */}
          {!loading && results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-8">
              {results.map((camp) => (
                <Card key={camp.id} camp={camp} />
              ))}
            </div>
          )}

          {/* Fallback UI */}
          {!loading && results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="bg-white p-6 rounded-full shadow-sm mb-4 border border-gray-100">
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
                className="mt-6 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors shadow-lg"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Load More */}
          {pagination?.hasMore && results.length > 0 && (
            <div className="mt-12 flex justify-center pb-20">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="px-8 py-3 text-white bg-black rounded-full disabled:opacity-50 hover:bg-gray-800 transition-colors font-semibold shadow-md"
              >
                {loadingMore ? "Loading..." : "Show more results"}
              </button>
            </div>
          )}
        </div>

        {/* Sticky Map Side */}
        <div className="hidden lg:block sticky top-[120px] h-[calc(100vh-120px)] border-l border-gray-100">
          <Map camps={results} />
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={<div className="p-8 text-center">Loading search...</div>}
    >
      <SearchPageContent />
    </Suspense>
  );
}

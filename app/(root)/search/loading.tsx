import { SkeletonCard } from "@/components/skeletons/SkeletonCard";

export default function Loading() {
  return (
    <div className="min-h-screen -mx-3 xl:-mx-20">
      <div className="grid sm:grid-cols-[1.5fr_1fr] gap-x-3 min-h-screen">
        <div className="w-full flex flex-col gap-5 px-6 sm:px-4 mt-6">
          {/* Mock FilterBar */}
          <div className="h-10 w-full bg-gray-100 animate-pulse rounded-lg xl:hidden block" />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} className="h-80" />
            ))}
          </div>
        </div>

        {/* Map Skeleton */}
        <div className="sm:block hidden bg-gray-100 animate-pulse w-full h-full min-h-screen" />
      </div>
    </div>
  );
}

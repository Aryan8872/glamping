export default function AdventuresSkeleton() {
  return (
    <section className="relative min-h-[60vh] px-3 md:px-9 py-10 sm:py-20 bg-white">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="h-9 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-5 bg-gray-200 rounded w-80 mx-auto animate-pulse"></div>
        </div>

        {/* Grid of skeleton cards */}
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="relative min-h-[280px] overflow-hidden rounded-2xl border border-gray-200 bg-gray-50"
            >
              {/* Image skeleton */}
              <div className="h-full w-full aspect-[2/2] xl:aspect-[2/3] bg-gray-200 animate-pulse rounded-2xl"></div>

              {/* Text overlay skeleton */}
              <div className="absolute inset-x-4 bottom-11 z-10 flex-col text-center space-y-2">
                <div className="h-6 bg-gray-300/50 rounded w-3/4 mx-auto animate-pulse"></div>
                <div className="h-4 bg-gray-300/50 rounded w-full animate-pulse hidden sm:block"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

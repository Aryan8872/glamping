export default function FeaturedHostsSkeleton() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="h-9 bg-gray-200 rounded w-80 mx-auto mb-2 animate-pulse"></div>
          <div className="h-5 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
        </div>

        {/* Grid of host cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center bg-gray-50 rounded-2xl p-6 text-center shadow-sm border border-gray-100"
            >
              {/* Avatar */}
              <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 animate-pulse"></div>

              {/* Name */}
              <div className="h-6 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>

              {/* Tagline */}
              <div className="h-4 bg-gray-200 rounded w-40 mb-2 animate-pulse"></div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <div
                    key={j}
                    className="h-4 w-4 bg-gray-200 rounded animate-pulse"
                  ></div>
                ))}
              </div>

              {/* Experience text */}
              <div className="h-4 bg-gray-200 rounded w-36 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

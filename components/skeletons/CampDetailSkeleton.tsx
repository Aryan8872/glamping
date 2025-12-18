export default function CampDetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Image Grid Skeleton */}
      <div className="relative bg-gray-100 p-2 grid grid-cols-1 md:grid-cols-2 w-full max-w-full gap-2 border-[2px] border-gray-200 rounded-lg">
        {/* Large main image */}
        <div
          className="relative block shadow-sm w-full rounded-2xl border border-gray-200 bg-gray-200 animate-pulse"
          style={{ paddingTop: "calc(61.3497%)" }}
        ></div>

        {/* Grid of 4 smaller images */}
        <div className="hidden md:grid grid-cols-2 gap-2">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="relative shadow-sm rounded-2xl border border-gray-200 w-full bg-gray-200 animate-pulse"
              style={{ paddingBottom: "calc(61.3497%)" }}
            ></div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 mt-8">
        {/* Left Column - Camp Details */}
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="border-b border-gray-100 pb-6">
            <div className="h-10 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="flex items-center gap-4">
              <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          </div>

          {/* Facilities */}
          <div>
            <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
            <div className="flex flex-wrap gap-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-9 w-24 bg-gray-200 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          </div>

          {/* Host Info */}
          <div className="flex items-center gap-6 border-t border-gray-100 pt-6">
            <div className="h-16 w-16 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-40 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>
          </div>

          {/* Map Section */}
          <div className="border-t border-gray-100 pt-6">
            <div className="h-6 bg-gray-200 rounded w-24 mb-4 animate-pulse"></div>
            <div className="h-[400px] w-full bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
        </div>

        {/* Right Column - Booking Widget */}
        <div className="relative">
          <div className="sticky top-24 border border-gray-200 shadow-lg rounded-2xl p-6 bg-white">
            {/* Price */}
            <div className="flex justify-between items-end mb-6">
              <div className="space-y-2">
                <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
              <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>

            {/* Date/Guest Inputs */}
            <div className="border border-gray-300 rounded-xl overflow-hidden mb-4">
              <div className="flex border-b border-gray-300">
                <div className="flex-1 p-3 border-r border-gray-300">
                  <div className="h-3 bg-gray-200 rounded w-16 mb-1 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
                <div className="flex-1 p-3">
                  <div className="h-3 bg-gray-200 rounded w-16 mb-1 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
              </div>
              <div className="p-3">
                <div className="h-3 bg-gray-200 rounded w-12 mb-1 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
            </div>

            {/* Reserve Button */}
            <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>

            {/* Note */}
            <div className="h-4 bg-gray-200 rounded w-48 mx-auto mt-3 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

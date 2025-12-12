export default function DestinationsSkeleton() {
  return (
    <section className="w-full bg-white min-h-[95vh] mt-10">
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-10 px-4">
        {/* Left Column - Title and Description */}
        <div className="flex flex-col gap-2">
          <div className="h-9 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          </div>
        </div>

        {/* Right Column - Accordion Items */}
        <div className="flex flex-col gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col max-h-[450px] border-b border-t border-gray-200 py-2"
            >
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
                <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function GalleryPageSkeleton() {
  return (
    <section className="page-padding py-16">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="h-9 bg-gray-200 rounded w-48 mx-auto mb-4 animate-pulse"></div>
      </div>

      {/* Grid of gallery items */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="group relative h-[87%] overflow-hidden rounded-md"
          >
            {/* Image skeleton */}
            <div className="relative h-full rounded-md bg-gray-200 animate-pulse min-h-[300px]"></div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-80 rounded-md"></div>

            {/* Text content skeleton */}
            <div className="absolute bottom-0 w-full px-4 pb-6 text-center space-y-2">
              <div className="h-5 bg-gray-300/50 rounded w-3/4 mx-auto animate-pulse"></div>
              <div className="h-4 bg-gray-300/50 rounded w-full animate-pulse"></div>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}

export default function GalleryDetailSkeleton() {
  return (
    <main className="py-10">
      <div className="mx-auto w-[92%] max-w-[1200px]">
        {/* Title */}
        <div className="h-9 bg-gray-200 rounded w-96 mb-2 animate-pulse"></div>

        {/* Description */}
        <div className="space-y-2 mt-2">
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        </div>

        {/* Image Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-full h-64 bg-gray-200 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </main>
  );
}

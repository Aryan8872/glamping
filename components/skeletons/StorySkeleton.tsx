export default function StorySkeleton() {
  return (
    <section className="bg-white py-14">
      <div className="w-full grid lg:grid-cols-[1.1fr_.9fr] gap-8 items-center">
        {/* Left Column - Text Content */}
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          </div>
          <div className="h-12 bg-gray-200 rounded-xl w-32 animate-pulse"></div>
        </div>

        {/* Right Column - Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {/* Large image - spans 2 cols and 2 rows */}
          <div className="col-span-2 row-span-2 aspect-4/3 bg-gray-200 rounded-xl animate-pulse"></div>

          {/* Smaller images */}
          <div className="aspect-4/3 bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="aspect-4/3 bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="aspect-4/3 bg-gray-200 rounded-xl animate-pulse"></div>

          {/* Host Card */}
          <div className="col-span-2 sm:col-span-3 mt-2 flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
            <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

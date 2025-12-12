export default function TestimonialsSkeleton() {
  return (
    <section className="py-20 bg-green-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-overlay blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="h-9 bg-white/20 rounded w-80 mx-auto mb-4 animate-pulse"></div>
          <div className="h-5 bg-white/20 rounded w-96 mx-auto animate-pulse"></div>
        </div>

        {/* Grid of testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10"
            >
              {/* Quote icon */}
              <div className="h-8 w-8 bg-white/20 rounded mb-6 animate-pulse"></div>

              {/* Quote text */}
              <div className="space-y-2 mb-6">
                <div className="h-4 bg-white/20 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-white/20 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-white/20 rounded w-3/4 animate-pulse"></div>
              </div>

              {/* Author info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-white/20 rounded w-24 animate-pulse"></div>
                  <div className="h-3 bg-white/20 rounded w-32 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

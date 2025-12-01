"use client";

export default function CampingHero() {
  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?crop=entropy&cs=srgb&fm=jpg&q=85"
          alt="Camping Hero"
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
      </div>

      <div className="relative z-10 flex h-full min-h-[85vh] items-center justify-center text-center">
        <div className="w-[90%] max-w-[900px] px-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white drop-shadow-lg tracking-tight">
            Find Your <span className="text-emerald-400">Perfect</span> <br />{" "}
            Outdoor Escape
          </h1>
          <p className="mx-auto mt-6 max-w-[60ch] text-lg sm:text-xl text-gray-200 font-medium leading-relaxed">
            Discover top-rated glamping spots, cozy cabins, and hidden gems in
            the Himalayas. Your next adventure starts here.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#tours"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-8 py-4 text-lg font-bold text-[#062a27] hover:bg-emerald-400 transition-all hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            >
              Explore Stays
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 text-lg font-bold text-white hover:bg-white/20 transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

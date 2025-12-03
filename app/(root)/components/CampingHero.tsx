import Image from "next/image";
import CompactSearch from "./CompactSearch";
import HeroDiscountSection from "@/features/discount/ui/HeroDiscountSection";

export default function CampingHero() {
  return (
    <section className="relative min-h-[85vh] w-auto -mx-9 xl:-mx-20 -mt-6 bg-black">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1525811902-f2342640856e?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Camping Hero"
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
      </div>

      <div className="relative z-10 flex h-full min-h-[85vh] items-center justify-center px-9 xl:px-20 py-20">
        <div className="w-full max-w-[1500px] grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-0  items-center">
          {/* Left Side: Title + Search */}
          <div className="flex flex-col gap-8 text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white drop-shadow-lg tracking-tight leading-tight">
              Find your adventure with Campanyon
            </h1>

            <div className="w-full">
              <CompactSearch />
            </div>
          </div>

          {/* Right Side: Discount Section */}
          <div className="flex justify-center xl:justify-end">
            <HeroDiscountSection />
          </div>
        </div>
      </div>
    </section>
  );
}

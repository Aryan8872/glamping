"use client";
import { useDiscount } from "../service/discountService";
import DiscountTimer from "./DiscountTimer";

export default function HeroDiscountSection() {
  const { discount, loading } = useDiscount();

  if (loading) {
    // Skeleton Loader (Industrial Standard to avoid layout shift)
    return (
      <div className="flex flex-col items-start text-left text-white max-w-lg w-full animate-pulse">
        <div className="h-10 bg-white/20 rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-white/20 rounded w-full mb-6"></div>
        <div className="flex gap-4 mb-6">
          <div className="h-16 w-16 bg-white/20 rounded"></div>
          <div className="h-16 w-16 bg-white/20 rounded"></div>
          <div className="h-16 w-16 bg-white/20 rounded"></div>
          <div className="h-16 w-16 bg-white/20 rounded"></div>
        </div>
        <div className="h-12 bg-white/20 rounded w-full"></div>
      </div>
    );
  }

  // Fallback UI if no discount is active or API fails
  if (!discount) {
    return (
      <div className="flex flex-col items-start text-left text-white max-w-lg w-full">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
          <h2 className="text-3xl sm:text-5xl font-serif tracking-wide">
            Plan your next Escape
          </h2>
        </div>

        <p className="text-base sm:text-lg text-gray-200 mb-4 sm:mb-6 leading-relaxed">
          Discover hidden gems, cozy cabins, and breathtaking views. Your
          perfect adventure awaits.
        </p>

        <div className="flex flex-col gap-3 w-full mt-4">
          <button
            onClick={() => (window.location.href = "/search")}
            className="w-full bg-indigo-400/90 hover:bg-indigo-400 text-indigo-950 font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-colors text-center text-sm sm:text-base"
          >
            Explore All Camps
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start text-left text-white max-w-lg w-full">
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
        <h2 className="text-3xl sm:text-5xl font-serif tracking-wide">
          {discount.title}
        </h2>
        <span className="bg-indigo-300/80 text-indigo-900 text-xs sm:text-sm font-bold px-2 py-1 rounded-md whitespace-nowrap">
          {discount.discountLabel || `${discount.discountPercentage}% off`}
        </span>
      </div>

      <p className="text-base sm:text-lg text-gray-200 mb-4 sm:mb-6 leading-relaxed">
        {discount.description}
      </p>

      <DiscountTimer expiryDate={discount.expiryDate} />

      <div className="flex flex-col gap-3 w-full mt-4">
        <button
          onClick={() => (window.location.href = "/adventures")}
          className="w-full bg-indigo-400/90 hover:bg-indigo-400 text-indigo-950 font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-colors text-center text-sm sm:text-base"
        >
          Explore {discount.title} adventures
        </button>
      </div>
    </div>
  );
}

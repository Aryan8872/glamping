"use client";
import { useDiscountTimer } from "../hooks/useDiscountTimer";
import { formatTime } from "../utils/discountUtils";

interface DiscountTimerProps {
  expiryDate: string;
}

export default function DiscountTimer({ expiryDate }: DiscountTimerProps) {
  const timeLeft = useDiscountTimer(expiryDate);

  return (
    <div className="flex gap-3 sm:gap-6 text-white my-6 w-full justify-between sm:justify-start">
      <div className="flex flex-col items-center">
        <span className="text-2xl sm:text-4xl font-light tracking-widest font-mono w-[2ch] text-center">
          {formatTime(timeLeft.days)}
        </span>
        <span className="text-[10px] sm:text-xs text-gray-300 mt-1">DAYS</span>
      </div>
      <div className="text-2xl sm:text-4xl font-light">:</div>
      <div className="flex flex-col items-center">
        <span className="text-2xl sm:text-4xl font-light tracking-widest font-mono w-[2ch] text-center">
          {formatTime(timeLeft.hours)}
        </span>
        <span className="text-[10px] sm:text-xs text-gray-300 mt-1">HRS</span>
      </div>
      <div className="text-2xl sm:text-4xl font-light">:</div>
      <div className="flex flex-col items-center">
        <span className="text-2xl sm:text-4xl font-light tracking-widest font-mono w-[2ch] text-center">
          {formatTime(timeLeft.minutes)}
        </span>
        <span className="text-[10px] sm:text-xs text-gray-300 mt-1">MINS</span>
      </div>
      <div className="text-2xl sm:text-4xl font-light">:</div>
      <div className="flex flex-col items-center">
        <span className="text-2xl sm:text-4xl font-light tracking-widest font-mono w-[2ch] text-center">
          {formatTime(timeLeft.seconds)}
        </span>
        <span className="text-[10px] sm:text-xs text-gray-300 mt-1">SECS</span>
      </div>
    </div>
  );
}

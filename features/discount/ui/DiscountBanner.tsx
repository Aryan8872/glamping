"use client";
import { useDiscount } from "../service/discountService";
import { useEffect, useState } from "react";
import { TimeLeft } from "../types/discountTypes";

export default function DiscountBanner() {
  const { discount, loading } = useDiscount();

  // Duplicate timer logic for now or extract to a hook if needed.
  // Since the UI is different (inline), I'll keep it simple here or reuse the hook if I made one.
  // I didn't make a hook for the timer logic, just the component.
  // I'll quickly duplicate the calculation for this small banner to avoid over-engineering for now.

  const calculateTimeLeft = (expiry: string): TimeLeft => {
    const difference = +new Date(expiry) - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!discount) return;
    setTimeLeft(calculateTimeLeft(discount.expiryDate));
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(discount.expiryDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [discount]);

  if (loading || !discount) return null;

  return (
    <div className="bg-indigo-900 text-white text-sm py-2 px-4 flex justify-center items-center gap-4">
      <span className="font-bold">{discount.title} is here!</span>
      <span className="hidden sm:inline">
        {discount.description.substring(0, 50)}...
      </span>
      <div className="flex gap-2 font-mono bg-indigo-800 px-2 py-0.5 rounded">
        <span>{timeLeft.days}d</span>
        <span>{timeLeft.hours}h</span>
        <span>{timeLeft.minutes}m</span>
        <span>{timeLeft.seconds}s</span>
      </div>
    </div>
  );
}

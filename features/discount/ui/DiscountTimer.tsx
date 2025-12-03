"use client";
import { useEffect, useState } from "react";
import { TimeLeft } from "../types/discountTypes";

interface DiscountTimerProps {
  expiryDate: string;
}

export default function DiscountTimer({ expiryDate }: DiscountTimerProps) {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(expiryDate) - +new Date();
    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

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

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };

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

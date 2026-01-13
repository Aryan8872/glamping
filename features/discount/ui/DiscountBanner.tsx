"use client";
import { useDiscount } from "../service/discountService";
import { useDiscountTimer } from "../hooks/useDiscountTimer";
import { useEffect, useState } from "react";
import { TimeLeft } from "../types/discountTypes";

export default function DiscountBanner() {
  const { discount, loading } = useDiscount();

  // We need to use the hook conditionally or handle null expiry inside the hook?
  // React hooks cannot be conditional.
  // So we must call it, but maybe pass a dummy date if discount is null?
  // Or better, wrap the timer part in a sub-component or just handle null inside the hook (make hook robust).

  // Let's modify the hook to accept string | undefined.
  // Actually, checking the hook: UseDiscountTimer takes string.
  // So I'll pass a future date or current date if null to avoid errors,
  // but since we return null if !discount, the rendered output won't show valid time anyway.

  // Actually, the best way for a small component like this is to split the content that needs the hook.
  // But to keep it simple, let's just use the hook with a fallback and return null if discount is missing.

  const expiryDate = discount?.expiryDate || new Date().toISOString();
  const timeLeft = useDiscountTimer(expiryDate);

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

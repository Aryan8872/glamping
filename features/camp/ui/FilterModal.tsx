"use client";

import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

interface FilterModalProps {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  position?: "left" | "right";
}

export default function FilterModal({
  onClose,
  title,
  children,
  footer,
  className = "",
  position = "left",
}: FilterModalProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className={`absolute top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 animate-in fade-in zoom-in-95 duration-200 p-5 min-w-[300px]
        ${position === "right" ? "right-0" : "left-0"}
        ${className}
      `}
    >
      {title && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-50 transition-colors"
          >
            <IoClose size={20} />
          </button>
        </div>
      )}

      <div className="max-h-[60vh] overflow-y-auto w-full">{children}</div>

      {footer && (
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
          {footer}
        </div>
      )}
    </div>
  );
}

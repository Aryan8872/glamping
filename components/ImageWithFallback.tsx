"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps
  extends Omit<ImageProps, "src" | "alt" | "onError" | "onLoadingComplete"> {
  src: string;
  alt: string;
  fallback?: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fallback,
  className,
  wrapperClassName,
  ...props
}: ImageWithFallbackProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const defaultFallback = (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
      <svg
        className="h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
  );

  return (
    <div
      className={cn("relative overflow-hidden bg-gray-100", wrapperClassName)}
    >
      {/* Loading shimmer */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 animate-pulse bg-gray-200 flex items-center justify-center">
          <svg
            className="h-8 w-8 animate-spin text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}

      {/* Error fallback */}
      {hasError && (fallback || defaultFallback)}

      {/* Actual image */}
      {!hasError && (
        <Image
          src={src}
          alt={alt}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
            console.error("Image failed to load →", src);
          }}
          onLoad={() => setIsLoading(false)}
          className={cn(
            "object-cover transition-opacity duration-500",
            isLoading ? "opacity-0 scale-95" : "opacity-100 scale-100",
            className
          )}
          {...props}
        />
      )}
    </div>
  );
}

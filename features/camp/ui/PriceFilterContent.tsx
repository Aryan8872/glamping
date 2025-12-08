"use client";

interface PriceFilterContentProps {
  priceRange: number[]; // [min, max]
  onChange: (min: number, max: number) => void;
}

export default function PriceFilterContent({
  priceRange,
  onChange,
}: PriceFilterContentProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Min Price</span>
          <span className="font-semibold">NPR {priceRange[0]}</span>
        </div>
        <div className="h-4 w-px bg-gray-300"></div>
        <div className="flex flex-col text-right">
          <span className="text-xs text-gray-500">Max Price</span>
          <span className="font-semibold">NPR {priceRange[1]}</span>
        </div>
      </div>
      <div>
        <input
          type="range"
          min={0}
          max={5000}
          step={100}
          value={priceRange[1]}
          onChange={(e) => onChange(priceRange[0], Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg accent-black cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>NPR 0</span>
          <span>NPR 5000</span>
        </div>
      </div>
    </div>
  );
}

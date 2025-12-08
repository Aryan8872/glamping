"use client";

interface GuestCounts {
  adults: number;
  children: number;
  pets: number;
}

interface GuestFilterContentProps {
  guests: GuestCounts;
  onChange: (type: keyof GuestCounts, delta: number) => void;
}

export default function GuestFilterContent({
  guests,
  onChange,
}: GuestFilterContentProps) {
  return (
    <div className="space-y-5">
      {(["adults", "children", "pets"] as const).map((type) => (
        <div key={type} className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold capitalize">{type}</div>
            <div className="text-xs text-gray-500">
              {type === "adults" && "Ages 13+"}
              {type === "children" && "Ages 2-12"}
              {type === "pets" && "Pets allowed"}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:border-black hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => onChange(type, -1)}
              disabled={guests[type] === 0}
            >
              −
            </button>
            <span className="w-6 text-center">{guests[type]}</span>
            <button
              className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:border-black hover:bg-gray-50"
              onClick={() => onChange(type, 1)}
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

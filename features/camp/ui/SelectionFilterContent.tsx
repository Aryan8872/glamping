"use client";

interface SelectionFilterContentProps {
  items: { id: number | string; name: string }[];
  selectedValue?: string;
  onChange: (value: string) => void;
  loading?: boolean;
}

export default function SelectionFilterContent({
  items,
  selectedValue,
  onChange,
  loading,
}: SelectionFilterContentProps) {
  if (loading) {
    return (
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-10 w-24 bg-gray-100 animate-pulse rounded-full"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() =>
            onChange(
              selectedValue === item.id.toString() ? "" : item.id.toString(),
            )
          }
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
            selectedValue === item.id.toString()
              ? "border-black bg-black text-white"
              : "border-gray-200 bg-white text-gray-700 hover:border-black"
          }`}
        >
          {item.name || (item as any).title}
        </button>
      ))}
    </div>
  );
}

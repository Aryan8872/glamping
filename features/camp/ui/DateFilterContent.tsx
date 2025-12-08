"use client";

interface DateFilterContentProps {
  checkIn: string;
  checkOut: string;
  onChange: (checkIn: string, checkOut: string) => void;
}

export default function DateFilterContent({
  checkIn,
  checkOut,
  onChange,
}: DateFilterContentProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-xs font-bold mb-1 block">Check In</label>
        <input
          type="date"
          className="w-full border p-3 rounded-lg text-sm"
          value={checkIn}
          onChange={(e) => onChange(e.target.value, checkOut)}
        />
      </div>
      <div>
        <label className="text-xs font-bold mb-1 block">Check Out</label>
        <input
          type="date"
          className="w-full border p-3 rounded-lg text-sm"
          value={checkOut}
          onChange={(e) => onChange(checkIn, e.target.value)}
        />
      </div>
    </div>
  );
}

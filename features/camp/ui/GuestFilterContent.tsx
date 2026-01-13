"use client";

interface GuestCounts {
  adults: number;
  children: number;
  pets: number;
}

interface GuestFilterContentProps {
  guests: GuestCounts;
  onChange: (type: keyof GuestCounts, delta: number) => void;
  maxPets?: number;
  maxGuests?: number;
}

export default function GuestFilterContent({
  guests,
  onChange,
  maxPets,
  maxGuests,
}: GuestFilterContentProps) {
  const totalPeople = guests.adults + guests.children;

  return (
    <div className="space-y-5">
      {(["adults", "children", "pets"] as const).map((type) => {
        const isPets = type === "pets";
        const petsAllowed = isPets && (maxPets === undefined || maxPets > 0);

        // Calculate disableAdd
        let disableAdd = false;
        if (isPets) {
          // Disable if pets not allowed or limit reached (if you want to enforce limit on pets too, currently logic was just !petsAllowed)
          // The previous logic was just `!petsAllowed`. Let's keep it simple or add limit check if needed.
          // The prompt asked for "guests and children should not cross camp limit".
          // We can also enforce pet limits if maxPets is defined.
          if (!petsAllowed) {
            disableAdd = true;
          } else if (maxPets !== undefined && guests.pets >= maxPets) {
            disableAdd = true;
          }
        } else {
          // For adults/children
          if (maxGuests !== undefined && totalPeople >= maxGuests) {
            disableAdd = true;
          }
        }

        return (
          <div key={type} className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold capitalize">{type}</div>
              <div className="text-xs text-gray-500">
                {type === "adults" && "Ages 13+"}
                {type === "children" && "Ages 2-12"}
                {type === "pets" &&
                  (petsAllowed ? "Pets allowed" : "No pets allowed")}
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
              <span
                className={`w-6 text-center ${
                  disableAdd ? "text-gray-400" : ""
                }`}
              >
                {guests[type]}
              </span>
              <button
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:border-black hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => onChange(type, 1)}
                disabled={disableAdd}
              >
                +
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

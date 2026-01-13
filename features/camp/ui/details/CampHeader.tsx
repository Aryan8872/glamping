import { FaMapMarkerAlt } from "react-icons/fa";
import { Camp } from "../../types/CampTypes";

export default function CampHeader({ campData }: { campData: Camp }) {
  return (
    <div className="border-b border-gray-100 pb-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-primary-green mb-2">
        {campData.name}
      </h1>
      <div className="flex items-center gap-4 text-gray-600 text-sm sm:text-base">
        <span className="flex items-center gap-1">
          <FaMapMarkerAlt className="text-gray-400" />
          {campData.location || "Location not specified"}
        </span>
        <span>•</span>
        <span>{campData.maxAdult + campData.maxChildren} Guests</span>
        <span>•</span>
        <span>{campData.maxPets > 0 ? "Pets allowed" : "No pets"}</span>
      </div>
    </div>
  );
}

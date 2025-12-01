"use client";

import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Camp } from "@/features/camp/types/CampTypes";

// ---------------------------------------------------------
//  Marker Icon Configuration
// ---------------------------------------------------------
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// ---------------------------------------------------------
//  Sub-component: FitBounds
// ---------------------------------------------------------
interface FitProps {
  camps: Camp[];
}

function FitBounds({ camps }: FitProps) {
  const map = useMap();

  useEffect(() => {
    if (!camps.length) return;

    const validCamps = camps.filter(
      (camp) => camp.latitude != null && camp.longitude != null
    );

    if (!validCamps.length) return;

    const bounds = L.latLngBounds(
      validCamps.map((camp) => [camp.latitude!, camp.longitude!])
    );

    map.fitBounds(bounds, { padding: [50, 50] });
  }, [camps, map]);

  return null;
}

// ---------------------------------------------------------
//  Main Component: MapComponent
// ---------------------------------------------------------
export default function MapComponent({ camps }: { camps: Camp[] }) {
  // Use a random ID to ensure the map container is unique on every mount
  const mapId = useMemo(
    () => `map-${Math.random().toString(36).substr(2, 9)}`,
    []
  );
  const [isMounted, setIsMounted] = useState(false);

  const defaultCenter: [number, number] = [27.7172, 85.324];

  const validCamps = useMemo(
    () =>
      camps.filter((camp) => camp.latitude != null && camp.longitude != null),
    [camps]
  );

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-[420px] rounded-xl overflow-hidden border shadow-sm bg-gray-100 flex items-center justify-center">
        <span className="text-gray-400 text-sm">Loading Map...</span>
      </div>
    );
  }

  return (
    <div className="w-full h-[420px] rounded-xl overflow-hidden border shadow-sm relative z-0">
      <MapContainer
        key={mapId} // Force remount if ID changes (though ID is stable per instance)
        center={defaultCenter}
        zoom={7}
        className="w-full h-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {validCamps.length > 0 && <FitBounds camps={validCamps} />}

        {validCamps.map((camp) => (
          <Marker
            key={camp.id}
            position={[camp.latitude!, camp.longitude!]}
            icon={markerIcon}
          >
            <Popup>
              <div className="min-w-[200px]">
                {camp.images && camp.images[0] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`${process.env.NEXT_PUBLIC_RESOLVED_API_BASE_URL}${camp.images[0]}`}
                    alt={camp.name}
                    className="w-full h-28 object-cover rounded-md mb-2"
                  />
                )}
                <h3 className="font-semibold text-sm">{camp.name}</h3>
                <div className="text-emerald-600 font-bold text-sm">
                  NPR {camp.pricePerNight}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

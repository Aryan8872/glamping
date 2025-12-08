"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRouter } from "next/navigation";

// ---------------------------------------------------------
//  Types
// ---------------------------------------------------------
export interface MapLocation {
  id: number | string;
  latitude: number;
  longitude: number;
  title?: string;
  price?: number | string;
  image?: string;
}

interface MapProps {
  locations: MapLocation[];
  center?: [number, number];
  zoom?: number;
  className?: string;
  interactive?: boolean;
}

export default function LeafletMap({
  locations,
  center = [27.7172, 85.324], // Kathmandu default
  zoom = 7,
  className = "w-full h-full",
  interactive = true,
}: MapProps) {
  const router = useRouter();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const customIcon = useMemo(() => {
    return (price?: number | string) =>
      L.divIcon({
        className: "custom-map-marker",
        html: `<div class="bg-white text-gray-800 font-bold px-3 py-1 rounded-full shadow-md border border-gray-200 text-xs hover:scale-110 transition-transform whitespace-nowrap">
               ${price ? `Rs ${price}` : ""}
             </div>`,
        iconSize: [60, 30],
        iconAnchor: [30, 15],
      });
  }, []);

  const defaultIcon = useMemo(
    () =>
      new L.Icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      }),
    []
  );

  // Initialize Map Manually
  useEffect(() => {
    if (!isMounted || !mapContainerRef.current) return;

    // Cleanup existing map if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const container = mapContainerRef.current;

    // Safety check: ensure no residual Leaflet ID
    if ((container as any)._leaflet_id) {
      (container as any)._leaflet_id = null;
    }

    const map = L.map(container, {
      center,
      zoom,
      scrollWheelZoom: interactive,
      dragging: interactive,
      zoomControl: interactive,
    });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }
    ).addTo(map);

    // Add Markers
    if (locations.length > 0) {
      const bounds = L.latLngBounds([]);

      locations.forEach((loc) => {
        const marker = L.marker([loc.latitude, loc.longitude], {
          icon: loc.price ? customIcon(loc.price) : defaultIcon,
        }).addTo(map);

        // Bind Popup
        if (interactive && loc.id) {
          marker.on("click", () => {
            router.push(`/camp/${loc.id}`);
          });

          const popupContent = document.createElement("div");
          popupContent.className = "custom-popup cursor-pointer min-w-[160px]";
          popupContent.innerHTML = `
              ${
                loc.image
                  ? `<img src="${loc.image}" class="w-full h-24 object-cover rounded-lg mb-2"/>`
                  : ""
              }
              <h3 class="font-bold text-gray-800 text-sm line-clamp-1">${
                loc.title || ""
              }</h3>
              ${
                loc.price
                  ? `<p class="text-emerald-600 font-bold text-sm">Rs ${loc.price} <span class="text-xs font-normal text-gray-500">/ night</span></p>`
                  : ""
              }
           `;

          popupContent.addEventListener("click", () => {
            router.push(`/camp/${loc.id}`);
          });

          marker.bindPopup(popupContent);
        }

        bounds.extend([loc.latitude, loc.longitude]);
      });

      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isMounted /* center, zoom, locations */]);
  // Intentionally omitting deep deps to prevent re-init.
  // Ideally, use a separate effect for updating keys if needed, but full re-init is safer here.

  if (!isMounted) {
    return (
      <div
        className={`${className} bg-gray-100 flex items-center justify-center animate-pulse rounded-xl`}
      >
        <span className="text-gray-400 font-medium">Loading Map...</span>
      </div>
    );
  }

  return <div ref={mapContainerRef} className={`${className} z-0`} />;
}

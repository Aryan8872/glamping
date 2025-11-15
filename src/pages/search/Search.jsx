import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  Popup,
  useMap,
} from "react-leaflet";
import { CiGrid41 } from "react-icons/ci";

import { BiSearch } from "react-icons/bi";
import { LuLogs } from "react-icons/lu";

// Inline icons (no external icon libs)
const IconSearch = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const IconFilter = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polygon points="22 3 2 3 10 12 10 19 14 21 14 12 22 3" />
  </svg>
);
const IconPin = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 1 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconStar = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" {...props}>
    <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.402 8.168L12 18.896l-7.336 3.87 1.402-8.168L.132 9.211l8.2-1.193z" />
  </svg>
);

const mock = [
  {
    id: 1,
    name: "Lakeside Paradise Campground",
    location: "Blue Mountains, NSW 2787",
    price: 45,
    rating: 4.8,
    reviews: 124,
    lat: -33.7,
    lng: 150.3,
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop",
    type: "Powered Site",
    availability: "Available",
    features: ["Wifi", "Power", "Water", "Showers"],
  },
  {
    id: 2,
    name: "Mountain View Camping Resort",
    location: "Katoomba, NSW 2780",
    price: 38,
    rating: 4.6,
    reviews: 89,
    lat: -33.72,
    lng: 150.32,
    image:
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&auto=format&fit=crop",
    type: "Tent Site",
    availability: "Available",
    features: ["Wifi", "Power", "Showers"],
  },
  {
    id: 3,
    name: "Riverside Camping Park",
    location: "Wentworth Falls, NSW 2782",
    price: 52,
    rating: 4.9,
    reviews: 156,
    lat: -33.68,
    lng: 150.28,
    image:
      "https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?w=800&auto=format&fit=crop",
    type: "Cabin Site",
    availability: "2 spots left",
    features: ["Wifi", "Power", "Water", "Showers"],
  },
];

export default function Search() {
  const [view, setView] = useState("list");
  const [hover, setHover] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [price, setPrice] = useState([0, 100]);
  const [features, setFeatures] = useState({
    Wifi: false,
    Power: false,
    Water: false,
    Showers: false,
  });

  const createIcon = (price) =>
    L.divIcon({
      className: "custom-marker",
      html: `<div style="background-color:#059669;color:white;padding:8px 12px;border-radius:20px;font-weight:700;box-shadow:0 4px 14px rgba(0,0,0,.18);white-space:nowrap">$${price}</div>`,
      iconSize: [60, 32],
      iconAnchor: [30, 32],
    });

  function MapBounds({ points }) {
    const map = useMap();
    useEffect(() => {
      if (points?.length) {
        try {
          map.fitBounds(points, { padding: [40, 40] });
        } catch (e) {}
        setTimeout(() => map.invalidateSize(), 50);
      }
    }, [points, map]);
    return null;
  }

  // Simulate fetching
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const filtered = React.useMemo(() => {
    const activeFeatures = Object.entries(features)
      .filter(([, v]) => v)
      .map(([k]) => k);
    return mock.filter((m) => {
      const withinPrice = m.price >= price[0] && m.price <= price[1];
      const matchesQuery = (m.name + " " + m.location)
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesFeatures =
        activeFeatures.length === 0 ||
        activeFeatures.every((f) => m.features?.includes(f));
      return withinPrice && matchesQuery && matchesFeatures;
    });
  }, [query, price, features]);

  return (
    <div className="w-full grid grid-cols-[1fr_1fr]">
      <div className="w-full flex flex-col gap-5">
        <div className="w-full px-5 py-2">Filter option section</div>
        <div className="w-full flex gap-2">
          <div className="relative flex-1">
            <input placeholder="Search" className="w-full pl-9 py-2 rounded-md"/>
            <BiSearch className="absolute left-2 top-3"/>
          </div>
          <button>Reset</button>
          <button>Search</button>
        </div>
        <div className="w-full flex justify-between">
          <div>
            <div className="group/sort-buttons border-[2px] border-gray-300 bg-gray-200 rounded-md flex">
              <button className="bg-gray-200 cursor-pointer text-gray-500 font-semibold px-2 py-1 rounded-md">Sort by date</button>
              <button className="bg-gray-200  cursor-pointer text-gray-500 font-semibold px-2 py-1 rounded-md">Sort by price</button>
            </div>
          </div>

          <div>
            <div className="group/sort-buttons border-[2px] border-gray-300 bg-gray-200 rounded-md flex">
              <button className="bg-gray-200 cursor-pointer flex gap-2 items-center text-gray-500 font-semibold px-2 py-1 rounded-md">
                <LuLogs/>
                List
              </button>
              <button className="bg-gray-200  cursor-pointer flex gap-2 items-center text-gray-500 font-semibold px-2 py-1 rounded-md">
                <CiGrid41/>
                Grid
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="h-full w-full bg-black">map section</div>
    </div>
  );
}

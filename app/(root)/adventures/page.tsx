"use client";

import { useEffect, useState } from "react";
import { getAdventuresService } from "@/features/adventure/service/adventureService";
import AdventureCard from "@/features/adventure/ui/AdventureCard";

export default function Adventures() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchAdventures() {
      try {
        const adventuresData = await getAdventuresService();
        setData(adventuresData);
      } catch (err) {
        console.error("Failed to load adventures:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchAdventures();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold">Loading adventures...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Unavailable</h2>
        <p className="text-gray-600 mb-4">
          We couldn't load the adventures at this moment.
        </p>
        <a href="/" className="px-4 py-2 bg-black text-white rounded-lg">
          Return Home
        </a>
      </div>
    );
  }

  return (
    <div>
      <AdventureCard data={data} />
    </div>
  );
}

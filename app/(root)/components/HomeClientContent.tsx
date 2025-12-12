"use client";

import { useEffect, useState } from "react";
import PopularRegions from "@/features/destination/ui/DestinationsSection";
import { apiGetAllDestinations } from "@/features/destination/api/destinationApi";
import DestinationsSkeleton from "@/components/skeletons/DestinationsSkeleton";

export default function HomeClientContent() {
  const [destinationData, setDestinationData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const data = await apiGetAllDestinations();
        setDestinationData(data);
      } catch (error) {
        console.error("Failed to load destinations:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDestinations();
  }, []);

  if (loading) return <DestinationsSkeleton />;

  return <PopularRegions data={destinationData} />;
}

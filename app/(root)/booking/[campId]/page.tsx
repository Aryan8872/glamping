"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCampById } from "@/features/camp/service/campService";
import BookingPage from "@/features/booking/ui/BookingPage";

export default function Page() {
  const params = useParams();
  const [campData, setCampData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    async function fetchCamp() {
      try {
        const id = Number(params.campId);
        const data = await getCampById(id);
        setCampData(data);
      } catch (err) {
        console.error("Failed to fetch camp data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCamp();
  }, [mounted, params.campId]);

  if (!mounted || loading) {
    return <div className="p-8 text-center">Loading booking details...</div>;
  }

  return <BookingPage campData={campData} />;
}

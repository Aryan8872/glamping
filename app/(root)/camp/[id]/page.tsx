"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { apiGetCampById } from "@/features/camp/api/campApi";
import CampDetail from "@/features/camp/ui/CampDetail";

export default function CampPage() {
  const params = useParams();
  const [campData, setCampData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCamp() {
      try {
        const id = Number(params.id);
        const data = await apiGetCampById(id);

        if (!data) {
          setError(true);
        } else {
          setCampData(data);
        }
      } catch (err) {
        console.error("Failed to fetch camp data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchCamp();
  }, [params.id]);

  if (loading) {
    return <div className="p-8 text-center">Loading camp details...</div>;
  }

  if (error || !campData) {
    notFound();
  }

  return <CampDetail campData={campData} />;
}

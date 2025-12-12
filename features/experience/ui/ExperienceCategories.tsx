"use client";

import React, { useEffect, useState } from "react";
import { apiGetAllExperiences } from "../api/experienceApi";
import ExperienceList from "./ExperienceList";
import { Experience } from "../types/ExperienceTypes";
import ExperiencesSkeleton from "@/components/skeletons/ExperiencesSkeleton";

export default function ExperienceCategories() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const data = await apiGetAllExperiences();
        setExperiences(data || []);
      } catch (error) {
        console.error("Failed to fetch experiences:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchExperiences();
  }, []);

  if (loading) {
    return <ExperiencesSkeleton />;
  }

  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <section>
      <ExperienceList experiences={experiences} />
    </section>
  );
}

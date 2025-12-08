import React from "react";
import { apiGetAllExperiences } from "../api/experienceApi";
import ExperienceList from "./ExperienceList";

export default async function ExperienceCategories() {
  const experiences = await apiGetAllExperiences();

  if (!experiences || experiences.length === 0) {
    return null;
  }

  return <ExperienceList experiences={experiences} />;
}

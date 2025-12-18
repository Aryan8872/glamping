import { getAboutUs } from "@/lib/api/about";
import AboutContent from "./AboutContent";

export const dynamic = "force-dynamic";

export default async function About() {
  let aboutData;
  try {
    aboutData = await getAboutUs();
    if (!aboutData) {
      aboutData = {};
    }
  } catch (error) {
    console.error("Failed to fetch About Us data:", error);
    // Add fallback data just in case
    aboutData = {};
  }

  return <AboutContent aboutData={aboutData} />;
}

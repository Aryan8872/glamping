import CampingHero from "./components/CampingHero";
import Story from "./components/Story";
import FeaturedDestinations from "./components/FeaturedDestinations";
import HowItWorks from "./components/HowItWorks";
import Adventures from "./adventures/page";
import { Suspense } from "react";
import ExperienceCategories from "@/features/experience/ui/ExperienceCategories";
import FeaturedHosts from "@/features/host/ui/FeaturedHosts";
import Testimonials from "@/features/testimonial/ui/Testimonials";
import PopularRegions from "@/features/destination/ui/DestinationsSection";
import { apiGetAllDestinations } from "@/features/destination/api/destinationApi";

export default async function Home() {
  let destinationData: any[] = [];

  try {
    destinationData = await apiGetAllDestinations();
  } catch (error) {
    console.error("Failed to load destinations:", error);
  }

  return (
    <div className="font-sans">
      <CampingHero />

      <Suspense
        fallback={
          <div className="h-48 bg-gray-50 flex items-center justify-center">
            Loading Experiences...
          </div>
        }
      >
        <ExperienceCategories />
      </Suspense>

      {/* <FeaturedDestinations /> */}

      <PopularRegions data={destinationData} />

      <Suspense
        fallback={
          <div className="h-48 bg-gray-50 flex items-center justify-center">
            Loading Adventures...
          </div>
        }
      >
        <Adventures />
      </Suspense>

      <Story />

      <HowItWorks />

      <Suspense
        fallback={
          <div className="h-48 bg-gray-50 flex items-center justify-center">
            Loading Hosts...
          </div>
        }
      >
        <FeaturedHosts />
      </Suspense>

      <Suspense
        fallback={
          <div className="h-48 bg-gray-50 flex items-center justify-center">
            Loading Testimonials...
          </div>
        }
      >
        <Testimonials />
      </Suspense>
    </div>
  );
}

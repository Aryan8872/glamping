import CampingHero from "./components/CampingHero";
import Story from "./components/Story";
import HowItWorks from "./components/HowItWorks";
import Adventures from "./adventures/page";
import { Suspense } from "react";
import ExperienceCategories from "@/features/experience/ui/ExperienceCategories";
import FeaturedHosts from "@/features/host/ui/FeaturedHosts";
import Testimonials from "@/features/testimonial/ui/Testimonials";
import HomeClientContent from "./components/HomeClientContent";

export const dynamic = "force-dynamic";

export default function Home() {
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

      <HomeClientContent />

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

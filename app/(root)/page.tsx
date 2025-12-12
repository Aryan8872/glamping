import CampingHero from "./components/CampingHero";
import Story from "./components/Story";
import HowItWorks from "./components/HowItWorks";
import Adventures from "./adventures/page";
import { Suspense } from "react";
import ExperienceCategories from "@/features/experience/ui/ExperienceCategories";
import FeaturedHosts from "@/features/host/ui/FeaturedHosts";
import Testimonials from "@/features/testimonial/ui/Testimonials";
import HomeClientContent from "./components/HomeClientContent";
import ExperiencesSkeleton from "@/components/skeletons/ExperiencesSkeleton";
import AdventuresSkeleton from "@/components/skeletons/AdventuresSkeleton";
import FeaturedHostsSkeleton from "@/components/skeletons/FeaturedHostsSkeleton";
import TestimonialsSkeleton from "@/components/skeletons/TestimonialsSkeleton";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="font-sans">
      <CampingHero />

      <Suspense fallback={<ExperiencesSkeleton />}>
        <ExperienceCategories />
      </Suspense>

      <HomeClientContent />

      <Suspense fallback={<AdventuresSkeleton />}>
        <Adventures />
      </Suspense>

      <Story />

      {/* <HowItWorks /> */}

      <Suspense fallback={<FeaturedHostsSkeleton />}>
        <FeaturedHosts />
      </Suspense>

      <Suspense fallback={<TestimonialsSkeleton />}>
        <Testimonials />
      </Suspense>
    </div>
  );
}

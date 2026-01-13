"use client";

import AboutHero from "@/features/aboutus/ui/AboutHero";
import AboutIntro from "@/features/aboutus/ui/AboutIntro";
import AboutStats from "@/features/aboutus/ui/AboutStats";
import AboutVisionMission from "@/features/aboutus/ui/AboutVisionMission";
import AboutCoreValues from "@/features/aboutus/ui/AboutCoreValues";

export default function AboutContent({ aboutData }: { aboutData: any }) {
  const coreValues = aboutData?.coreValues || [];

  return (
    <section className="mx-auto md:w-[92%] max-w-[1200px]">
      <AboutHero />

      <AboutIntro
        aboutUs={aboutData?.aboutUs}
        textbox1={aboutData?.textbox_1}
        textbox2={aboutData?.textbox_2}
      />

      <AboutStats stats={aboutData?.stats} />

      <AboutVisionMission
        vision={aboutData?.vision}
        mission={aboutData?.mission}
      />

      <AboutCoreValues coreValues={coreValues} />
    </section>
  );
}

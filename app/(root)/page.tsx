import CampingHero from "./components/CampingHero";
import Story from "./components/Story";
import FeaturedDestinations from "./components/FeaturedDestinations";
import HowItWorks from "./components/HowItWorks";
import Adventures from "./adventures/page";

export default function Home() {
  return (
    <div className="font-sans">
      <CampingHero />
      <Adventures />
      <Story />
      <FeaturedDestinations />
      <HowItWorks />
    </div>
  );
}

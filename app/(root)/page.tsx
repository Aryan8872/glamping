import CampingHero from "./components/CampingHero";
import HeroSearch from "./components/HeroSearch";
import PopularTours from "./components/PopularAdventures";
import Story from "./components/Story";
import GiftCard from "./components/GiftCard";
import Steps from "./components/Steps";

export default function Home() {
  return (
  <div className="font-sans">
    <CampingHero/>
    <HeroSearch/>
    <PopularTours/>
    <Story/>
    <GiftCard/>
    <Steps/>
  </div>
    )
}

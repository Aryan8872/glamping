import { apiSearchCamps } from "@/features/camp/api/campApi";
import { Camp } from "@/features/camp/types/CampTypes";
import StoryContent from "./StoryContent";

export default async function Story() {
  let featuredCamp: Camp | undefined;
  try {
    const result = await apiSearchCamps({ isFeatured: true, limit: 1 });
    featuredCamp = result.data[0];
  } catch (error) {
    console.error("Failed to fetch featured camp for Story:", error);
    return null;
  }

  if (!featuredCamp) return null;

  return <StoryContent featuredCamp={featuredCamp} />;
}

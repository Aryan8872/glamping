import { getAdventuresService } from "@/features/adventure/service/adventureService";
import AdventureCard from "@/features/adventure/ui/AdventureCard";

export default async function Adventures() {
  try {
    const data = await getAdventuresService();
    return (
      <div>
        <AdventureCard data={data} />
      </div>
    );
  } catch (error) {
    console.error("Failed to load adventures:", error);
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Unavailable</h2>
        <p className="text-gray-600 mb-4">
          We couldn't load the adventures at this moment.
        </p>
        <a href="/" className="px-4 py-2 bg-black text-white rounded-lg">
          Return Home
        </a>
      </div>
    );
  }
}

import React from "react";
import { FiMessageCircle } from "react-icons/fi";
import Card from "../../../../features/camp/ui/Card";
import { getAdventureBySlug } from "@/features/adventure/service/adventureService";

const page = async ({
  params,
}: {
  params: Promise<{ adventureSlug: string }>;
}) => {
  const { adventureSlug } = await params;
  const adventureData = await getAdventureBySlug(adventureSlug);
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(${process.env.NEXT_PUBLIC_RESOLVED_API_BASE_URL}${adventureData.bannerImage})`,
          }}
        />

        <div className="hidden sm:flex relative h-full  items-center justify-center px-4">
          <div className="bg-white bg-opacity-95 px-12 font-medium py-16 max-w-4xl text-center shadow-lg">
            <h1 className=" text-2xl sm:text-3xl md:text-4xl font-serif leading-tight mb-2 wrap-anywhere">
              {adventureData.title}
            </h1>
            <h1 className="text-4xl sm:text-4xl md:text-5xl font-serif leading-tight wrap-anywhere">
              {/* Scandinavia{" "} {adventureData.name} */}
              {adventureData.name}
              {/* <span className="text-gray-600">– Create Magical</span> */}
            </h1>
            {/* <h1 className="text-5xl md:text-6xl font-serif leading-tight">
              Moments Together
            </h1> */}
          </div>
        </div>
      </div>

      <div className="md:max-w-7xl w-full mx-auto px-3 sm:px-6 py-8">
        <h2 className="text-2xl font-semibold mb-8 text-gray-900 wrap-anywhere">
          {adventureData.name}
          {adventureData.title}
        </h2>

        <div className="space-y-6 text-gray-700 leading-relaxed wrap-anywhere">
          <p>{adventureData.pageDescription}</p>
        </div>
        <div className="mt-10 w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {adventureData.campSites.map((camp, index) => (
            <Card camp={camp.campSite} key={index} />
          ))}
        </div>
      </div>

      <button className="fixed bottom-8 right-8 bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-900 transition-colors">
        <FiMessageCircle size={24} />
      </button>
    </div>
  );
};

export default page;

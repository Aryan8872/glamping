import { Camp } from "../../types/CampTypes";

export default function CampFacilities({ campData }: { campData: Camp }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-main-heading-green mb-4">
        Facilities
      </h2>
      <div className="flex flex-wrap gap-3">
        {(campData.campSiteFacilities || (campData as any).facilities)?.map(
          (item: any, index: number) => {
            const facilityName = item.facility?.name || item.name;
            if (!facilityName) return null;

            return (
              <span
                className="px-4 py-2 bg-primary-green rounded-lg text-sm text-white font-medium"
                key={index}
              >
                {facilityName}
              </span>
            );
          }
        )}
      </div>
    </div>
  );
}

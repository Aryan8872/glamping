import { notFound } from "next/navigation";
import { apiGetCampById } from "@/features/camp/api/campApi";
import CampDetail from "@/features/camp/ui/CampDetail";

export default async function CampPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  try {
    const id = (await params).id;
    const campData = await apiGetCampById(id);

    if (!campData) {
      notFound();
    }

    return <CampDetail campData={campData} />;
  } catch (error) {
    console.error("Failed to fetch camp data:", error);
    notFound();
  }
}

import { getCampById } from "@/features/camp/service/campService";
import CampDetail from "@/features/camp/ui/CampDetail";

export default async function CampPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;
  const campData = await getCampById(id);
  console.log(campData)
  return (
      <CampDetail campData={campData} />
  );
}

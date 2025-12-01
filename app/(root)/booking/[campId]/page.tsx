import { getCampById } from "@/features/camp/service/campService";
import BookingPage from "@/features/booking/ui/BookingPage";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ campId: number }>;
}) {
  const id = (await params).campId;
  const campData = await getCampById(id);

  return (
    <Suspense
      fallback={
        <div className="p-8 text-center">Loading booking details...</div>
      }
    >
      <BookingPage campData={campData} />
    </Suspense>
  );
}

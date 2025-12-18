import { Suspense } from "react";
import GalleryData from "./galleryData";
import GalleryPageSkeleton from "@/components/skeletons/GalleryPageSkeleton";

export default async function GalleryPage() {
  return (
    <section className="page-padding">
      <Suspense fallback={<GalleryPageSkeleton />}>
        <GalleryData />
      </Suspense>
    </section>
  );
}

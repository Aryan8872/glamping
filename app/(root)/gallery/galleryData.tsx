import { getAllGallery } from "@/lib/api/gallery";
import GalleryGrid from "./GalleryGrid";
const GalleryData = async () => {
  try {
    const galleryData = await getAllGallery();
    return <GalleryGrid galleryData={galleryData} />;
  } catch (error) {
    console.error("Gallery fetch failed:", error);
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-lg">
        <p className="text-gray-500 font-medium">
          Gallery temporary unavailable.
        </p>
      </div>
    );
  }
};

export default GalleryData;

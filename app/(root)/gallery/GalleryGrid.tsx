"use client";
import { motion } from "framer-motion";
import { GalleryItem } from "@/types/GalleryTypes";
import GalleryCard from "@/features/gallery/ui/GalleryCard";
import { gridContainerVariants } from "@/features/gallery/utils/galleryAnimations";

const GalleryGrid = ({ galleryData }: { galleryData: GalleryItem[] }) => {
  return (
    <>
      <motion.p
        className="font-bold uppercase tracking-[.3em] text-3xl text-black text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        GALLERY
      </motion.p>
      <motion.section
        variants={gridContainerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
      >
        {galleryData.map((gallery) => (
          <GalleryCard key={gallery.slug} gallery={gallery} />
        ))}
      </motion.section>
    </>
  );
};

export default GalleryGrid;

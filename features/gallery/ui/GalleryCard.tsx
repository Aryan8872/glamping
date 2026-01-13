"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { GalleryItem } from "@/types/GalleryTypes";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { buildImageUrl } from "@/lib/http/http";
import { gridSquareVariants } from "../utils/galleryAnimations";

interface GalleryCardProps {
  gallery: GalleryItem;
}

export default function GalleryCard({ gallery }: GalleryCardProps) {
  return (
    <Link
      href={`/gallery/${gallery.slug}`}
      className="group relative h-[400px] w-full overflow-hidden rounded-md"
    >
      <motion.div
        variants={gridSquareVariants}
        className="relative h-full rounded-md"
      >
        <ImageWithFallback
          src={
            gallery.coverImage
              ? buildImageUrl(gallery.coverImage)
              : "/placeholder.jpg"
          }
          alt={gallery.title}
          className="h-full w-full object-cover rounded-md"
          wrapperClassName="h-full w-full rounded-md"
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-80 rounded-md"></div>
        <div className="absolute bottom-0 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all ease-out duration-500 w-full px-4 pb-6 text-center text-white">
          <h3 className="text-lg font-bold uppercase tracking-wide mb-2">
            {gallery.title}
          </h3>
          <p className="text-sm opacity-90 leading-snug">{gallery.excerpt}</p>
        </div>
      </motion.div>
    </Link>
  );
}

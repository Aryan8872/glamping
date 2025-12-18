"use client";

import { getGallerybySlug } from "@/lib/api/gallery";
import { useEffect, useState } from "react";
import GalleryDetailSkeleton from "@/components/skeletons/GalleryDetailSkeleton";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { buildImageUrl, buildUrl } from "@/lib/http/http";

export default function GalleryDetail({ slug }: { slug: string }) {
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getGallerybySlug(slug);
        setItem(data);
      } catch (error) {
        console.error("Failed to fetch gallery item", error);
      } finally {
        setLoading(false);
      }
    }
    if (slug) {
      fetchData();
    }
  }, [slug]);

  if (loading) {
    return <GalleryDetailSkeleton />;
  }

  if (!item) {
    return (
      <div className="mx-auto w-[92%] max-w-[1200px] py-16">
        <h1 className="text-2xl font-semibold">Gallery item not found</h1>
      </div>
    );
  }

  return (
    <main className="py-10">
      <div className="mx-auto w-[92%] max-w-[1200px]">
        <h1 className="text-3xl font-extrabold text-emerald-700">
          {item.title}
        </h1>
        <p className="mt-2 text-gray-600">{item.description}</p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {item.images.map((src: string, i: number) => (
            <div
              key={i}
              className="relative w-full h-64 rounded-xl overflow-hidden"
            >
              <ImageWithFallback
                src={buildImageUrl(src)}
                alt={`${item.title}-${i}`}
                className="w-full h-full object-cover"
                wrapperClassName="w-full h-full"
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

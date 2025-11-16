"use client";
import { useMemo } from "react";
import { galleryData } from "../data";

export default function GalleryDetail({ params }: { params: { slug: string } }) {
  const item = useMemo(() => galleryData.find((g) => g.slug === params.slug), [params.slug]);

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
        <h1 className="text-3xl font-extrabold text-emerald-700">{item.title}</h1>
        <p className="mt-2 text-gray-600">{item.description}</p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {item.image.map((src, i) => (
            <img key={i} src={src} alt={`${item.title}-${i}`} className="w-full h-64 object-cover rounded-xl" />
          ))}
        </div>
      </div>
    </main>
  );
}

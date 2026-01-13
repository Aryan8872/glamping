"use client";

import Link from "next/link";
import { Camp } from "@/features/camp/types/CampTypes";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { buildImageUrl } from "@/lib/http/http";
import styles from "./story.module.css";

export default function StoryContent({ featuredCamp }: { featuredCamp: Camp }) {
  if (!featuredCamp) return null;

  return (
    <section className="bg-white py-10 sm:py-10">
      <div className="w-full grid lg:grid-cols-[1.1fr_.9fr] gap-8 items-center">
        <div>
          <h3 className="text-[.9rem] uppercase tracking-[.3em] text-gray-500">
            Featured
          </h3>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold">
            {featuredCamp.name}
          </h2>
          <p className="mt-3 text-gray-600 max-w-[60ch]">
            {featuredCamp.description?.slice(0, 150)}...
          </p>
          <div className="mt-6 flex gap-3">
            <Link href={`/camp/${featuredCamp.id}`}>
              <button className="rounded-xl bg-emerald-600 px-5 py-3 text-white font-semibold hover:bg-emerald-700">
                Book
              </button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {(featuredCamp.images || []).slice(0, 4).map((src, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-xl ${
                i === 0 ? "col-span-2 row-span-2 aspect-4/3" : "aspect-4/3"
              } ${styles.gpuCard}`}
            >
              <ImageWithFallback
                className="h-full w-full object-cover"
                wrapperClassName="h-full w-full"
                src={buildImageUrl(src)}
                alt="story"
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                loading="eager"
                priority
              />
            </div>
          ))}
          {featuredCamp.campHost && (
            <div className="col-span-2 sm:col-span-3 mt-2 flex items-center gap-3 rounded-xl border border-black/10 bg-white p-3 shadow-sm">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                {featuredCamp.campHost.fullName?.charAt(0) || "H"}
              </div>
              <div className="text-sm">
                <div className="font-semibold">
                  {featuredCamp.campHost.fullName}
                </div>
                <div className="text-gray-500">Adventure host</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

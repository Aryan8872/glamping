"use client";

import React from "react";
import Link from "next/link";
import { Experience } from "../types/ExperienceTypes";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { buildImageUrl } from "@/lib/http/http";
import styles from "./experience.module.css";

interface ExperienceListProps {
  experiences: Experience[];
}

export default function ExperienceList({
  experiences = [],
}: ExperienceListProps) {
  return (
    <section className="relative min-h-[60vh] pb-5 pt-10 sm:py-10 bg-white">
      <div className="w-full">
        <div className="mb-8 sm:text-center">
          <div className="text-2xl sm:text-3xl font-bold uppercase text-black">
            Browse by Experience
          </div>
          <h3 className="mt-2 text-gray-500 sm:mt-4 font-medium tracking-wide">
            Find the perfect camp for your adventure style
          </h3>
        </div>

        <div
          className={`flex flex-row ${styles.hideScrollbar} sm:grid sm:grid-cols-2 gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory lg:grid-cols-4`}
        >
          {experiences.map((exp) => (
            <article
              key={exp.id}
              className={`group relative snap-center shrink-0 w-[70vw] sm:w-auto min-h-[280px] overflow-hidden rounded-2xl border border-white/10 bg-[#11171b] cursor-pointer transition-transform hover:-translate-y-2 hover:scale-[1.02] duration-200 ease-out ${styles.gpuCard}`}
            >
              <Link href={`/search?experience=${exp.slug}`}>
                <ImageWithFallback
                  className="h-full w-full object-cover brightness-90"
                  wrapperClassName="h-full w-full aspect-[2/2]"
                  src={
                    exp.imageUrl
                      ? buildImageUrl(exp.imageUrl)
                      : "https://images.unsplash.com/photo-1504280390367-361c6d9838f4?q=80&w=800&auto=format&fit=crop"
                  }
                  alt={exp.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  loading="eager"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060a0c]/90" />
                <div className="absolute inset-x-4 bottom-11 z-10 flex-col text-center">
                  <div className="group/tour-title">
                    <div className="uppercase sm:text-xl text-white wrap-anywhere font-bold group-hover/tour-title:text-emerald-400">
                      {exp.title}
                    </div>
                    {exp.description && (
                      <div className="hidden lg:block opacity-0 line-clamp-4 group-hover:opacity-100 wrap-anywhere transition-all duration-200 ease-in-out text-sm mt-3 text-[#8ba1ab]">
                        {exp.description}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

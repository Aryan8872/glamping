"use client";

import Link from "next/link";
import { Adventure } from "../types/adventureTypes";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { buildImageUrl } from "@/lib/http/http";
import styles from "./adventure.module.css";

export default function AdventureCard({ data }: { data: Adventure[] }) {
  return (
    <section
      id="tours"
      className="relative min-h-[60vh] py-10 sm:py-10 bg-white"
    >
      <div className="w-full">
        <div className="mb-8 sm:text-center">
          <div className="text-2xl sm:text-3xl font-bold uppercase text-black">
            Popular Adventures
          </div>
          <h3 className="text-gray-500 mt-2 sm:mt-4 font-medium tracking-wide">
            There will be a small title here.
          </h3>
        </div>

        <div
          className={`flex flex-row overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:grid sm:grid-cols-2 gap-4 lg:grid-cols-4 ${styles.hideScrollbar}`}
        >
          {data.map((adventure, i) => (
            <article
              key={i}
              className={`group snap-center w-[70vw] shrink-0 sm:w-auto relative min-h-[280px] overflow-hidden rounded-2xl border border-white/10 bg-[#11171b] cursor-pointer transition-transform hover:-translate-y-2 hover:scale-[1.01] duration-200 ease-out ${styles.gpuCard}`}
            >
              <Link
                href={`/adventures/${adventure.slug}`}
                className="rounded-2xl"
              >
                <ImageWithFallback
                  className="h-full w-full object-cover brightness-90 rounded-2xl"
                  wrapperClassName="h-full w-full aspect-[2/2] rounded-2xl"
                  src={buildImageUrl(adventure.coverImage)}
                  alt={adventure.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  loading="eager"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060a0c]/90" />
                <div className="absolute inset-x-4 bottom-11 z-10 flex-col text-center">
                  <div className="group/tour-title">
                    <div className="uppercase sm:text-xl wrap-anywhere font-bold text-white group-hover/tour-title:text-emerald-400">
                      {adventure.name}
                    </div>
                    <div className="hidden lg:block opacity-0 group-hover:opacity-100 wrap-anywhere transition-all duration-200 ease-in-out text-sm mt-3 text-[#8ba1ab]">
                      {adventure.description}
                    </div>
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

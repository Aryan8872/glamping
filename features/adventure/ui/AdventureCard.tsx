"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Adventure } from "../types/adventureTypes";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { buildImageUrl } from "@/lib/http/http";
import styles from "./adventure.module.css";
export default function AdventureCard({ data }: { data: Adventure[] }) {
  const stagger = (delay = 0.1) => ({
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
  });
  const sharedTransition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
    mass: 1,
  };
  const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: sharedTransition },
  };

  return (
    <section
      id="tours"
      className="relative min-h-[60vh] px-3 md:px-9 py-10 sm:py-20 bg-white"
      style={{ contentVisibility: "auto", containIntrinsicSize: "800px" }}
    >
      <div className="w-full">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8 sm:text-center"
          variants={stagger(0.1)}
        >
          <motion.div
            variants={fadeInUp}
            className="text-2xl sm:text-3xl font-bold uppercase  text-black"
          >
            Popular Adventures
          </motion.div>
          <motion.h3
            variants={fadeInUp}
            className="text-gray-500 mt-2 sm:mt-4 font-medium tracking-wide"
          >
            There will be a small title here.
          </motion.h3>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger(0.15)}
          className={`flex flex-row overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:grid sm:grid-cols-2 gap-4 lg:grid-cols-4 ${styles.hideScrollbar}`}
        >
          {data.map((adventure, i) => (
            <motion.article
              key={i}
              variants={fadeInUp}
              whileHover={{
                y: -7,
                scale: 1.01,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              className="group snap-center w-[70vw] shrink-0 sm:w-auto relative min-h-[280px] overflow-hidden  rounded-2xl border border-white/10 bg-[#11171b] cursor-pointer transform-gpu"
              style={{ willChange: "transform" }}
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
                />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#060a0c]/90" />
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
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

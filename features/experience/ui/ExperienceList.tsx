"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Experience } from "../types/ExperienceTypes";

interface ExperienceListProps {
  experiences: Experience[];
}

export default function ExperienceList({ experiences }: ExperienceListProps) {
  const stagger = (delay = 0.1) => ({
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
  });
  const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      className="relative min-h-[60vh] px-3 md:px-9 py-10 sm:py-20 bg-white"
      style={{ contentVisibility: "auto", containIntrinsicSize: "800px" }}
    >
      <div className="w-full">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8 text-center"
          variants={stagger(0.1)}
        >
          <motion.div
            variants={fadeInUp}
            className="text-3xl font-bold uppercase  text-black"
          >
            Browse by Experience
          </motion.div>
          <motion.h3
            variants={fadeInUp}
            className="mt-4 font-medium tracking-wide"
          >
            Find the perfect camp for your adventure style
          </motion.h3>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger(0.15)}
          className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
        >
          {experiences.map((exp, i) => (
            <motion.article
              key={exp.id}
              variants={fadeInUp}
              whileHover={{
                y: -10,
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
              }}
              className="group relative min-h-[280px] overflow-hidden rounded-2xl border border-white/10 bg-[#11171b] cursor-pointer transform-gpu"
              style={{ willChange: "transform" }}
            >
              <Link href={`/search?experience=${exp.slug}`}>
                <img
                  className="h-full w-full object-cover aspect-[2/4] sm:aspect-[2/2] xl:aspect-[2/3] brightness-90"
                  src={
                    exp.imageUrl
                      ? `${
                          process.env.NEXT_PUBLIC_RESOLVED_API_BASE_URL ||
                          "http://localhost:8080"
                        }${exp.imageUrl.startsWith("/") ? "" : "/"}${
                          exp.imageUrl
                        }`
                      : "https://images.unsplash.com/photo-1504280390367-361c6d9838f4?q=80&w=800&auto=format&fit=crop"
                  }
                  alt={exp.title}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#060a0c]/90" />
                <div className="absolute inset-x-4 bottom-11 z-10 flex-col text-center">
                  <div className="group/tour-title">
                    <div className="uppercase text-xl text-white wrap-anywhere font-bold group-hover/tour-title:text-emerald-400">
                      {exp.title}
                    </div>
                    {exp.description && (
                      <div className="opacity-0 text-white group-hover:opacity-100 wrap-anywhere transition-all duration-200 ease-in-out text-sm mt-3 text-[#8ba1ab]">
                        {exp.description}
                      </div>
                    )}
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

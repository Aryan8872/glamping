"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Destination } from "../types/DestinationTypes";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { buildImageUrl } from "@/lib/http/http";

export function PopularRegionsExpandable({ data }: { data: Destination[] }) {
  const [active, setActive] = useState<Destination | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  const sharedTransition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
    mass: 1,
  };

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 h-full w-full z-50 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-[100] px-4">
            <motion.button
              key={`button-${active.id}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-4 right-4 items-center justify-center bg-white dark:bg-neutral-800 rounded-full h-8 w-8 shadow-lg z-[110]"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              transition={sharedTransition}
              className="w-full max-w-[600px] h-fit max-h-[90vh] flex flex-col bg-white dark:bg-neutral-900 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="relative overflow-hidden">
                <motion.div
                  layoutId={`image-${active.id}-${id}`}
                  transition={sharedTransition}
                >
                  <ImageWithFallback
                    src={active.imageUrl ? buildImageUrl(active.imageUrl) : ""}
                    alt={active.name}
                    width={600}
                    height={400}
                    className="w-full h-[350px] object-cover"
                  />
                </motion.div>
                {/* Entrance slider effect */}
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 bg-white/20 z-10 pointer-events-none"
                />
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.id}-${id}`}
                      transition={sharedTransition}
                      className="font-bold text-3xl text-neutral-800 dark:text-neutral-200"
                    >
                      {active.name}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.id}-${id}`}
                      transition={sharedTransition}
                      className="text-neutral-500 dark:text-neutral-400 text-lg"
                    >
                      Popular Destination
                    </motion.p>
                  </div>

                  <motion.button
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ delay: 0.1 }}
                    className="px-6 py-3 text-sm rounded-full font-bold bg-primary-green hover:bg-green-600 text-white transition-colors"
                  >
                    Explore Now
                  </motion.button>
                </div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <div className="text-neutral-600 dark:text-neutral-300 text-base leading-relaxed max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                    {active.description ||
                      "Experience the hidden beauty of this magnificent region. From breath-taking landscapes to unique local culture, there is something for every adventurer here."}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <section className="w-full bg-white dark:bg-neutral-950 py-5 sm:py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Content */}
            <div className="flex flex-col gap-6 lg:sticky lg:top-24">
              <h2 className="text-2xl sm:text-3xl font-bold uppercase text-black  dark:text-white leading-tight">
                We Spotted Our <br />
                <span className="text-primary-green">
                  Popular Locations
                </span>{" "}
                <br />
                for You
              </h2>
              <p className="text-neutral-500 text-lg leading-relaxed max-w-xl">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Aperiam, eveniet! Quae similique numquam aut itaque odio eius.
                Labore veniam nulla non odit laborum perspiciatis, commodi
                blanditiis eligendi, quis officia veritatis!
              </p>
              <div className="mt-4 flex items-center gap-4 text-primary-green font-semibold cursor-pointer group">
                Check all destinations
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </div>
            </div>

            {/* Right List - The Expandable Items */}
            <div className="flex flex-col gap-4 transform-gpu">
              {data.slice(0, 6).map((card) => (
                <div key={card.id} className="relative group">
                  <motion.div
                    layoutId={`card-${card.id}-${id}`}
                    transition={sharedTransition}
                    className="absolute inset-0 bg-neutral-50 dark:bg-neutral-900 rounded-3xl"
                  />

                  <div
                    onClick={() => setActive(card)}
                    className="relative z-10 flex items-center justify-between p-6 cursor-pointer border border-transparent hover:border-primary-green/10 rounded-3xl transition-all duration-300 transform-gpu"
                  >
                    <div className="flex items-center gap-6">
                      <motion.div
                        layoutId={`image-${card.id}-${id}`}
                        transition={sharedTransition}
                        className="relative h-20 w-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm transform-gpu"
                        style={{ willChange: "transform" }}
                      >
                        <ImageWithFallback
                          src={
                            card.imageUrl ? buildImageUrl(card.imageUrl) : ""
                          }
                          alt={card.name}
                          fill
                          className="object-cover"
                        />
                      </motion.div>

                      <div>
                        <motion.h3
                          layoutId={`title-${card.id}-${id}`}
                          transition={sharedTransition}
                          className="font-bold text-xl text-neutral-800 dark:text-neutral-100 mb-1 transform-gpu"
                        >
                          {card.name}
                        </motion.h3>
                        <motion.p
                          layoutId={`description-${card.id}-${id}`}
                          transition={sharedTransition}
                          className="text-neutral-500 dark:text-neutral-400 text-sm transform-gpu"
                        >
                          Explore regional camping spots
                        </motion.p>
                      </div>
                    </div>

                    <div className="h-10 w-10 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center shadow-sm group-hover:bg-primary-green group-hover:text-white transition-all duration-300 transform-gpu">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black dark:text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
};

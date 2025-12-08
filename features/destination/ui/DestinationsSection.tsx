"use client";

import Image from "next/image";
import { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { Destination } from "../types/DestinationTypes";
import { motion, AnimatePresence } from "framer-motion";

export default function DestinationsSection({ data }: { data: Destination[] }) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const displayDestinations = data.slice(0, 6);

  const toggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="w-full bg-white min-h-[95vh] mt-10">
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-10 px-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-semibold text-gray-900 wrap-anywhere">
            We Spotted Our Popular Locations for You
          </h2>
          <p className="text-gray-500 mt-2 wrap-anywhere">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam, eveniet!
            Quae similique numquam aut itaque odio eius. Labore veniam nulla non odit
            laborum perspiciatis, commodi blanditiis eligendi, quis officia veritatis!
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {displayDestinations.map((dest) => {
            const isExpanded = expandedId === dest.id;
            return (
              <div
                key={dest.id}
                className="flex flex-col max-h-[450px] border-b border-t border-gray-200 py-2"
              >
                <div onClick={() => toggle(dest.id)} className="flex cursor-pointer justify-between items-center cursor-pointer">
                  <span className="font-semibold capitalize text-lg">{dest.name}</span>
                  {isExpanded ? (
                    <BiMinus
                      className="text-white text-xl rounded-full bg-primary-green p-1"
                      
                    />
                  ) : (
                    <BiPlus
                      className="text-white text-xl rounded-full bg-primary-green p-1"
                    />
                  )}
                </div>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ transformOrigin: "top" }}
                      className="flex flex-col gap-3 overflow-hidden mt-2"
                    >
                      <p className="text-gray-500">{dest.description}</p>
                      <div className="w-full aspect-[16/9] h-[250px] rounded-lg relative">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_RESOLVED_API_BASE_URL}${dest.imageUrl}`}
                          alt={dest.name}
                          fill
                          className="rounded-lg object-cover"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

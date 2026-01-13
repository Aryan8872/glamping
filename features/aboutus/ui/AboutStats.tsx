"use client";
import { motion } from "framer-motion";
import { scaleIn, stagger } from "../utils/aboutAnimations";

interface StatItem {
  value: string;
  heading: string;
}

interface AboutStatsProps {
  stats: StatItem[];
}

export default function AboutStats({ stats }: AboutStatsProps) {
  return (
    <motion.div
      className="w-full p-3 rounded-md"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={stagger}
    >
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats?.map((stat, i) => (
          <motion.div
            key={i}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
            variants={scaleIn}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="text-3xl font-semibold text-emerald-700">
              {stat.value}
            </div>
            <div className="mt-3 text-sm text-gray-700">{stat.heading}</div>
          </motion.div>
        )) || <div>No stats available</div>}
      </div>
    </motion.div>
  );
}

"use client";
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = (delay = 0.08) => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
});

export default function HeroSearch() {
  return (
    <section className="relative bg-white">
      <div className="mx-auto w-[92%] max-w-[1100px] py-10">
        <motion.div initial="hidden" animate="visible" variants={stagger(0.05)} className="rounded-2xl border border-black/10 bg-white shadow-[0_10px_30px_rgba(0,0,0,.06)] px-5 sm:px-8 py-6">
          <motion.h1 variants={fadeInUp} className="text-2xl sm:text-3xl font-bold tracking-tight">
            Find your adventure with Glamping Himalayas
          </motion.h1>
          <motion.div variants={fadeInUp} className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_.9fr] gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500">Where</label>
              <input className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Search destination" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500">Check in</label>
              <input type="date" className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500">Check out</label>
              <input type="date" className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500">Guests</label>
              <select className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500">
                {Array.from({ length: 8 }).map((_, i) => (
                  <option key={i}>{i + 1} guest{i ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </motion.div>
          <motion.div variants={fadeInUp} className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Trustpilot_Logo_%282022%29.svg" alt="Trustpilot" className="h-5" />
              <span>4.8/5 on 5,000+ reviews</span>
            </div>
            <button className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700">Search</button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

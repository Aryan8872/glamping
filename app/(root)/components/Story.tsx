"use client";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = (delay = 0.08) => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: delay } },
});

export default function Story() {
  return (
    <section className="bg-white py-14">
      <div className="w-full grid lg:grid-cols-[1.1fr_.9fr] gap-8 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger(0.05)}
        >
          <motion.h3
            variants={fadeInUp}
            className="text-[.9rem] uppercase tracking-[.3em] text-gray-500"
          >
            Featured
          </motion.h3>
          <motion.h2
            variants={fadeInUp}
            className="mt-2 text-3xl sm:text-4xl font-extrabold"
          >
            Join an adventure with Sine Fuglsang at Yggdrasil Igloo
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-3 text-gray-600 max-w-[60ch]"
          >
            A curated nature escape with sauna, cold plunge and a private chef.
            Discover a quiet shoreline and snow-kissed granite outcrops.
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-6 flex gap-3">
            <button className="rounded-xl bg-emerald-600 px-5 py-3 text-white font-semibold hover:bg-emerald-700">
              Book 6-8
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger(0.05)}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3"
        >
          {[
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1549877452-9adc7f34b407?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1200&auto=format&fit=crop",
          ].map((src, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className={`overflow-hidden rounded-xl ${
                i === 0 ? "col-span-2 row-span-2 aspect-4/3" : "aspect-4/3"
              }`}
            >
              <img
                className="h-full w-full object-cover"
                src={src}
                alt="story"
                loading="lazy"
              />
            </motion.div>
          ))}
          <motion.div
            variants={fadeInUp}
            className="col-span-2 sm:col-span-3 mt-2 flex items-center gap-3 rounded-xl border border-black/10 bg-white p-3 shadow-sm"
          >
            <img
              className="h-10 w-10 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=200&auto=format&fit=crop"
              alt="host"
            />
            <div className="text-sm">
              <div className="font-semibold">Sine Fuglsang Christensen</div>
              <div className="text-gray-500">
                Adventure host since 2024 • 4.9/5 on Campanyon
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

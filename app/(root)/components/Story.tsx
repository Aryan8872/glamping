import { motion } from "framer-motion";
import { apiSearchCamps } from "@/features/camp/api/campApi";
import Link from "next/link";
import { Camp } from "@/features/camp/types/CampTypes";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = (delay = 0.08) => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: delay } },
});

export default async function Story() {
  let featuredCamp: Camp | undefined;
  try {
    const result = await apiSearchCamps({ isFeatured: true, limit: 1 });
    featuredCamp = result.data[0];
  } catch (error) {
    console.error("Failed to fetch featured camp for Story:", error);
    return null;
  }

  if (!featuredCamp) return null;

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
            {featuredCamp.name}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-3 text-gray-600 max-w-[60ch]"
          >
            {featuredCamp.description?.slice(0, 150)}...
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-6 flex gap-3">
            <Link href={`/camp/${featuredCamp.id}`}>
              <button className="rounded-xl bg-emerald-600 px-5 py-3 text-white font-semibold hover:bg-emerald-700">
                Book
              </button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger(0.05)}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3"
        >
          {(featuredCamp.images || []).slice(0, 4).map((src, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className={`overflow-hidden rounded-xl ${
                i === 0 ? "col-span-2 row-span-2 aspect-4/3" : "aspect-4/3"
              }`}
            >
              <img
                className="h-full w-full object-cover"
                src={`${process.env.NEXT_PUBLIC_RESOLVED_API_BASE_URL}${src}`}
                alt="story"
                loading="lazy"
              />
            </motion.div>
          ))}
          {featuredCamp.campHost && (
            <motion.div
              variants={fadeInUp}
              className="col-span-2 sm:col-span-3 mt-2 flex items-center gap-3 rounded-xl border border-black/10 bg-white p-3 shadow-sm"
            >
              {/* Simplified host display */}
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                {featuredCamp.campHost.fullName?.charAt(0) || "H"}
              </div>
              <div className="text-sm">
                <div className="font-semibold">
                  {featuredCamp.campHost.fullName}
                </div>
                <div className="text-gray-500">Adventure host</div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

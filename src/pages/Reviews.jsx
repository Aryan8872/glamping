import { motion } from 'framer-motion'

const fadeInUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

const REVIEWS = [
  { name: 'Alyssa', rating: 5, text: 'Incredible trek. Guides were kind and the views unreal.', date: 'Aug 2025' },
  { name: 'Dev', rating: 4, text: 'Smooth logistics and cozy lodges. Would recommend!', date: 'Jun 2025' },
  { name: 'Lara', rating: 5, text: 'Felt safe throughout. The sunrise hike was magical.', date: 'May 2025' },
  { name: 'Marco', rating: 4, text: 'Beautiful itinerary. Could spend more time at the lake.', date: 'Apr 2025' },
]

export default function Reviews() {
  return (
    <main className="px-[4%] pt-6">
      <div className="mx-auto max-w-[1100px]">
        <h1 className="text-3xl font-extrabold uppercase text-[#3de0d5]">Reviews</h1>
        <p className="mt-2 max-w-[70ch] text-[#8ba1ab]">What travelers say about us.</p>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {REVIEWS.map((r) => (
            <motion.article key={r.name} variants={fadeInUp} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{r.name}</div>
                <div className="text-xs text-[#8ba1ab]">{r.date}</div>
              </div>
              <div className="mt-1 text-[#3de0d5]">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</div>
              <p className="mt-2 text-[#d7e0e7]">{r.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </main>
  )
}

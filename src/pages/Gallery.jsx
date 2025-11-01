import { motion } from 'framer-motion'

const fadeInUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }

const IMAGES = [
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1887&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1887&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1887&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1974&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1482192505345-5655af888cc4?q=80&w=1887&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1887&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1932&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500530855697-3a73f1bc3af7?q=80&w=1887&auto=format&fit=crop',
]

export default function Gallery() {
  return (
    <main className="px-[4%] pt-6">
      <div className="mx-auto max-w-[1200px]">
        <h1 className="text-3xl font-extrabold uppercase text-[#3de0d5]">Gallery</h1>
        <p className="mt-2 max-w-[70ch] text-[#8ba1ab]">Scenes from our favorite destinations. Click tiles to peek closer.</p>
      </div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mx-auto mt-6 grid max-w-[1200px] grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {IMAGES.map((src, i) => (
          <motion.figure key={src} variants={fadeInUp} whileHover={{ y: -4 }} className="relative overflow-hidden rounded-xl border border-white/10 bg-[#11171b]">
            <img src={src} alt="Scenic" className="h-40 w-full object-cover md:h-48" />
            <figcaption className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
          </motion.figure>
        ))}
      </motion.div>
    </main>
  )
}

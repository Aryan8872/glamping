import { motion } from 'framer-motion'

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

const TOURS = [
  { title: 'Alpine Sunrise', days: 3, price: 299, img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1887&auto=format&fit=crop', level: 'Easy', region: 'Alps' },
  { title: 'High Ridge Trek', days: 5, price: 549, img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1887&auto=format&fit=crop', level: 'Moderate', region: 'Rockies' },
  { title: 'Emerald Falls', days: 2, price: 199, img: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1887&auto=format&fit=crop', level: 'Easy', region: 'Pacific' },
  { title: "Glacier Vista", days: 4, price: 429, img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1887&auto=format&fit=crop', level: 'Hard', region: 'Patagonia' },
  { title: 'Lakes & Pines', days: 3, price: 319, img: 'https://images.unsplash.com/photo-1482192505345-5655af888cc4?q=80&w=1887&auto=format&fit=crop', level: 'Moderate', region: 'Nordic' },
  { title: 'Canyon Light', days: 2, price: 229, img: 'https://images.unsplash.com/photo-1500530855697-3a73f1bc3af7?q=80&w=1887&auto=format&fit=crop', level: 'Easy', region: 'Desert' },
]

export default function Tours() {
  return (
    <main className="px-[4%] pt-6">
      {/* Header */}
      <div className="mx-auto max-w-[1200px]">
        <h1 className="text-3xl font-extrabold uppercase text-[#3de0d5]">Tours</h1>
        <p className="mt-2 max-w-[70ch] text-[#8ba1ab]">Choose from curated tours across mountains, forests and lakes. Filter by region, difficulty and duration.</p>
      </div>

      {/* Filters */}
      <div className="mx-auto mt-6 max-w-[1200px] rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="grid gap-3 md:grid-cols-4">
          <input className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 placeholder:text-[#8ba1ab]" placeholder="Search tours" />
          <select className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90">
            <option>All Regions</option>
            <option>Alps</option>
            <option>Rockies</option>
            <option>Nordic</option>
            <option>Patagonia</option>
          </select>
          <select className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90">
            <option>All Levels</option>
            <option>Easy</option>
            <option>Moderate</option>
            <option>Hard</option>
          </select>
          <select className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90">
            <option>Any Duration</option>
            <option>1-2 days</option>
            <option>3-4 days</option>
            <option>5+ days</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <motion.div initial="hidden" animate="visible" variants={stagger} className="mx-auto mt-6 grid max-w-[1200px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOURS.map((t) => (
          <motion.article key={t.title} variants={fadeInUp} whileHover={{ y: -6 }} className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#11171b]">
            <img src={t.img} alt={t.title} className="h-48 w-full object-cover" />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">{t.title}</h3>
                <span className="rounded-md bg-[#3de0d5]/15 px-2 py-1 text-xs text-[#3de0d5]">{t.level}</span>
              </div>
              <div className="mt-1 text-sm text-[#8ba1ab]">{t.days} days • {t.region}</div>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-[#3de0d5] font-extrabold">${t.price}</div>
                <button className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm backdrop-blur hover:border-[#3de0d5]">View details</button>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </main>
  )
}

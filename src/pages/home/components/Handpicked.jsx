import { motion } from 'framer-motion'

const fadeInUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}
const stagger = (delay = 0.08) => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: delay } },
})

export default function Handpicked() {
  const items = [
    { title: 'Lakefront cabin', img: 'https://images.unsplash.com/photo-1523419409543-01f4212b3c47?q=80&w=1200&auto=format&fit=crop' },
    { title: 'A-frame escape', img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop' },
    { title: 'Forest barrel sauna', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop' },
    { title: 'Clifftop yurt', img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop' },
  ]

  return (
    <section className="bg-white py-12">
      <div className="mx-auto w-[92%] max-w-[1200px]">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Handpicked adventures</h2>
          <a className="text-emerald-700 font-semibold hover:underline" href="#">See all</a>
        </div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger(0.05)} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it, i)=> (
            <motion.article key={i} variants={fadeInUp} className="group rounded-2xl overflow-hidden border border-black/10 bg-white shadow-sm">
              <div className="aspect-4/3 overflow-hidden">
                <img src={it.img} alt={it.title} className="h-full w-full object-cover group-hover:scale-[1.03] transition duration-300" loading="lazy"/>
              </div>
              <div className="p-4">
                <div className="font-semibold">{it.title}</div>
                <button className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:underline">See details →</button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

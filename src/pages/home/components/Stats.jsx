import { motion } from 'framer-motion'

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = (delay = 0.1) => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
})


const Stats = () => {
    return (
        <section className="py-14 min-h-[40vh] bg-primary-black">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger(0.08)} className="mx-auto grid w-[92%] max-w-[1200px] grid-cols-2 gap-6 rounded-2xl border border-white/10 bg-white/5 p-8 text-center md:grid-cols-4">
          {[
            ['120+', 'Destinations'],
            ['8k', 'Happy Travelers'],
            ['350', 'Guided Tours'],
            ['24/7', 'Support'],
          ].map(([a, b]) => (
            <motion.div key={b} variants={fadeInUp}>
              <div className="text-3xl font-extrabold text-[#3de0d5]">{a}</div>
              <div className="mt-1 text-sm text-[#8ba1ab]">{b}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    )
}
export default Stats

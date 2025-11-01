import { motion } from 'framer-motion'

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }

export default function About() {
  return (
    <main className="pt-28">
      <section className="mx-auto w-[92%] max-w-[1100px]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h1 variants={fadeInUp} className="text-4xl font-extrabold uppercase text-[#3de0d5]">About Us</motion.h1>
          <motion.p variants={fadeInUp} className="mt-3 max-w-[70ch] text-[#8ba1ab]">
            We are a boutique travel studio crafting immersive experiences in mountains, forests, and pristine lakes. Our guides, planners,
            and photographers ensure every journey is safe, stunning, and unforgettable.
          </motion.p>
        </motion.div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {["Safety first","Sustainable trips","Local expertise"].map((t,i)=> (
            <motion.div key={t} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.05}}
              className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-3 h-8 w-8 rounded-md bg-[#3de0d5]/20" />
              <div className="font-semibold">{t}</div>
              <p className="mt-1 text-sm text-[#8ba1ab]">Thoughtful standards that mirror our love for nature.</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}

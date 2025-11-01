import { motion } from 'framer-motion'
import Hero from './components/Hero'
import PopularTours from './components/PopularTours'
import Discover from './components/Discover'
import Services from './components/Services'
import Stats from './components/Stats'

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = (delay = 0.1) => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
})


export default function Home() {

  return (
    <>
      {/* Hero */}
      <Hero/>

      {/* Popular Tours */}
      <PopularTours/>

      {/* Discover */}
      <Discover/>

      {/* Services */}
      <Services/>

      {/* Stats */}
      <Stats/>

      {/* Newsletter */}
      <section id="contact" className="bg-[#0e1418] py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger(0.12)} className="mx-auto w-[92%] max-w-[900px] text-center">
          <motion.h3 variants={fadeInUp} className="text-2xl font-extrabold">Get trip ideas in your inbox</motion.h3>
          <motion.p variants={fadeInUp} className="mx-auto mt-2 max-w-[60ch] text-[#8ba1ab]">Subscribe for weekly guides and exclusive offers.</motion.p>
          <motion.form variants={fadeInUp} className="mx-auto mt-5 flex max-w-[560px] gap-3">
            <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-[#8ba1ab]" placeholder="Your email" />
            <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="rounded-xl bg-[#3de0d5] px-5 font-semibold text-[#062a27] hover:brightness-105">Subscribe</motion.button>
          </motion.form>
        </motion.div>
      </section>
    </>
  )
}

import { motion } from 'framer-motion'

const fadeInUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

export default function Contact() {
  return (
    <main className="px-[4%] pt-6">
      <div className="mx-auto max-w-[900px] text-center">
        <h1 className="text-3xl font-extrabold uppercase text-[#3de0d5]">Contact</h1>
        <p className="mx-auto mt-2 max-w-[60ch] text-[#8ba1ab]">Have questions about a tour or need a custom itinerary? Send us a message.</p>

        <motion.form initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mx-auto mt-6 grid gap-3 sm:grid-cols-2">
          <motion.input variants={fadeInUp} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-[#8ba1ab]" placeholder="Full name" />
          <motion.input variants={fadeInUp} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-[#8ba1ab]" placeholder="Email" />
          <motion.input variants={fadeInUp} className="sm:col-span-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-[#8ba1ab]" placeholder="Subject" />
          <motion.textarea variants={fadeInUp} rows={6} className="sm:col-span-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-[#8ba1ab]" placeholder="Your message" />
          <motion.button variants={fadeInUp} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="sm:col-span-2 rounded-xl bg-[#3de0d5] px-5 py-3 font-semibold text-[#062a27] hover:brightness-105">Send message</motion.button>
        </motion.form>

        <div className="mx-auto mt-10 grid max-w-[900px] gap-4 md:grid-cols-3">
          {[['Email','hello@flash.travel'],['Phone','(+1) 555-0110'],['Location','Estes Park, CO']].map(([k,v]) => (
            <div key={k} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left">
              <div className="text-sm text-[#8ba1ab]">{k}</div>
              <div className="mt-1 font-semibold">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

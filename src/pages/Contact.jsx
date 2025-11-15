import { motion } from 'framer-motion'

const fadeInUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

export default function Contact() {
  return (
    <main className="py-10">
      <div className="mx-auto w-[92%] max-w-[1200px]">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-emerald-700">Get in Touch with Us</h1>
          <p className="mx-auto mt-3 max-w-[75ch] text-gray-600">Have questions about our outdoor adventures or planning your next getaway? We’re here to help! Reach out for any inquiries, rental assistance, or adventure advice.</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          {/* Left: Form Card */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <motion.h3 variants={fadeInUp} className="text-xl font-bold text-gray-800">Have Questions? We're Just a Message Away!</motion.h3>
            <motion.p variants={fadeInUp} className="mt-1 text-sm text-gray-500">Fill out the form below, and one of our team members will get back to you shortly.</motion.p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <motion.div variants={fadeInUp}>
                <label className="mb-1 block text-xs font-semibold text-gray-600">First Name</label>
                <input className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none placeholder:text-gray-400" placeholder="First name" />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <label className="mb-1 block text-xs font-semibold text-gray-600">Last Name</label>
                <input className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none placeholder:text-gray-400" placeholder="Last name" />
              </motion.div>
              <motion.div variants={fadeInUp} className="sm:col-span-2">
                <label className="mb-1 block text-xs font-semibold text-gray-600">E-mail</label>
                <input className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none placeholder:text-gray-400" placeholder="you@gmail.com" />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <label className="mb-1 block text-xs font-semibold text-gray-600">Phone Number</label>
                <input className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none placeholder:text-gray-400" placeholder="(+977) 98xxxxxxxx" />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <label className="mb-1 block text-xs font-semibold text-gray-600">Subject</label>
                <select className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none text-gray-700">
                  <option>Choose message subject</option>
                  <option>Booking inquiry</option>
                  <option>Custom itinerary</option>
                  <option>Partnership</option>
                </select>
              </motion.div>
              <motion.div variants={fadeInUp} className="sm:col-span-2">
                <label className="mb-1 block text-xs font-semibold text-gray-600">Message</label>
                <textarea rows={6} className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none placeholder:text-gray-400" placeholder="Leave us a message..." />
              </motion.div>
              <motion.div variants={fadeInUp} className="sm:col-span-2">
                <button className="w-full sm:w-auto rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700">Send Message ↗</button>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Banner + Info Cards */}
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-2xl bg-emerald-700 text-white">
              <img src="https://images.unsplash.com/photo-1608270586620-248524c67de2?q=80&w=1440&auto=format&fit=crop" alt="support" className="absolute inset-0 h-full w-full object-cover opacity-20" />
              <div className="relative p-6">
                <div className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1 text-sm">Thrilliz</div>
                <div className="mt-4 text-2xl font-extrabold leading-snug">Our experts will always help you</div>
              </div>
            </div>

            <div className="space-y-4">
              {[{
                title:'Email',desc:'support@glampinghimalayas.com',icon:'✉'
              },{
                title:'Call',desc:'+1 (800) 555-1234',icon:'☎'
              },{
                title:'Address',desc:'123 Adventure Lane, Suite 100, Boulder, CO 80301',icon:'📍'
              },{
                title:'Working Hours',desc:'Mon–Fri: 9:00 AM – 6:00 PM (PST)',icon:'🗓'
              }].map((it,i)=> (
                <div key={i} className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-50 text-emerald-700 text-lg">{it.icon}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{it.title}</div>
                    <div className="text-sm text-gray-600">{it.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

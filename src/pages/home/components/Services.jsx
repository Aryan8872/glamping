import { motion } from 'framer-motion'
import { Parallax } from 'react-parallax'

const Services = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    }

    const stagger = (delay = 0.1) => ({
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
    })

    return (
        <Parallax bgImage='/images/services_bg.jpg' strength={100}  bgImageStyle={{backgroundPosition: "top", backgroundSize: "cover"}}>
            <section className="min-h-screen relative  py-20">
                <motion.div className="absolute inset-0 z-10 bg-black/20" />

                <div className="relative mx-auto z-20 w-[92%] max-w-[1200px]">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10 text-center" variants={stagger(0.1)}>
                        <motion.div variants={fadeInUp} className="text-[.8rem] text-4xl md:text-5xl font-extrabold uppercase tracking-[.3em] text-white">Services</motion.div>
                        <motion.h3 variants={fadeInUp} className="mt-2 text-xl sm:text-base font-extrabold">What we offer</motion.h3>
                    </motion.div>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger(0.12)} className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {["Custom Itineraries", "Lodge Booking", "Mountain Guides"].map((t, i) => (
                            <motion.div key={i} variants={fadeInUp} whileHover={{ y: -4 }} className="rounded-2xl shadow-md border border-white/10 bg-white/10 p-6">
                                <div className="mb-3 h-8 w-8 rounded-md bg-[#3de0d5]/20" />
                                <div className="font-bold text-lg">{t}</div>
                                <p className="mt-1 text-sm text-white font-medium">We tailor every trip to your style with premium support.</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </Parallax>
    )
}
export default Services
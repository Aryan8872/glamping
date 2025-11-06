import { motion, useScroll, useTransform } from 'framer-motion'
import { Parallax } from "react-parallax"

const Hero = () => {
    const stagger = (delay = 0.1) => ({
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
    })
    const fadeInUp = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    }
    return (
        <Parallax bgImage='/images/hero_bg.jpg' strength={800}>
            <section className={`relative grid min-h-screen items-end `}>
                {/* <motion.div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_15%_35%,rgba(61,224,213,.18),transparent_50%),linear-gradient(180deg,rgba(10,15,18,.6)_0%,rgba(10,15,18,.85)_60%,#0a0f12_100%)]" /> */}

                <div className="absolute top-0  translate-x-1/2 right-1/2 w-[92%] max-w-[1200px] pb-[8vh] pt-[20vh] sm:pt-[32vh]">
                    <div className="grid grid-cols-1  gap-12 lg:grid-cols-[1.1fr_.6fr]">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={stagger(0.2)}>
                            <motion.h1 variants={fadeInUp} className="text-[clamp(2.4rem,5vw,4.2rem)] font-extrabold uppercase leading-tight text-black">
                                glampinghimalays
                            </motion.h1>
                            <motion.p variants={fadeInUp} className="mt-4 max-w-[58ch] text-black">
                                Luxury under Himalayan skies — serene pine, glacier air, and crafted comfort where the mountains meet your tent.
                            </motion.p>

                            <motion.div variants={stagger(0.2)} className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                {[
                                    ['Experienced Guides', 'High safety standards'],
                                    ['Small Groups', 'Intimate experiences'],
                                    ['Flexible Dates', 'Plan your time'],
                                    ['24/7 Support', 'We’re always here'],
                                ].map(([t, s], i) => (
                                    <motion.div key={i} variants={fadeInUp} whileHover={{ y: -3 }} className="flex items-start gap-3 rounded-xl border shadow-lg border-white/10 bg-white/5 p-4">
                                        <span className="mt-1 h-2 w-2 rounded-full bg-(--accent)" />

                                        <div>
                                            <h4 className="m-0 text-[0.95rem] text-black font-semibold">{t}</h4>
                                            <p className="m-0 mt-1 text-sm text-black">{s}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                        <div className="flex flex-col items-end gap-2 pr-1 lg:items-end">
                            {['01', '02', '03'].map((n, i) => (
                                <motion.div
                                    key={n}
                                    className={
                                        'relative font-bold ' +
                                        (i === 2
                                            ? 'text-white after:absolute after:-right-3 after:top-1/2 after:h-1.5 after:w-1.5 after:-translate-y-1/2 after:rounded-full after:bg-(--accent) after:shadow-[0_0_0_6px_rgba(47,115,101,.16)]'
                                            : 'text-[#5e767e] opacity-60')
                                    }
                                    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                >
                                    {n}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </Parallax>

    )
}
export default Hero
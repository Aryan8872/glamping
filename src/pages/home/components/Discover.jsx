import { motion, useScroll, useTransform } from 'framer-motion'
import { Parallax } from 'react-parallax'


const Discover = () => {
    const thumbs = [
        'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1887&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1500530855697-3a73f1bc3af7?q=80&w=1887&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1887&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1482192505345-5655af888cc4?q=80&w=1887&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1974&auto=format&fit=crop',
    ]
    const fadeInUp = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    }

    const stagger = (delay = 0.1) => ({
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
    })

    function BadgePlay() {
        return (
            <motion.span whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur px-3 py-2 text-sm text-white/90 shadow-[0_8px_24px_rgba(47,115,101,.18)]">
                <span className="mr-2 inline-block h-0 w-0 border-y-6 border-l-8 border-y-transparent border-l-(--accent)" />
                Watch the video
            </motion.span>
        )
    }
    return (
        <Parallax bgImage='/images/third.jpg' strength={150} bgImageStyle={{ willChange: 'transform' }}>
            <section className="relative py-20 min-h-[90vh]" style={{ contentVisibility: 'auto', containIntrinsicSize: '900px' }}>
                <div className="mx-auto grid w-[92%] max-w-[1200px] items-center gap-8 lg:grid-cols-[1.1fr_.9fr]">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger(0.15)}>
                        <motion.div variants={fadeInUp} className="text-[.8rem] font-bold uppercase tracking-[.3em] text-white">Discover</motion.div>
                        <motion.h2 variants={fadeInUp} className="mt-2 max-w-[20ch] text-4xl font-extrabold uppercase leading-tight text-white md:text-5xl">
                            Discover the world in a new way
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="mt-4 max-w-[60ch] text-white">
                            Allow you ever based on pleasure tour in the mountain and other paradise; museums and stories take you closer. Start your
                            video wandering where you are that's 100% from any device.
                        </motion.p>
                        <motion.div variants={fadeInUp} className="mt-6">
                            <BadgePlay />
                        </motion.div>
                    </motion.div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={stagger(0.08)} className="grid grid-cols-3 gap-4">
                        {thumbs.map((src, i) => (
                            <motion.div key={i} variants={fadeInUp} whileHover={{ scale: 1.02 }} className="group relative aspect-16/10 overflow-hidden rounded-xl bg-black transform-gpu" style={{ willChange: 'transform' }}>
                                <img
                                    className="h-full w-full object-cover opacity-90 transition duration-300 group-hover:brightness-110"
                                    src={src}
                                    alt="Video thumbnail"
                                    loading="lazy"
                                    decoding="async"
                                    fetchPriority="low"
                                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                />
                                <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/60" />
                                <span className="absolute bottom-2 left-2 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm backdrop-blur">
                                    <span className="h-0 w-0 border-y-6 border-l-8 border-y-transparent border-l-(--accent)" />
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </Parallax>
    )
}
export default Discover
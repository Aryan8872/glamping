import { motion } from 'framer-motion'

const PopularTours = () => {
    const stagger = (delay = 0.1) => ({
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
    })
    const fadeInUp = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    }

    const tours = [
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=75&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1500530855697-3a73f1bc3af7?q=75&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=75&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=75&w=1200&auto=format&fit=crop',
    ]
    return (
        <section id="tours" className="relative min-h-[60vh] py-20 bg-white" style={{ contentVisibility: 'auto', containIntrinsicSize: '800px' }}>
            <div className="mx-auto w-[92%] max-w-[1200px]">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8 text-center" variants={stagger(0.1)}>
                    <motion.div variants={fadeInUp} className=" text-3xl font-bold uppercase tracking-[.3em] text-black">Popular Tours</motion.div>
                    <motion.h3 variants={fadeInUp} className="mt-4 font-medium tracking-wide">There will be a small title here.</motion.h3>
                </motion.div>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={stagger(0.15)} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {tours.map((src, i) => (
                        <motion.article
                            key={i}
                            variants={fadeInUp}
                            whileHover={{
                                y: -10,
                                scale: 1.05,
                                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                            }}
                            className="group relative min-h-[280px] overflow-hidden rounded-2xl border border-white/10 bg-[#11171b] cursor-pointer transform-gpu"
                            style={{ willChange: 'transform' }}
                        >
                            <img
                                className="h-full w-full object-cover brightness-90"
                                src={src}
                                alt={`Tour ${i + 1}`}
                                loading="lazy"
                                decoding="async"
                                fetchPriority="low"
                                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                            />
                            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#060a0c]/90" />
                            <div className="absolute inset-x-4 bottom-11 z-10 flex-col text-center">
                                <div className='group/tour-title'>
                                    <div className="uppercase text-xl font-bold group-hover/tour-title:text-emerald-400">Tour {i + 1}</div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out text-sm mt-3 text-[#8ba1ab]">There will be a small</div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
export default PopularTours
import { motion } from 'framer-motion'
import { galleryData } from '../../data/gallery/data'
import { Link } from 'react-router-dom'

const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delay: 0.45,
    },
  },
}

const gridSquareVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Gallery() {
  return (
    <section className="page-padding py-16">
      <motion.p
        className="font-bold uppercase tracking-[.3em] text-3xl text-black text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        GALLERY
      </motion.p>

      <motion.section
        variants={gridContainerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
      >
        {galleryData.map((gallery, index) => (
          <Link
            to={`/gallery/${gallery.slug}`}
            key={index}
            className="group relative h-[87%] overflow-hidden rounded-md"
          >
            <motion.div variants={gridSquareVariants} className="relative h-full rounded-md">
              <motion.img
                src={gallery.image[0]}
                alt={gallery.title}
                className="h-full w-full object-cover rounded-md transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-80 rounded-md"></div>

              {/* Text Container */}
              <div
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute bottom-0 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all ease-out duration-500  w-full px-4 pb-6 text-center text-white"
              >
                <h3 className="text-lg font-bold uppercase tracking-wide mb-2">
                  {gallery.title}
                </h3>
                <p className="text-sm opacity-90 leading-snug">{gallery.description}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.section>
    </section>
  )
}

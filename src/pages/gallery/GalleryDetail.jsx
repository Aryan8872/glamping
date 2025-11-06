import { useParams } from "react-router-dom"
import { galleryData } from "../../data/gallery/data"
import { motion } from "framer-motion"
export default function GalleryDetail() {
    const { slug } = useParams()
    const data = galleryData.find((data) => data.slug === slug)
    return (
        <section className="py-16 page-padding">
            <motion.p className="flex flex-col text-center gap-4">
                <motion.span className="text-black font-extrabold text-2xl sm:text-3xl">{data.title}</motion.span>
                <motion.span className="text-gray-500 font-medium text-sm sm:text-base">{data.description}</motion.span>
            </motion.p>
            <motion.div className="mt-6 grid lg:grid-cols-4 grid-cols-2 gap-4 ">

                {
                    data.image.map((img, index) => (
                        <div className={`${index == 1 ? 'lg:row-span-2' : 'row-span-1'} ${index == 2 ? 'col-span-2' : 'col-span-1'}`}>
                            <motion.img key={index} src={img} alt="" className="w-full h-full" />
                        </div>
                    ))
                }
            </motion.div>
        </section>
    )
}
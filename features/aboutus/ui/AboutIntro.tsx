"use client";
import { motion } from "framer-motion";
import { BsQuote } from "react-icons/bs";
import { fadeInUp, stagger, scaleIn } from "../utils/aboutAnimations";

interface AboutIntroProps {
  aboutUs: string;
  textbox1: string;
  textbox2: string;
}

export default function AboutIntro({
  aboutUs,
  textbox1,
  textbox2,
}: AboutIntroProps) {
  return (
    <>
      <motion.p
        className="mt-4 text-emerald-700 font-medium tracking-wide"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        &quot;Your Ultimate Guide to Hiking and Outdoor Experiences&quot;
      </motion.p>

      <motion.div
        className="mt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
      >
        <motion.div
          className="mt-7 grid gap-3 md:gap-8 lg:grid-cols-[1.1fr_.9fr] items-start lg:grid-rows-2"
          variants={stagger}
        >
          <motion.div
            className="grid grid-rows-subgrid row-span-2 gap-5"
            variants={fadeInUp}
          >
            <div>
              <BsQuote className="text-gray-500 text-3xl" />
              <p className="mt-3 font-medium md:text-lg md:text-left text-justify">
                {aboutUs || "We are a team driven by a passion for nature..."}
              </p>
            </div>
            <div className="w-full rounded-lg bg-gradient-to-br p-3  text-white text-justify md:text-left md:text-lg font-medium from-emerald-800 to-emerald-600 h-full min-h-[250px]">
              {textbox1 || "We are a team driven by a passion for nature..."}
            </div>
          </motion.div>

          <motion.div
            className="bg-emerald-700 rounded-lg p-3  text-white row-span-2 flex flex-col h-full"
            variants={scaleIn}
          >
            <p className="md:text-lg font-medium text-justify md:text-left">
              {textbox2 || "Elevate every step..."}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}

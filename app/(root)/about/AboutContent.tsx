"use client";

import { motion } from "framer-motion";
import { BsQuote } from "react-icons/bs";
import { FiTarget } from "react-icons/fi";
import { BiCompass } from "react-icons/bi";
import { getIconComponent } from "@/utils/getIcons";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default function AboutContent({ aboutData }: { aboutData: any }) {
  const coreValues = aboutData?.coreValues || [];
  return (
    <section className="mx-auto md:w-[92%] max-w-[1200px]">
      <motion.div
        className="relative"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="rounded-[28px] h-[30svh] md:h-[40svh] overflow-hidden">
          <svg
            viewBox="0 0 100% 100%"
            width="100%"
            height="auto"
            preserveAspectRatio="xMidYMid slice"
          >
            <g mask="url(#aboutMask)">
              <image
                href="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop"
                x="0"
                y="0"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
              />
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="rgba(0,0,0,0.25)"
              />
              <foreignObject x="0" y="0" width="100%" height="100%">
                <div
                  style={{
                    display: "flex",
                    height: "100%",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      paddingLeft: 40,
                      paddingRight: 40,
                      width: "100%",
                    }}
                  >
                    <h2
                      className="lg:text-[92px] text-[30px]"
                      style={{
                        lineHeight: 1,
                        margin: 0,
                        color: "#fff",
                        fontWeight: 800,
                        letterSpacing: "-1px",
                      }}
                    >
                      ABOUT US
                    </h2>
                  </div>
                </div>
              </foreignObject>
            </g>
          </svg>
        </div>
      </motion.div>

      <motion.p
        className="mt-4 text-emerald-700 font-medium tracking-wide"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        "Your Ultimate Guide to Hiking and Outdoor Experiences"
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
                {aboutData?.aboutUs ||
                  "We are a team driven by a passion for nature..."}
              </p>
            </div>
            <div className="w-full rounded-lg bg-gradient-to-br p-3  text-white text-justify md:text-left md:text-lg font-medium from-emerald-800 to-emerald-600 h-full min-h-[250px]">
              {aboutData?.textbox_1 ||
                "We are a team driven by a passion for nature..."}
            </div>
          </motion.div>

          <motion.div
            className="bg-emerald-700 rounded-lg p-3  text-white row-span-2 flex flex-col h-full"
            variants={scaleIn}
          >
            <p className="md:text-lg font-medium text-justify md:text-left">
              {aboutData?.textbox_2 || "Elevate every step..."}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="w-full p-3 rounded-md"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
      >
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {aboutData?.stats?.map((stat: any, i: number) => (
            <motion.div
              key={i}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
              variants={scaleIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="text-3xl font-semibold text-emerald-700">
                {stat.value}
              </div>
              <div className="mt-3 text-sm text-gray-700">{stat.heading}</div>
            </motion.div>
          )) || <div>No stats available</div>}
        </div>
      </motion.div>

      <motion.div
        className="mt-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
      >
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-3 md:p-8 border border-emerald-100"
            variants={scaleIn}
          >
            <div className="flex items-center gap-3 mb-4">
              <FiTarget className="w-8 h-8 text-emerald-600" />
              <h3 className="text-2xl font-semibold text-gray-900">Vision</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {aboutData?.vision || "To redefine..."}
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-3 md:p-8 border border-teal-100"
            variants={scaleIn}
          >
            <div className="flex items-center gap-3 mb-4">
              <BiCompass className="w-8 h-8 text-teal-600" />
              <h3 className="text-2xl font-semibold text-gray-900">Mission</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {aboutData?.mission || "To consistently..."}
            </p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="mt-16 mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((value: any, index: number) => {
            const Icon = getIconComponent(value.icon);
            return (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all"
                variants={scaleIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    {Icon ? (
                      <Icon className="w-6 h-6 text-emerald-600" />
                    ) : null}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {value.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

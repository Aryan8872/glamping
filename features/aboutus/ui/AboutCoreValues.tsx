"use client";
import { motion } from "framer-motion";
import { scaleIn, stagger } from "../utils/aboutAnimations";
import { getIconComponent } from "@/utils/getIcons";

interface AboutCoreValuesProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coreValues: any[];
}

export default function AboutCoreValues({ coreValues }: AboutCoreValuesProps) {
  return (
    <motion.div
      className="mt-16 mb-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={stagger}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coreValues.map((value, index) => {
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
                  {Icon ? <Icon className="w-6 h-6 text-emerald-600" /> : null}
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
  );
}

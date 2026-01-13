"use client";
import { motion } from "framer-motion";
import { FiTarget } from "react-icons/fi";
import { BiCompass } from "react-icons/bi";
import { scaleIn, stagger } from "../utils/aboutAnimations";

interface AboutVisionMissionProps {
  vision: string;
  mission: string;
}

export default function AboutVisionMission({
  vision,
  mission,
}: AboutVisionMissionProps) {
  return (
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
            {vision || "To redefine..."}
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
            {mission || "To consistently..."}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

"use client";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/aboutAnimations";

export default function AboutHero() {
  return (
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
  );
}

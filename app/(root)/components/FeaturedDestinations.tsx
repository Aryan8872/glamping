"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface Destination {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  bgColor: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Mountain Peak Retreat",
    location: "Himalayas, Nepal",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
    rating: 4.9,
    bgColor: "#b793a1",
  },
  {
    id: 2,
    name: "Lakeside Paradise",
    location: "Pokhara Valley",
    image:
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=1740&auto=format&fit=crop",
    rating: 4.8,
    bgColor: "#bfcbd8",
  },
  {
    id: 3,
    name: "Forest Haven",
    location: "Chitwan National Park",
    image:
      "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1932&auto=format&fit=crop",
    rating: 4.7,
    bgColor: "#89bdbd",
  },

  {
    id: 4,
    name: "Forest Haven",
    location: "Chitwan National Park",
    image:
      "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1932&auto=format&fit=crop",
    rating: 4.7,
    bgColor: "#89bdbd",
  },
];

export default function FeaturedDestinations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const spotlightImagesRef = useRef<HTMLDivElement[]>([]);

  const spotlightImagesFinalPos = [
    [-110, -110],
    [30, -110],
    [-110, 10],
    [10, 10],
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `${window.innerHeight * 6}px`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        const initialRotations = [5, -3, 3.5, -1];
        const phaseOneStartOffsets = [0, 0.1, 0.2, 0.3];
        const phaseTwoStartOffsets = [0.5, 0.6, 0.7, 0.8];

        spotlightImagesRef.current.forEach((img, index) => {
          if (!img) return;

          const initialRotation = initialRotations[index];
          const phaseOneStart = phaseOneStartOffsets[index];
          const phaseOneEnd = phaseOneStart + 0.3;

          const phaseTwoStart = phaseTwoStartOffsets[index];
          const phaseTwoEnd = phaseTwoStart + 0.15;

          let x = -50;
          let y = 200;
          let rotation = initialRotation;

          // Phase 1: Appear from bottom
          if (progress > phaseOneStart) {
            const p = Math.min(
              (progress - phaseOneStart) / (phaseOneEnd - phaseOneStart),
              1
            );
            // Ease out cubic
            const eased = 1 - Math.pow(1 - p, 3);
            y = 200 - eased * 280; // Target -80: 200 - 280 = -80
          }

          // Phase 2: Disperse to grid
          const finalX = spotlightImagesFinalPos[index][0];
          const finalY = spotlightImagesFinalPos[index][1];

          if (progress > phaseTwoStart) {
            const p2 = Math.min(
              (progress - phaseTwoStart) / (phaseTwoEnd - phaseTwoStart),
              1
            );

            if (p2 >= 1) {
              // Lock at final position
              x = finalX;
              y = finalY;
              rotation = 0;
            } else {
              // Ease out cubic
              const eased2 = 1 - Math.pow(1 - p2, 3);
              x = -50 + (finalX + 50) * eased2;
              y = -80 + (finalY + 80) * eased2;
              rotation = initialRotation * (1 - eased2);
            }
          }

          gsap.set(img, {
            xPercent: x,
            yPercent: y,
            rotation: rotation,
          });
        });
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="spotlight relative h-[100svh] w-full p-[1rem] content-center overflow-visible"
    >
      <div className="spotlight-images absolute top-0 left-0 w-full h-full pointer-events-none">
        {destinations.map((dest, idx) => (
          <div
            key={dest.id}
            ref={(el) => {
              if (el) spotlightImagesRef.current[idx] = el;
            }}
            className="spotlight-img absolute top-[-40%]  left-[50%] w-full lg:w-[30vw] aspect-[7/5] rounded-lg translate-x-[-50%] translate-y-[200%] will-change-transform overflow-hidden shadow-2xl z-10"
          >
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

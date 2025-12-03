"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Step {
  number: number;
  title: string;
  description: string;
  icon: string;
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  const steps: Step[] = [
    {
      number: 1,
      title: "Search & Discover",
      description:
        "Browse through our curated collection of stunning camping locations. Filter by region, amenities, and activities to find your perfect spot.",
      icon: "🔍",
    },
    {
      number: 2,
      title: "Book Instantly",
      description:
        "Select your dates, choose your campsite, and complete your booking in minutes. Instant confirmation with flexible cancellation options.",
      icon: "📅",
    },
    {
      number: 3,
      title: "Explore & Enjoy",
      description:
        "Pack your bags and head to your destination. Check in seamlessly and immerse yourself in nature's beauty with peace of mind.",
      icon: "⛺",
    },
  ];

  useEffect(() => {
    const steps = stepsRef.current?.querySelectorAll(".step-card");
    const line = sectionRef.current?.querySelector(".connecting-line");

    if (!steps || !line) return;

    // Initial state
    gsap.set(steps, { opacity: 0, y: 50 });
    gsap.set(line, { scaleX: 0 });

    // Animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate connecting line first
    tl.to(line, {
      scaleX: 1,
      duration: 1,
      ease: "power2.inOut",
    });

    // Then animate steps with stagger
    tl.to(
      steps,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      },
      "-=0.5"
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      className="bg-gradient-to-b from-gray-50 to-white py-20"
      ref={sectionRef}
    >
      <div className="w-full">
        <div className="text-center mb-16">
          <h3 className="text-sm uppercase tracking-[.3em] text-gray-500 mb-3">
            Simple & Seamless
          </h3>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            How It Works
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Your adventure is just three easy steps away
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto" ref={stepsRef}>
          {/* Connecting Line */}
          <div className="connecting-line absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 hidden lg:block origin-left" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {steps.map((step) => (
              <div
                key={step.number}
                className="step-card bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
              >
                {/* Icon Circle */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-4xl shadow-lg">
                    {step.icon}
                  </div>
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {step.description}
                </p>

                {/* Decorative Arrow (desktop only) */}
                {step.number < steps.length && (
                  <div className="hidden lg:block absolute top-24 -right-6 text-indigo-400 text-3xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <a
              href="/search"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Your Adventure
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    location: "California, USA",
    text: "The camping experience was absolutely magical. The host was incredibly welcoming and the location was breathtaking.",
    rating: 5,
    avatar: null,
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Vancouver, Canada",
    text: "Found the perfect spot for our weekend getaway. The booking process was smooth and the site exceeded our expectations.",
    rating: 5,
    avatar: null,
  },
  {
    id: 3,
    name: "Emma Wilson",
    location: "London, UK",
    text: "Best platform for finding unique camping spots. I love the variety of experiences offered. Will definitely book again!",
    rating: 5,
    avatar: null,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-green-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {/* Abstract shapes or pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-overlay blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">What Our Campers Say</h2>
          <p className="text-green-100 max-w-2xl mx-auto">
            Hear from our community of adventurers about their experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/15 transition-colors"
            >
              <FaQuoteLeft className="text-green-300 text-3xl mb-6 opacity-50" />
              <p className="text-lg italic mb-6 leading-relaxed">"{t.text}"</p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-green-800 font-bold text-xl">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold">{t.name}</h4>
                  <span className="text-sm text-green-200">{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";
import { motion } from 'framer-motion';

export default function GiftCard() {
  return (
    <section className="bg-white py-10">
      <div className="w-full">
        <div className="relative overflow-hidden rounded-2xl border border-black/10">
          <img src="https://images.unsplash.com/photo-1549144511-f099e773c147?q=80&w=2000&auto=format&fit=crop" alt="gift" className="h-[420px] w-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute left-6 bottom-6 text-white">
            <h3 className="text-3xl sm:text-4xl font-extrabold">Gift cards</h3>
            <button className="mt-4 rounded-xl bg-white/90 px-5 py-3 font-semibold text-black hover:bg-white">Buy gift card</button>
          </div>
        </div>
      </div>
    </section>
  );
}

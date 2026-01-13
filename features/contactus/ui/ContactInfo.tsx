"use client";
import { motion } from "framer-motion";
import { ContactUsType } from "@/types/ContactUsType";

interface ContactInfoProps {
  data: ContactUsType;
}

export default function ContactInfo({ data }: ContactInfoProps) {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-emerald-700 text-white">
        <img
          src="/contact.jpg"
          alt="support"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="relative p-6">
          <div className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1 text-sm">
            Thrilliz
          </div>
          <div className="mt-4 text-2xl font-extrabold leading-snug">
            Our experts will always help you
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {[
          { title: "Email", desc: data.email, icon: "✉" },
          { title: "Call", desc: data.phoneNumber, icon: "☎" },
          { title: "Address", desc: data.address, icon: "📍" },
          {
            title: "Working Hours",
            desc: "Mon–Fri: 9:00 AM – 6:00 PM (PST)",
            icon: "🗓",
          },
        ].map((it, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-50 text-emerald-700 text-lg">
              {it.icon}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{it.title}</div>
              <div className="text-sm text-gray-600">{it.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

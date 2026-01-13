"use client";
import React from "react";
import { ContactUsType } from "@/types/ContactUsType";
import ContactForm from "@/features/contactus/ui/ContactForm";
import ContactInfo from "@/features/contactus/ui/ContactInfo";

export default function Contact({ data }: { data: ContactUsType }) {
  return (
    <div className="mx-auto md:w-[92%] max-w-[1200px]">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-emerald-700">
          Get in Touch with Us
        </h1>
        <p className="mx-auto mt-3 max-w-[75ch] text-gray-600">
          Have questions about our outdoor adventures or planning your next
          getaway? We’re here to help! Reach out for any inquiries, rental
          assistance, or adventure advice.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <ContactForm />
        <ContactInfo data={data} />
      </div>
    </div>
  );
}

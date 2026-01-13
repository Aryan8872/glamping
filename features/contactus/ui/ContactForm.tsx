"use client";
import { motion } from "framer-motion";
import { useContactForm } from "../hooks/useContactForm";

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function ContactForm() {
  const { formData, handleChange, handleSubmit, isSubmitting } =
    useContactForm();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <motion.h3
        variants={fadeInUp}
        className="text-xl font-bold text-gray-800"
      >
        Have Questions? We're Just a Message Away!
      </motion.h3>
      <motion.p variants={fadeInUp} className="mt-1 text-sm text-gray-500">
        Fill out the form below, and one of our team members will get back to
        you shortly.
      </motion.p>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-3 sm:grid-cols-2">
        <motion.div variants={fadeInUp}>
          <label className="mb-1 block text-xs font-semibold text-gray-600">
            First Name
          </label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none placeholder:text-gray-400"
            placeholder="First name"
            required
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <label className="mb-1 block text-xs font-semibold text-gray-600">
            Last Name
          </label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none placeholder:text-gray-400"
            placeholder="Last name"
            required
          />
        </motion.div>
        <motion.div variants={fadeInUp} className="sm:col-span-2">
          <label className="mb-1 block text-xs font-semibold text-gray-600">
            E-mail
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none placeholder:text-gray-400"
            placeholder="you@gmail.com"
            required
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <label className="mb-1 block text-xs font-semibold text-gray-600">
            Phone Number
          </label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none placeholder:text-gray-400"
            placeholder="(+977) 98xxxxxxxx"
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <label className="mb-1 block text-xs font-semibold text-gray-600">
            Subject
          </label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none text-gray-700"
          >
            <option value="">Choose message subject</option>
            <option value="booking">Booking inquiry</option>
            <option value="itinerary">Custom itinerary</option>
            <option value="partnership">Partnership</option>
          </select>
        </motion.div>
        <motion.div variants={fadeInUp} className="sm:col-span-2">
          <label className="mb-1 block text-xs font-semibold text-gray-600">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none placeholder:text-gray-400"
            placeholder="Leave us a message..."
            required
          />
        </motion.div>
        <motion.div variants={fadeInUp} className="sm:col-span-2">
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full sm:w-auto rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Message ↗"}
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
}

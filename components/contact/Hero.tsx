"use client";

import React, { useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { TbSend2 } from "react-icons/tb";

interface Contacts {
  full_name: string;
  email: string;
  phone: string;
  best_reason: string[];
  inquiry_subject: string;
  inquiry_message: string;
}

export default function Contacts() {
  // ✅ HARD GUARD — prevents build crash
  if (!supabase) {
    return (
      <div className="p-10 text-center text-red-600">
        Supabase is not configured. Check environment variables.
      </div>
    );
  }

  // ✅ Narrow once for TypeScript
  const sb = supabase;

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    best_reason: "",
    inquiry_subject: "",
    inquiry_message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      full_name: form.full_name,
      email: form.email,
      phone: form.phone,
      best_reason: [form.best_reason],
      inquiry_subject: form.inquiry_subject,
      inquiry_message: form.inquiry_message,
    };

    const { error } = await sb
      .from("contact")
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error("Insert error:", error.message);
      setMessage("Failed to submit. Try again.");
      setLoading(false);
      return;
    }

    setMessage("Message sent successfully!");

    setForm({
      full_name: "",
      email: "",
      phone: "",
      best_reason: "",
      inquiry_subject: "",
      inquiry_message: "",
    });

    setLoading(false);
  };

  return (
    <>
      {/* HERO */}
      <div className="">
        <div className="relative h-[74vh] w-full overflow-hidden flex items-center justify-center text-center">
          <div className="absolute inset-0 w-full transition-opacity duration-1000 bg-gray-100">
            <Image
              src="/assets/hero/burj-al-arab.jpg"
              alt="Contact"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/25" />
          </div>

          <div className="max-w-6xl mx-auto absolute inset-0 flex flex-col justify-center items-center text-center gap-4 text-white/70 z-10 px-8 md:px-10 2xl:px-0">
            <h1 className="playfair text-5xl md:text-6xl font-bold">
              Get in Touch
            </h1>
            <p className="text-sm lg:text-base text-gray-300 max-w-3xl">
              We're here to assist you with any inquiries about our solutions.
            </p>
          </div>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="max-w-4xl mx-auto -mt-20 bg-white px-8 p-12 lg:shadow-xl border-2 border-gray-100 flex flex-col gap-12 rounded-3xl relative z-5">
        <div className="flex flex-col items-center text-center justify-center gap-4">
          <label className="text-base lg:text-lg font-semibold text-teal-600">
            CONNECT
          </label>

          <h2 className="text-2xl lg:text-3xl font-bold text-[#f2836f]">
            We Are Here To Support Your Journey.
          </h2>

          <p className="text-xs md:text-sm text-gray-600 max-w-3xl">
            Reach out to us for bookings, tours, flights, visa support, or
            anything else.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-end gap-8 px-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 w-full">
            {/* Full Name */}
            <div className="flex flex-col gap-3 w-full">
              <label className="text-teal-600 font-bold text-sm">
                Full name<span className="text-red-500">*</span>
              </label>
              <input
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                type="text"
                placeholder="Your Full name"
                className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-3"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-3 w-full">
              <label className="text-teal-600 font-bold text-sm">
                Email Address<span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Your Email Address"
                className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-3"
                required
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-3 w-full">
              <label className="text-teal-600 font-bold text-sm">
                Phone Number<span className="text-red-500">*</span>
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                type="tel"
                placeholder="Your Phone Number"
                className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-3"
                required
              />
            </div>

            {/* Reason */}
            <div className="flex flex-col gap-3 w-full">
              <label className="text-teal-600 font-bold text-sm">
                Description that fits you<span className="text-red-500">*</span>
              </label>
              <select
                name="best_reason"
                value={form.best_reason}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-3"
                required
              >
                <option value="" disabled>
                  Select option
                </option>
                <option value="Hotel Booking">Hotel Booking</option>
                <option value="Round Tour Packages">Round Tour Packages</option>
                <option value="Airport Transfers">Airport Transfers</option>
                <option value="Sightseeing Inquiries">
                  Sightseeing Inquiries
                </option>
                <option value="Flight Ticket Inquires">
                  Flight Ticket Inquires
                </option>
                <option value="Visa Support">Visa Support</option>
              </select>
            </div>
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-3 w-full">
            <label className="text-teal-600 font-bold text-sm">
              Inquiry Subject<span className="text-red-500">*</span>
            </label>
            <input
              name="inquiry_subject"
              value={form.inquiry_subject}
              onChange={handleChange}
              type="text"
              placeholder="Your Purpose"
              className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-3"
              required
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-3 w-full">
            <label className="text-teal-600 font-bold text-sm">
              Inquiry Message<span className="text-red-500">*</span>
            </label>
            <textarea
              name="inquiry_message"
              value={form.inquiry_message}
              onChange={handleChange}
              placeholder="Enter your message here"
              className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-3"
              required
            />
          </div>

          {/* Feedback */}
          {message && (
            <p className="text-center text-sm font-semibold text-teal-600 w-full">
              {message}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="select-none btn-orange-base btn-dynamic flex items-center gap-2"
          >
            {loading ? "Sending..." : "Submit Message"} <TbSend2 size={24} />
          </button>
        </form>
      </div>
    </>
  );
}

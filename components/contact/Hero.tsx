"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { TbSend2 } from "react-icons/tb";

const FALLBACK_IMAGES = ["/assets/hero/.jpg"];
interface HeroRow {
  hero_title: string;
  hero_subtitle: string;
  hero_page_type: string[];
  hero_image_urls: string[];
}
interface ContactForm {
  full_name: string;
  email: string;
  phone: string;
  best_reason: string[];
  inquiry_subject: string;
  inquiry_message: string;
}

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [images, setImages] = useState<string[]>(FALLBACK_IMAGES);
  const [title, setTitle] = useState("Get in Touch");
  const [subtitle, setSubtitle] = useState(
    "We're here to assist you with any inquiries."
  );
  const [pageType, setPageType] = useState("Contact");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState<ContactForm>({
    full_name: "",
    email: "",
    phone: "",
    best_reason: [],
    inquiry_subject: "",
    inquiry_message: "",
  });

  useEffect(() => {
    if (!supabase) return;

    const fetchHero = async () => {
      const { data, error } = await supabase
        .from("hero")
        .select("*")
        .contains("hero_page_type", ["Contact"])
        .order("created_at", { ascending: true })
        .limit(1)
        .single();

      if (error || !data) {
        console.warn("Using fallback hero content");
        return;
      }

      const hero = data as HeroRow;

      if (hero.hero_image_urls?.length) {
        setImages(hero.hero_image_urls);
      }

      if (hero.hero_title) setTitle(hero.hero_title);
      if (hero.hero_subtitle) setSubtitle(hero.hero_subtitle);
      if (hero.hero_page_type) setPageType(hero.hero_page_type[0]);
    };

    fetchHero();
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % images.length),
      10000
    );
    return () => clearInterval(interval);
  }, [images.length]);

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

    const { error } = await supabase
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
      best_reason: [],
      inquiry_subject: "",
      inquiry_message: "",
    });

    setLoading(false);
  };

  return (
    <>
      {/* HERO */}
      <div className="relative h-[70vh] w-full overflow-hidden flex items-center justify-center text-center">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={img}
              alt={pageType}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/30 lg:bg-[#f2836f]/10 transition-all duration-1000" />
          </div>
        ))}

        {/* TEXT */}
        <div className="max-w-6xl mx-auto absolute inset-0 flex flex-col justify-center items-center gap-4 text-white z-10 px-8 md:px-10 2xl:px-0">
          <h1 className="playfair text-4xl md:text-6xl font-bold">{title}</h1>
          <p className="text-xs md:text-sm text-gray-200 max-w-3xl">
            {subtitle}
          </p>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="max-w-4xl mx-auto -mt-24 bg-white px-8 md:px-12 py-12 lg:shadow-xl border-2 border-gray-100 flex flex-col gap-12 rounded-4xl relative z-30">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-base lg:text-lg font-bold text-teal-600">
              CONNECT
            </label>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#f2836f]">
              We are here to support your journey.
            </h2>
          </div>

          <p className="text-xs md:text-sm font-normal text-center text-gray-600 max-w-3xl">
            Let’s continue to weave the tapestry of travel experiences with,
            more inspiring examples from The TravQuest Travel & Tourism Team. We
            can guide you through, your worldwide Hotel Bookings, Flight ticket
            arrangements, Visa Requirements, Arrival & Departure Transfer
            arrangements, Tours & Excursion Bookings, Corporate Events, and
            Meeting venue recommendations.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col items-end gap-8">
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
                How can we assist you?<span className="text-red-500">*</span>
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
};

export default Hero;

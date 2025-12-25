"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { supabase } from "@/lib/supabaseClient";

/* ----------------------------------
   FALLBACKS
----------------------------------- */
const FALLBACK_IMAGES = [
  "/assets/hero/sri-lanka-ella.jpg",
  "/assets/hero/sri-lanka-ella3.jpg",
  "/assets/hero/sri-lanka-sigiriya.jpg",
];

const FALLBACK_COUNTRY = "Sri Lanka";
const FALLBACK_TAGLINE = "Explore the wonders of Sri Lanka";

interface CountryRow {
  country: string;
  tagline: string;
  image_urls: string[];
}

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [images, setImages] = useState<string[]>(FALLBACK_IMAGES);
  const [country, setCountry] = useState(FALLBACK_COUNTRY);
  const [tagline, setTagline] = useState(FALLBACK_TAGLINE);

  /* ----------------------------------
     FETCH COUNTRY HERO DATA
     (replace filter with slug later)
  ----------------------------------- */
  useEffect(() => {
    if (!supabase) return;

    const fetchHero = async () => {
      const { data, error } = await supabase
        .from("countries") // ⬅️ change if table name differs
        .select("country, tagline, image_urls")
        // .ilike("country", "Sri Lanka")
        .limit(1)
        .single();

      if (error || !data) {
        console.warn("Using fallback country hero");
        return;
      }

      const row = data as CountryRow;

      if (row.image_urls?.length) setImages(row.image_urls);
      if (row.country) setCountry(row.country);
      if (row.tagline) setTagline(row.tagline);
    };

    fetchHero();
  }, []);

  /* ----------------------------------
     AUTO SLIDE
  ----------------------------------- */
  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % images.length),
      10000
    );
    return () => clearInterval(interval);
  }, [images.length]);

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % images.length);

  /* ----------------------------------
     UI
  ----------------------------------- */
  return (
    <div className="bg-white text-gray-900 relative">
      <div className="relative h-[74vh] w-full overflow-hidden flex items-center justify-center text-center">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full transition-opacity duration-1000 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={img}
              alt={country}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/30 lg:bg-[#f2836f]/10 transition-all duration-1000" />
          </div>
        ))}

        {/* CONTROLS */}
        <div className="hidden 2xl:block">
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-6 -translate-y-1/2 hover:bg-white/5 rounded-lg px-2 py-4 text-white z-20 transition"
          >
            <TbChevronLeft size={44} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-6 -translate-y-1/2 hover:bg-white/5 rounded-lg px-2 py-4 text-white z-20 transition"
          >
            <TbChevronRight size={44} />
          </button>
        </div>

        {/* TEXT */}
        <div className="max-w-6xl mx-auto absolute inset-0 flex flex-col justify-center items-center text-center gap-4 text-white/80 pt-24 z-10 px-8 md:px-10 2xl:px-0">
          <h1 className="playfair text-5xl md:text-6xl font-bold uppercase">
            {country}
          </h1>
          <p className="text-xs md:text-sm text-gray-300 max-w-3xl">
            {tagline}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;

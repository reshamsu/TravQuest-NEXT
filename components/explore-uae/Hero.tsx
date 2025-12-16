"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { supabase } from "@/lib/supabaseClient";

const FALLBACK_IMAGES = ["/assets/hero/.jpg"];

interface HeroRow {
  title: string;
  subtitle: string;
  page_type: string[];
  image_urls: string[];
}

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [images, setImages] = useState<string[]>(FALLBACK_IMAGES);
  const [title, setTitle] = useState("Where Luxury Meets Innovation");
  const [subtitle, setSubtitle] = useState(
    "Discover unforgettable experiences across the United Arab Emirates."
  );
  const [pageType, setPageType] = useState("Explore UAE");

  useEffect(() => {
    if (!supabase) return;

    const fetchHero = async () => {
      const { data, error } = await supabase
        .from("hero")
        .select("*")
        .contains("page_type", ["Explore UAE"])
        .order("created_at", { ascending: true })
        .limit(1)
        .single();

      if (error || !data) {
        console.warn("Using fallback Explore UAE hero content");
        return;
      }

      const hero = data as HeroRow;

      if (hero.image_urls?.length) {
        setImages(hero.image_urls);
      }

      if (hero.title) setTitle(hero.title);
      if (hero.subtitle) setSubtitle(hero.subtitle);
      if (hero.page_type) setPageType(hero.page_type[0]);
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

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);

  return (
    <div className="bg-gray-200 text-gray-900 relative">
      <div className="relative h-[74vh] w-full overflow-hidden flex items-center justify-center text-center">
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

        {/* CONTROLS */}
        <button
          onClick={prevSlide}
          className="hidden 2xl:flex absolute top-1/2 left-6 -translate-y-1/2 text-white z-20"
        >
          <TbChevronLeft size={44} />
        </button>

        <button
          onClick={nextSlide}
          className="hidden 2xl:flex absolute top-1/2 right-6 -translate-y-1/2 text-white z-20"
        >
          <TbChevronRight size={44} />
        </button>

        {/* TEXT */}
        <div className="max-w-6xl mx-auto absolute inset-0 flex flex-col justify-center items-center gap-6 text-white pt-24 z-10 px-8 md:px-10 2xl:px-0">
          <h1 className="playfair text-4xl md:text-5xl font-bold">{title}</h1>
          <p className="text-xs md:text-sm text-gray-200 max-w-3xl">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

const images = [
  "/assets/hero/maldives-villas.jpg",
  "/assets/hero/maldives-lifestyle2.webp",
  "/assets/hero/maldives-night.jpg",
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % images.length),
      10000
    );
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);

  return (
    <div className="bg-white text-gray-900 relative">
      {/* Carousel */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden flex items-center justify-center text-center">
        {images.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full transition-opacity duration-1000 bg-gray-100 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={banner}
              alt={`Media ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/25" />
          </div>
        ))}

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

        <div className="max-w-6xl mx-auto absolute inset-0 flex flex-col justify-center items-center text-center gap-4 text-white/70 z-10 px-8 md:px-10 2xl:px-0">
          <h1 className="text-4xl md:text-5xl 2xl:text-6xl font-extrabold">
            MALDIVES
          </h1>
          <p className="text-sm md:text-lg font-semibold text-gray-100 max-w-3xl">
            Explore the wonders of Maldives
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;

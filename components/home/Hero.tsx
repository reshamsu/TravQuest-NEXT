"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import Link from "next/link";

const images = [
  "/assets/hero/sheikh_zayed_grand_mosque.jpg",
  "/assets/hero/burj-al-arab.jpg",
  "/assets/hero/dubai-city.jpg",
  "/assets/hero/dubai-4k.avif",
  "/assets/hero/burj-khalifa2.jpg",
  "/assets/hero/burj-al-arab1.jpg",
  "/assets/hero/burj-khalifa1.jpg",
  "/assets/hero/bg-burj-khalifa1.jpg",
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
    <div className="bg-gray-100 text-gray-900 relative">
      {/* Carousel */}
      <div className="relative h-[74vh] w-full overflow-hidden flex justify-center">
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
            <div className="absolute inset-0 bg-black/40" />
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

        <div className="max-w-6xl mx-auto absolute inset-0 grid grid-cols-1 lg:grid-cols-2 items-center text-white/70 z-10 pt-24 px-8 md:px-10 2xl:px-0">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-start gap-6">
            <h1 className="text-2xl md:text-4xl 2xl:text-5xl font-extrabold">
              LET US UNFOLD YOUR EXTRAORDINARY TRAVEL STORY
            </h1>
            <p className="text-sm lg:text-base font-semibold text-gray-100 max-w-3xl">
              Discover thousands of beautiful places around the world with
              wonderful experiences you can imagine.
            </p>
            <Link href="/explore" className="btn-light-glass">
              Explore Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

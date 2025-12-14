import React from "react";
import Image from "next/image";

const images = [
  "/assets/poster/maldives-beach.jpg",
  "/assets/poster/maldives-beach1.jpg",
  "/assets/poster/maldives-beach2.jpeg",
];

const Welcome = () => {
  return (
    <div className="max-w-6xl mx-auto py-16 md:py-22 grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-24 px-8 md:px-10 2xl:px-0">
      {/* CONTENT */}
      <div className="flex flex-col justify-center gap-4 lg:gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold uppercase text-[#f2836f]">
            Escape to the Maldives
          </h2>
          <label className="text-base lg:text-lg font-bold text-teal-600">
            Pure Luxury. Absolute Tranquility.
          </label>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs md:text-sm font-normal text-justify text-gray-600">
            Scattered across the Indian Ocean, the <strong>Maldives</strong> is a
            sanctuary of crystal-clear waters, powder-soft white beaches, and
            vibrant coral reefs. Each island offers a sense of privacy and calm,
            making it one of the world’s most sought-after luxury destinations.
          </p>

          <p className="text-xs md:text-sm font-normal text-justify text-gray-600">
            Renowned for its overwater villas, underwater experiences, and
            world-class resorts, the <strong>Maldives</strong> is designed for
            romance, relaxation, and rejuvenation. Whether you seek a honeymoon
            escape, wellness retreat, or a private island experience, every
            moment here is shaped by nature, serenity, and understated elegance.
          </p>
        </div>
      </div>

      {/* IMAGES */}
      <div className="flex flex-col gap-4">
        <div className="relative h-90 w-full">
          <Image
            src="/assets/hero/maldives-view.jpg"
            alt="Maldives luxury island view"
            fill
            className="object-cover rounded-3xl"
          />
          <div className="absolute inset-0 bg-white/15 hover:bg-black/15 rounded-2xl duration-500" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {images.map((src, i) => (
            <div
              key={i}
              className="relative h-[120px] rounded-3xl w-full duration-1000 bg-gray-100"
            >
              <Image
                src={src}
                alt={`Maldives experience ${i + 1}`}
                fill
                className="object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-white/15 hover:bg-black/15 rounded-2xl duration-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Welcome;

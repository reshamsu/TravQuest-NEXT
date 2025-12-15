import React from "react";
import Image from "next/image";

const images = [
  "/assets/poster/singapore-city1.jpg",
  "/assets/poster/singapore-universal.jpg",
  "/assets/poster/singapore-airport.webp",
];

const Welcome = () => {
  return (
    <div className="max-w-6xl mx-auto py-16 md:py-22 grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-20 px-8 md:px-10 2xl:px-0">
      {/* CONTENT */}
      <div className="flex flex-col justify-center gap-4 lg:gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl 2xl:text-4xl font-bold uppercase text-[#f2836f]">
            Discover the Pulse of Singapore
          </h2>
          <label className="text-base lg:text-lg font-bold text-teal-600">
            Innovation, Culture & Urban Perfection
          </label>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs md:text-sm font-normal text-justify text-gray-600">
            A global city built on precision and progress, <strong>Singapore</strong>{" "}
            blends cutting-edge innovation with deep cultural heritage. From
            iconic skylines and lush urban gardens to vibrant neighborhoods and
            waterfront attractions, the city offers an experience that is both
            dynamic and refined.
          </p>

          <p className="text-xs md:text-sm font-normal text-justify text-gray-600">
            Renowned for its world-class infrastructure, culinary excellence,
            and seamless connectivity, <strong>Singapore</strong> is a hub for
            business, leisure, and lifestyle travel. Explore landmark attractions,
            theme parks, shopping districts, and cultural enclaves — all within
            one of the safest and most efficient cities in the world.
          </p>
        </div>
      </div>

      {/* IMAGES */}
      <div className="flex flex-col gap-4">
        <div className="relative h-90 w-full">
          <Image
            src="/assets/hero/singapore-lion3.jpg"
            alt="Singapore city skyline"
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
                alt={`Singapore experience ${i + 1}`}
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

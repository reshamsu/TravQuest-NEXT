import React from "react";
import Image from "next/image";
import Link from "next/link";

const images = [
  "/assets/poster/event-desert-safari1.webp",
  "/assets/poster/event-burj-khalifa1.jpg",
  "/assets/poster/event-ferrari-world.jpg",
  "/assets/hero/sheikh_zayed_grand_mosque.jpg",
];

const Welcome = () => {
  return (
    <div className="bg-linear-to-b from-[#f2836f]/20 via-[#ffffff] to-[#ffffff]">
      <div className="max-w-6xl mx-auto py-16 md:py-22 grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-24 px-6 md:px-10 2xl:px-0">
        <div className="grid grid-cols-2 gap-4">
          {images.map((src, i) => (
            <div
              key={i}
              className="relative h-[250px] rounded-3xl w-full duration-1000 bg-gray-100"
            >
              <Image
                src={src}
                alt={`Media ${i + 1}`}
                fill
                className="object-cover rounded-3xl"
              />
              <div className="absolute inset-0 bg-white/15 hover:bg-black/15 rounded-3xl duration-500" />
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center gap-4 md:gap-6">
          <div className="flex flex-col gap-2.5">
            <label
              htmlFor=""
              className="text-base md:text-lg font-semibold text-[#f2836f]"
            >
              EVERY MILE CURATED, EVERY MOMENT ELEVATED.
            </label>
            <h2 className="text-3xl 2xl:text-4xl font-bold text-teal-600">
              Let Us Inspire You To Expand Your Travel Horizons
            </h2>
          </div>

          <p className="text-sm md:text-base font-normal text-justify text-gray-600">
            The inception of <strong>The TravQuest Travel & Tourism</strong> was inspired to
            curate experiences to delight your passion for travel. We endeavor
            to go beyond your travel needs. We specialize in curating
            unforgettable journeys. Our mission is to turn your travel dreams
            into reality.
          </p>
          <p className="text-sm md:text-base font-normal text-justify text-gray-600">
            Explore our handpicked destinations, expertly crafted itineraries,
            and personalized experiences. Whether you seek adventure,
            relaxation, or cultural immersion, we're here to create your perfect
            getaway.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

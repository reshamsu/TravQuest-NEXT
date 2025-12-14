import React from "react";
import Image from "next/image";

const images = [
  "/assets/poster/rak-mountains.jpg",
  "/assets/poster/rak-desert.jpg",
  "/assets/poster/rak-beach-resort.webp",
];

const Welcome = () => {
  return (
    <div className="max-w-6xl mx-auto py-16 md:py-22 grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-24 px-8 md:px-10 2xl:px-0">
      {/* CONTENT */}
      <div className="flex flex-col justify-center gap-4 md:gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold uppercase text-[#f2836f]">
            Discover Ras Al Khaimah
          </h2>
          <label className="text-base lg:text-lg font-bold text-teal-600">
            Nature, Heritage & Adventure Combined
          </label>
        </div>

        <p className="text-xs md:text-sm font-normal text-justify text-gray-600">
          <strong>Ras Al Khaimah</strong> is the northernmost emirate of the
          UAE, celebrated for its dramatic mountain landscapes, pristine
          beaches, and rich cultural heritage. Far from the bustle of mega
          cities, RAK offers a more authentic and nature-driven travel
          experience.
        </p>

        <p className="text-xs md:text-sm font-normal text-justify text-gray-600">
          Home to <strong>Jebel Jais</strong>, the highest mountain in the UAE,
          Ras Al Khaimah is a hub for outdoor adventure — from scenic hikes and
          desert safaris to the world’s longest zipline. Its historic forts,
          traditional villages, and archaeological sites reflect centuries of
          Emirati history.
        </p>

        <p className="text-xs md:text-sm font-normal text-justify text-gray-600">
          Blending unspoiled nature with luxury beach resorts and wellness
          retreats, <strong>Ras Al Khaimah</strong> is ideal for travelers
          seeking relaxation, adventure, and cultural depth — all in one
          destination.
        </p>
      </div>

      {/* IMAGES */}
      <div className="flex flex-col gap-4">
        <div className="relative h-80 w-full">
          <Image
            src="/assets/poster/rak-poster.jpg"
            alt="UAE"
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
                alt={`Ras Al Khaimah highlight ${i + 1}`}
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

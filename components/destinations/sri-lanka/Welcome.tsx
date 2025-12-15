import React from "react";
import Image from "next/image";

const images = [
  "/assets/poster/sri-lanka-hills.jpg",
  "/assets/poster/sri-lanka-train_ride.jpg",
  "/assets/poster/sri-lanka-elephant_tour.jpg",
];

const Welcome = () => {
  return (
    <div className="max-w-6xl mx-auto py-16 md:py-22 grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-24 px-8 md:px-10 2xl:px-0">
      {/* CONTENT */}
      <div className="flex flex-col justify-center gap-4 lg:gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl 2xl:text-4xl font-bold uppercase text-[#f2836f]">
            Discover the Soul of Sri Lanka
          </h2>
          <label className="text-base lg:text-lg font-bold text-teal-600">
            Nature, Heritage & Timeless Beauty
          </label>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs md:text-sm font-normal text-justify text-gray-600">
            Blessed with golden beaches, misty hill country, lush tea
            plantations, and abundant wildlife, <strong>Sri Lanka</strong> is a
            destination rich in natural beauty and cultural depth. From serene
            coastal towns to vibrant local markets and ancient cities, every
            journey here feels authentic and unforgettable.
          </p>

          <p className="text-xs md:text-sm font-normal text-justify text-gray-600">
            Known as the <i>Pearl of the Indian Ocean</i>,{" "}
            <strong>Sri Lanka</strong> offers a rare blend of history, spirituality,
            and adventure. Explore centuries-old temples, scenic train journeys,
            wildlife safaris, and warm local hospitality — all within a compact,
            easily accessible island.
          </p>
        </div>
      </div>

      {/* IMAGES */}
      <div className="flex flex-col gap-4">
        <div className="relative h-90 w-full">
          <Image
            src="/assets/poster/sri-lanka-lotus_tower2.jpg"
            alt="Sri Lanka cityscape"
            fill
            className="object-cover rounded-3xl"
          />
          <div className="absolute inset-0 bg-white/10 hover:bg-black/15 rounded-2xl duration-500" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {images.map((src, i) => (
            <div
              key={i}
              className="relative h-[120px] rounded-3xl w-full duration-1000 bg-gray-100"
            >
              <Image
                src={src}
                alt={`Sri Lanka experience ${i + 1}`}
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

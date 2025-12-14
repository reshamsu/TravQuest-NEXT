import React from "react";
import Image from "next/image";

const images = [
  "/assets/poster/event-desert-safari1.webp",
  "/assets/destinations/dubai-frame.webp",
  "/assets/poster/dubai-marina-night.jpg",
];

const Welcome = () => {
  return (
    <div className="max-w-6xl mx-auto py-16 md:py-22 grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-24 px-8 md:px-10 2xl:px-0">
      {/* CONTENT */}
      <div className="flex flex-col justify-center gap-4 md:gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold uppercase text-[#f2836f]">
            Experience Dubai
          </h2>
          <label className="text-base lg:text-lg font-bold text-teal-600">
            Where Innovation Meets Luxury
          </label>
        </div>

        <p className="text-xs md:text-sm font-normal text-justify text-gray-600">
          <strong>Dubai</strong> is a global city built on ambition, innovation,
          and unmatched vision. Rising from the desert into one of the world’s
          most futuristic destinations, Dubai blends cutting-edge architecture,
          luxury living, and world-class experiences like no other city.
        </p>

        <p className="text-xs md:text-sm font-normal text-justify text-gray-600">
          Home to icons such as the <strong>Burj Khalifa</strong>, Palm Jumeirah,
          and Dubai Marina, the city offers everything from desert safaris and
          yacht cruises to luxury shopping, fine dining, and immersive cultural
          districts like Al Fahidi.
        </p>

        <p className="text-xs md:text-sm font-normal text-justify text-gray-600">
          With its seamless connectivity, year-round sunshine, and reputation
          for excellence, <strong>Dubai</strong> stands as a premier destination
          for leisure travelers, business professionals, and luxury seekers
          alike — delivering experiences that redefine modern travel.
        </p>
      </div>

      {/* IMAGES */}
      <div className="flex flex-col gap-4">
        <div className="relative h-80 w-full">
          <Image
            src="/assets/poster/museum-future.webp"
            alt="Dubai skyline and Burj Khalifa"
            fill
            className="object-cover rounded-3xl"
            priority
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
                alt={`Dubai highlight ${i + 1}`}
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

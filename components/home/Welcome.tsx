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
              className="relative h-[180px] lg:h-[250px] rounded-3xl w-full duration-1000 bg-gray-100"
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
          <div className="flex flex-col gap-2">
            <label
              htmlFor=""
              className="text-base md:text-lg font-semibold text-[#f2836f]"
            >
              MEET THE WORLD
            </label>
            <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-teal-600">
              Great Faces, Great Places
            </h2>
          </div>

          <p className="text-sm md:text-base font-normal text-justify text-gray-600">
            Travel is a beautiful journey that enriches our lives and broadens
            our perspectives. Let’s delve into the enchanting world of travel,
            where every journey unfolds a tapestry of delightful and memorable
            moments.
          </p>
          <p className="text-sm md:text-base font-normal text-justify text-gray-600">
            Whether you’re a seasoned globetrotter or embarking on your first
            adventure, travel has a way of leaving an indelible mark on our
            hearts.
          </p>

          <div className="flex flex-col gap-6">
            <h4 className="text-sm md:text-lg font-bold text-gray-600">
              Live your story…Discover Another Destination!
            </h4>

            <Link href="/about" className="select-none btn-green-base btn-dynamic">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

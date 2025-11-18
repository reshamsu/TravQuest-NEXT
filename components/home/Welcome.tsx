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
    <div className="max-w-7xl mx-auto py-20 grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-20 px-6 md:px-10 2xl:px-0">
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

      <div className="flex flex-col justify-center gap-3 md:gap-4">
        <label htmlFor="" className="text-base md:text-lg font-extrabold text-[#f2836f]">
          MEET THE WORLD
        </label>
        <h2 className="text-2xl 2xl:text-3xl font-extrabold text-teal-600">
          GREAT FACES, GREAT PLACES
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          Travel is a beautiful journey that enriches our lives and broadens our
          perspectives. Let’s delve into the enchanting world of travel, where
          every journey unfolds a tapestry of delightful and memorable moments.
          <br></br>
          Whether you’re a seasoned globetrotter or embarking on your first
          adventure, travel has a way of leaving an indelible mark on our
          hearts.
        </p>
        <h4 className="text-base md:text-lg font-bold text-gray-800">
          Live your story…Discover Another Destination!
        </h4>

        <div className="flex items-center gap-4 text-sm mt-4">
          <Link href="/" className="select-none btn-orange-base btn-dynamic">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

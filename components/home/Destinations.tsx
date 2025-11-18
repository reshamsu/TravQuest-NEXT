import React from "react";
import Image from "next/image";

const images = [
  "/assets/poster/event-desert-safari1.webp",
  "/assets/poster/event-burj-khalifa1.jpg",
  "/assets/poster/event-ferrari-world.jpg",
  "/assets/hero/sheikh_zayed_grand_mosque.jpg",
  "/assets/poster/event-burj-khalifa.jpg",
];

const Destinations = () => {
  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 py-16 px-6 md:px-10 2xl:px-0">
        <div className="flex flex-col items-center text-center justify-center gap-4">
          <label
            htmlFor=""
            className="text-sm md:text-base font-extrabold text-gray-600"
          >
            A DESTINATION THAT LEAVES A MARK ON YOUR SOUL
          </label>
          <h2 className="text-3xl 2xl:text-4xl font-extrabold text-teal-600">
            Unleash Your{" "}
            <span className="text-[#f2836f]">Adventurous Spirit</span>
          </h2>
          <p className="text-sm md:text-base text-gray-500 max-w-4xl">
            Whether you're interested in history, culture, luxury experiences,
            or outdoor adventures, the UAE has something for everyone. Here are
            our top recommendations for the month
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {images.map((src, i) => (
            <div
              key={i}
              className="relative h-[300px] rounded-3xl w-full duration-1000 bg-gray-100"
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
      </div>
    </div>
  );
};

export default Destinations;

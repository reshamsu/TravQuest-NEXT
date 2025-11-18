import React from "react";
import Image from "next/image";
import Link from "next/link";

const images = [
  "/assets/poster/event-desert-safari1.webp",
  "/assets/poster/event-burj-khalifa1.jpg",
  "/assets/poster/event-ferrari-world.jpg",
  "/assets/hero/sheikh_zayed_grand_mosque.jpg",
];

const Discovery = () => {
  return (
    <div className="bg-gradient-to-b from-teal-200/10 via-[#ffffff] to-[#ffffff]">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 py-20 px-6 md:px-10 2xl:px-0">
        <div className="flex flex-col justify-center gap-2">
          <label htmlFor="" className="text-sm md:text-base font-extrabold text-gray-600">
            WHERE TIME-HONORED TRADITIONS EMBRACE THE FUTURE!
          </label>
          <h2 className="text-2xl md:text-3xl font-extrabold text-teal-600">
            DISCOVER THE UAE
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((src, i) => (
            <div
              key={i}
              className="relative h-[360px] rounded-3xl w-full duration-1000 bg-gray-100"
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

export default Discovery;

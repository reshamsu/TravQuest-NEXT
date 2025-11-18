import React from "react";
import Image from "next/image";

const images = [
  "/assets/poster/event-ferrari-world.jpg",
  "/assets/hero/sheikh_zayed_grand_mosque.jpg",
  "/assets/poster/event-desert-safari1.webp",
  "/assets/poster/event-burj-khalifa1.jpg",
];

const Shortcut = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-10 py-20 px-6 md:px-10 2xl:px-0">
      <div className="flex flex-col gap-4">
        <label
          htmlFor=""
          className="text-sm md:text-base font-extrabold text-[#f2836f]"
        >
          A DESTINATION THAT LEAVES A MARK ON YOUR SOUL
        </label>
        <h2 className="text-xl md:text-3xl 2xl:text-3xl font-extrabold text-gray-700">
          Let’s Travel Around the Globe…
          <span className="text-teal-600">One Destination at a Time</span>
        </h2>
        <p className="text-sm md:text-base text-gray-500">
          From bustling metropolises to serene landscapes, our global adventure
          awaits. Pack your bags, follow the compass of wanderlust, and let the
          thrill of discovery guide your path. Together, we’ll explore diverse
          cultures, savor exotic flavors, and create memories that span
          continents
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {images.map((src, i) => (
          <div
            key={i}
            className="relative h-[440px] rounded-3xl w-full duration-1000 bg-gray-100"
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
  );
};

export default Shortcut;

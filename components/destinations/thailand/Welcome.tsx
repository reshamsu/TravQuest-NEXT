import React from "react";
import Image from "next/image";

const images = [
  "/assets/poster/thailand-temples.jpg",
  "/assets/poster/thailand-rides.jpg",
  "/assets/poster/thailand-city.jpg",
];

const Welcome = () => {
  return (
    <div className="max-w-6xl mx-auto py-16 md:py-22 grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-24 px-8 md:px-10 2xl:px-0">
      <div className="flex flex-col justify-center gap-4 md:gap-6">
        <div className="flex flex-col gap-2">
          <label
            htmlFor=""
            className="text-base md:text-lg font-semibold text-teal-600"
          >
            A EPITOME OF MODERNITY
          </label>
          <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#f2836f]">
            The Future is now in Thailand
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm md:text-base font-normal text-justify text-gray-600">
            With an unparalleled coastline, beautiful desert, and magnificent
            cityscapes, memories are just waiting to be made here.
          </p>{" "}
          <p className="text-sm md:text-base font-normal text-justify text-gray-600">
            From traditional souks to luxurious entertainment centers, golf
            stadiums, recreational facilities, and sports activities,{" "}
            <strong>Thailand</strong> offers a little bit of everything.
          </p>
          <p className="text-sm md:text-base font-normal text-justify text-gray-600">
            <strong>Thailand</strong> is the epitome of modernity, reflected in its
            state-of-the-art architecture,{" "}
            <i>record-breaking attractions, and world-class.</i>
          </p>
          <p className="text-sm md:text-base font-normal text-justify text-gray-600">
            Today, <strong>Thailand</strong> is among the most modern cities in the
            world bustling with international trade, industry, and commerce.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="relative h-90 w-full">
          <Image
            src="/assets/hero/thailand-post.avif"
            alt="UAE"
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
                alt={`Media ${i + 1}`}
                fill
                className="object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-white/10 hover:bg-black/15 rounded-2xl duration-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Welcome;

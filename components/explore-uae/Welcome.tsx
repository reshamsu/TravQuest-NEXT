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
    <div className="max-w-7xl mx-auto py-20 grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-24 px-6 md:px-10 2xl:px-0">
      <div className="flex flex-col items-center text-center justify-center gap-4 md:gap-6">
        <div className="flex flex-col gap-2">
          <label
            htmlFor=""
            className="text-base md:text-lg font-extrabold text-[#f2836f]"
          >
            A MELTING POT OF CULTURES & TRADITIONS
          </label>
          <h2 className="text-2xl 2xl:text-3xl font-extrabold text-teal-600">
            A WONDEROUS UAE
          </h2>
        </div>

        <p className="text-sm md:text-base text-gray-600">
          The <strong>United Arab Emirates (UAE)</strong> is a melting pot of
          cultures and traditions, with a rich history and heritage while it is
          the home to a variety of landscapes,{" "}
          <i>including beaches, deserts, mountains, and cityscapes.</i>
        </p>
        <p className="text-sm md:text-base text-gray-600">
          The <strong>UAE</strong> is a vibrant nation nestled in the{" "}
          <u>Arabian Peninsula</u> and is a federation of seven emirates,
          consisting of <strong>Abu Dhabi (the capital city) </strong>, Ajman,
          Dubai, Fujairah, Ras Al Khaimah, Sharjah and Umm Al Quwain.
        </p>
        <p className="text-sm md:text-base text-gray-600">
          The <strong>Emirates</strong> comprise a mixed environment of rocky
          desert, coastal plains and wetlands, and waterless mountains. The
          seashore is a haven for migratory waterfowl and draws birdwatchers
          from all over the world; the country’s unspoiled beaches and opulent
          resorts also have drawn international travelers. Standing at a
          historic and geographic crossroads and made up of diverse cultures,
          the <strong>United Arab Emirates</strong> presents a striking blend of
          traditions and modernity.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="relative h-full w-full">
          <Image
            src="/assets/hero/TheUAE.jpg"
            alt="UAE"
            fill
            className="object-cover rounded-3xl"
          />
          <div className="absolute inset-0 bg-white/15 hover:bg-black/15 rounded-2xl duration-500" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((src, i) => (
            <div
              key={i}
              className="relative h-[100px] rounded-2xl w-full duration-1000 bg-gray-100"
            >
              <Image
                src={src}
                alt={`Media ${i + 1}`}
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

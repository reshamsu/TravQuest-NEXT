import React from "react";
import Image from "next/image";

const images = [
  "/assets/poster/event-desert-safari1.webp",
  "/assets/poster/event-burj-khalifa1.jpg",
  "/assets/poster/event-ferrari-world.jpg",
];

const Welcome = () => {
  return (
    <div className="max-w-6xl mx-auto py-16 md:py-22 grid grid-cols-1 md:grid-cols-2 gap-16 px-8 md:px-10 2xl:px-0">
      <div className="flex flex-col justify-center gap-4 md:gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl 2xl:text-4xl font-bold uppercase text-[#f2836f]">
            A Wonderous UAE
          </h2>
          <label className="text-base lg:text-lg font-bold text-teal-600">
            A Melting pot of cultures & traditions
          </label>
        </div>

        <p className="text-xs md:text-sm font-normal text-justify text-gray-600">
          The <strong>United Arab Emirates (UAE)</strong> is a melting pot of
          cultures and traditions, with a rich history and heritage while it is
          the home to a variety of landscapes,{" "}
          <i>including beaches, deserts, mountains, and cityscapes.</i>
        </p>
        <p className="text-xs md:text-sm font-normal text-justify text-gray-600">
          The <strong>UAE</strong> is a vibrant nation nestled in the{" "}
          <u>Arabian Peninsula</u> and is a federation of seven emirates,
          consisting of <strong>Abu Dhabi (the capital city) </strong>, Ajman,
          Dubai, Fujairah, Ras Al Khaimah, Sharjah and Umm Al Quwain.
        </p>
        <p className="text-xs md:text-sm font-normal text-justify text-gray-600">
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
        <div className="relative h-90 w-full">
          <Image
            src="/assets/hero/TheUAE.jpg"
            alt="UAE"
            fill
            className="object-cover rounded-4xl"
          />
          <div className="absolute inset-0 hover:bg-black/15 rounded-4xl duration-700" />
        </div>

        <div className="grid grid-cols-4 gap-4">
          {images.map((src, i) => (
            <div
              key={i}
              className="relative h-[120px] w-full"
            >
              <Image
                src={src}
                alt={`Media ${i + 1}`}
                fill
                className="object-cover rounded-3xl"
              />
              <div className="absolute inset-0 hover:bg-black/15 rounded-3xl duration-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Welcome;

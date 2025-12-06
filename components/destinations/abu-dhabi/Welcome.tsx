import React from "react";
import Image from "next/image";
import Link from "next/link";

const images = [
  "/assets/poster/event-desert-safari1.webp",
  "/assets/poster/event-burj-khalifa1.jpg",
  "/assets/poster/event-ferrari-world.jpg",
];

const Welcome = () => {
  return (
    <div className="max-w-6xl mx-auto py-16 md:py-22 grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-24 px-8 md:px-10 2xl:px-0">
      <div className="flex flex-col gap-6 md:gap-8">
        <div className="flex flex-col gap-2">
          <label
            htmlFor=""
            className="text-base md:text-lg font-semibold text-[#f2836f]"
          >
            MODERN OASIS WITH A RICH HISTORY AND CULTURE
          </label>
          <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-teal-600">
            Abu Dhabi Capital of UAE
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm md:text-base font-normal text-justify text-gray-600">
            <strong>Abu Dhabi</strong> is the largest of the Emirates and is the
            <i>capital of the UAE.</i>
          </p>
          <p className="text-sm md:text-base font-normal text-justify text-gray-600">
            <strong>Abu Dhabi</strong> has been recognized as a destination of
            distinction due to its unique blend of the modern with a rich
            history and cultural identity. Home to more than 200 natural
            islands, theme parks, cultural centers, art galleries, and
            world-class conferencing facilities. The city has managed to not
            only position itself as <i>a top-notch leisure destination</i> but
            also a globally renowned <strong>MICE destination.</strong>
          </p>
          <p className="text-sm md:text-base font-normal text-justify text-gray-600">
            <strong>Abu Dhabi</strong>, a{" "}
            <i>city of contrasts and aspirations</i>, stands as a beacon of
            progress on the <u>Arabian Peninsula</u>. Here, more than 200
            nationalities converge, weaving a rich tapestry of cultures,
            languages, and dreams. Let’s explore this remarkable city.
          </p>
          <p className="text-sm md:text-base font-normal text-justify text-gray-600">
            <strong>Global Financial Hub and Innovation Center:</strong> Beyond
            its glittering skyline, Abu Dhabi pulses with economic vitality. It
            is a global financial center, attracting investors, entrepreneurs,
            and visionaries.
          </p>
          <p className="text-sm md:text-base font-normal text-justify text-gray-600">
            <strong>Energy Capital and Sustainability Champion:</strong> Abu
            Dhabi’s oil and gas reserves have fueled its growth, but it also
            leads the charge toward a sustainable future.
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-4">
        <div className="relative h-80 md:h-full w-full">
          <Image
            src="/assets/hero/sheikh_zayed_grand_mosque1.jpg"
            alt="UAE"
            fill
            className="object-cover rounded-3xl"
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

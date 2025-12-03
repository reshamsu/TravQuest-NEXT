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
    <div className="max-w-6xl mx-auto py-16 md:py-22 grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-24 px-8 md:px-10 2xl:px-0">
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="flex flex-col gap-2">
          <label
            htmlFor=""
            className="text-sm md:text-base font-semibold text-[#f2836f]"
          >
            WHETHER YOU SEEK HERITAGE, LUXURY, OR CONTEMPORARY FLAIR
          </label>
          <h2 className="text-2xl 2xl:text-3xl font-bold text-teal-600">
            Abu Dhabi’s Hotels Promise An Unforgettable Stay
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm md:text-base font-normal text-justify text-gray-600">
            <strong>Abu Dhabi</strong>, the vibrant capital of the{" "}
            <i>United Arab Emirates</i>, offers a range of luxurious hotels and
            unique accommodations. Whether you’re seeking a desert retreat, a
            beachside hideaway, or a city-center oasis,{" "}
            <strong>Abu Dhabi</strong> has something to suit every traveler’s
            taste. These hotels offer a{" "}
            <u>blend of luxury, comfort, and convenience</u>, making your stay
            in <strong>Abu Dhabi</strong> truly memorable!
          </p>
          <p className="text-sm md:text-base font-normal text-justify text-gray-600">
            <strong>Qasr Al Sarab Hotel:</strong> Nestled amid rolling dunes in
            the world’s largest uninterrupted sand desert, Qasr Al Sarab is the
            most Instagrammed hotel on the planet. Its remote setting provides a
            sense of tranquility and awe-inspiring views.
          </p>
          <p className="text-sm md:text-base font-normal text-justify text-gray-600">
            <strong>Emirates Palace:</strong> This palatial beachfront hotel
            exudes grandeur and elegance. Its interiors balance marble and gold
            flourishes with more muted tones.
          </p>
          <p className="text-sm md:text-base font-normal text-justify text-gray-600">
            <strong>Telal Resort Al Ain:</strong> Scattered across the silky
            summits and valleys of Al Ain’s deep caramel dunes, Telal Resort
            offers breathtaking views of mountains of sand sculpted anew each
            day by Mother Nature.
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-4">
        <div className="relative h-80 md:h-full w-full">
          <Image
            src="/assets/poster/abu-dhabi-hotels.webp"
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

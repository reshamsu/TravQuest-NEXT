import React from "react";
import Image from "next/image";

const images = [
  "/assets/poster/fujairah-beach.jpg",
  "/assets/poster/fujairah-mountains.jpeg",
  "/assets/poster/fujairah-fort.jpg",
];

const Welcome = () => {
  return (
    <div className="max-w-6xl mx-auto py-16 md:py-22 grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-24 px-8 md:px-10 2xl:px-0">
      {/* CONTENT */}
      <div className="flex flex-col justify-center gap-4 lg:gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold uppercase text-[#f2836f]">
            Discover Fujairah
          </h2>
          <label className="text-base lg:text-lg font-bold text-teal-600">
            Where Mountains Meet the Sea
          </label>
        </div>

        <p className="text-xs md:text-sm font-normal text-justify text-gray-600">
          Located on the eastern coast of the United Arab Emirates,{" "}
          <strong>Fujairah</strong> is the only emirate that lies entirely along
          the Gulf of Oman. Renowned for its dramatic mountain landscapes,
          pristine beaches, and crystal-clear waters, Fujairah offers a quieter,
          more nature-driven escape from the urban pace of the UAE.
        </p>

        <p className="text-xs md:text-sm font-normal text-justify text-gray-600">
          Backed by the rugged <strong>Hajar Mountains</strong> and bordered by
          untouched coastlines, Fujairah is a haven for outdoor enthusiasts.
          From snorkeling and scuba diving among vibrant coral reefs to hiking,
          wadi exploration, and beachside relaxation, the emirate blends
          adventure with serenity.
        </p>

        <p className="text-xs md:text-sm font-normal text-justify text-gray-600">
          Rich in history and culture, <strong>Fujairah</strong> is home to some
          of the UAE’s oldest forts, mosques, and heritage villages. Its relaxed
          atmosphere, scenic resorts, and natural beauty make it an ideal
          destination for travelers seeking authenticity, wellness, and coastal
          tranquility.
        </p>
      </div>

      {/* IMAGES */}
      <div className="flex flex-col gap-4">
        <div className="relative h-80 w-full">
          <Image
            src="/assets/destinations/fujairah-castle.jpg"
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
                alt={`Fujairah experience ${i + 1}`}
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

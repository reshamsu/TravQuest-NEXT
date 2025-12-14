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
      {/* CONTENT */}
      <div className="flex flex-col justify-center gap-4 lg:gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold uppercase text-[#f2836f]">
            Experience the Spirit of Thailand
          </h2>
          <label className="text-base lg:text-lg font-bold text-teal-600">
            Culture, Adventure & Tropical Escape
          </label>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs md:text-sm font-normal text-justify text-gray-600">
            From pristine beaches and emerald islands to vibrant cities and
            ancient temples, <strong>Thailand</strong> offers an unforgettable
            blend of natural beauty and rich cultural heritage. Whether you’re
            exploring bustling street markets, serene mountain regions, or
            tropical coastlines, every moment is filled with discovery.
          </p>

          <p className="text-xs md:text-sm font-normal text-justify text-gray-600">
            Known as the <i>Land of Smiles</i>, <strong>Thailand</strong> is a
            world-class destination for leisure, wellness, nightlife, and
            adventure. From iconic temples and floating markets to island
            hopping, culinary experiences, and modern city life, Thailand
            balances tradition and contemporary charm with ease.
          </p>
        </div>
      </div>

      {/* IMAGES */}
      <div className="flex flex-col gap-4">
        <div className="relative h-90 w-full">
          <Image
            src="/assets/hero/thailand-post.avif"
            alt="Thailand cityscape"
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
                alt={`Thailand experience ${i + 1}`}
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

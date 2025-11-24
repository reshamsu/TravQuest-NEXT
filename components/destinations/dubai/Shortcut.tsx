import React from "react";
import Link from "next/link";
import Image from "next/image";

const travelOptions = [
  {
    title: "ABU DHABI",
    description:
      "An island nation in South Asia, is renowned for its stunning landscapes, rich cultural heritage, and diverse wildlife.",
    img: "/assets/destinations/abu-dhabi-city.jpg",
    link: "/destinations/abu-dhabi",
  },
  {
    title: "FUJAIRAH",
    description:
      "A dynamic city-state in Southeast Asia, is celebrated for its modernity, diverse culture, and iconic skyline",
    img: "/assets/destinations/fujairah-castle.jpg",
    link: "/destinations/fujairah",
  },
  {
    title: "RAS AL KHAIMAH",
    description:
      "A captivating blend of vibrant street life, serene temples, and stunning natural beauty.",
    img: "/assets/destinations/ras-al-khaimah.jpg",
    link: "/destinations/ras-al-khaimah",
  },
];

const Shortcut = () => {
  return (
    <div className="bg-linear-to-b from-gray-100 via-[#ffffff] to-teal-700/20">
      <div className="max-w-6xl mx-auto flex flex-col gap-10 py-20 px-8 md:px-10 2xl:px-0">
        <div className="flex flex-col gap-4">
          {/* <label
            htmlFor=""
            className="text-base md:text-lg font-extrabold text-[#f2836f]"
          >
            DISCOVER THE ATTRACTION OF TRAVEL UAE
          </label> */}
          <h2 className="text-2xl md:text-3xl 2xl:text-3xl font-extrabold text-[#f2836f]">
            You may also check out{" "}
            <span className="text-teal-600">Other parts of UAE</span>
          </h2>
          <p className="text-sm md:text-base text-gray-500">
            From bustling metropolises to serene landscapes, our global
            adventure awaits. Pack your bags, follow the compass of wanderlust,
            and let the thrill of discovery guide your path. Together, we’ll
            explore diverse cultures, savor exotic flavors, and create memories
            that span continents
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {travelOptions.map((option, index) => (
            <div
              key={index}
              className="relative rounded-3xl overflow-hidden h-[55vh] hover:scale-105 duration-1000 group shadow-lg"
            >
              <Image
                src={option.img}
                alt={option.title}
                fill
                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/64 lg:bg-[#f2836f]/15 group-hover:bg-black/64 transition-all duration-1000"></div>

              <div className="relative z-10 h-full flex flex-col items-start text-start justify-end gap-4 p-8 text-white">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor=""
                    className="text-xs md:text-sm font-extrabold text-[#f2836f] duration-1000"
                  >
                    TEXT HERE
                  </label>
                  <h2 className="text-xl 2xl:text23xl font-extrabold">
                    {option.title}
                  </h2>
                </div>
                <p className="text-xs 2xl:text-xs font-semibold text-gray-100 line-clamp-3">
                  {option.description}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <Link
                    href={option.link}
                    className="select-none btn-godual-sm btn-dynamic"
                  >
                    See More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shortcut;

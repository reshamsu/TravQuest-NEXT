import React from "react";
import Link from "next/link";
import Image from "next/image";

const travelOptions = [
  {
    title: "ABU DHABI",
    description:
      "Capital of the UAE, known for opulent architecture and rich culture.",
    img: "/assets/destinations/abu-dhabi-city.jpg",
    link: "/discover/abu-dhabi",
  },
  {
    title: "DUBAI",
    description:
      "Glamorous city in the UAE, famous for its futuristic skyline and vibrant lifestyle.",
    img: "/assets/poster/event-burj-khalifa1.jpg",
    link: "/discover/dubai",
  },
  {
    title: "FUJAIRAH",
    description:
      "UAE's eastern emirate, known for its stunning coastline and historical sites.",
    img: "/assets/destinations/fujairah-castle.jpg",
    link: "/discover/fujairah",
  },
  {
    title: "RAS AL KHAIMAH",
    description:
      "UAE's northern emirate, known for its natural beauty and historical landmarks.",
    img: "/assets/destinations/ras-al-khaimah.jpg",
    link: "/discover/ras-al-khaimah",
  },
];

const Discovery = () => {
  return (
    <div className="bg-linear-to-b from-[#f2836f]/10 via-[#ffffff] to-[#ffffff]">
      <div className="max-w-6xl mx-auto flex flex-col gap-10 py-20 px-8 md:px-10 2xl:px-0">
        <div className="flex flex-col items-center text-center md:items-start md:text-start justify-center gap-2">
          <label
            htmlFor=""
            className="text-sm md:text-base font-extrabold text-[#f2836f]"
          >
            WHERE TIME-HONORED TRADITIONS EMBRACE THE FUTURE!
          </label>
          <h2 className="text-2xl md:text-4xl font-extrabold text-teal-600">
            DISCOVER THE UAE
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {travelOptions.map((option, index) => (
            <div
              key={index}
              className="relative rounded-3xl overflow-hidden h-70 2xl:h-90 group shadow-lg"
            >
              <Image
                src={option.img}
                alt={option.title}
                fill
                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-125"
              />

              <div className="absolute inset-0 bg-black/64 lg:bg-[#f2836f]/15 group-hover:bg-black/64 transition-all duration-1000"></div>

              <div className="relative z-10 h-full flex flex-col items-start text-start justify-end gap-4 p-8 md:p-10 text-white">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor=""
                    className="text-xs md:text-sm font-extrabold text-[#f2836f] duration-700"
                  >
                    TEXT HERE
                  </label>
                  <h2 className="text-xl 2xl:text-3xl font-extrabold">
                    {option.title}
                  </h2>
                </div>
                <p className="text-xs 2xl:text-sm font-semibold text-gray-100 line-clamp-3">
                  {option.description}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <Link
                    href="/"
                    className="select-none btn-outline-sm btn-dynamic"
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

export default Discovery;

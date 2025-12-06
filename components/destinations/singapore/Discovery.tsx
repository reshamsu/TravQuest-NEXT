import React from "react";
import Link from "next/link";
import Image from "next/image";

const travelOptions = [
  {
    title: "STAY",
    description:
      "An island nation in South Asia, is renowned for its stunning landscapes, rich cultural heritage, and diverse wildlife.",
    img: "/assets/poster/stay.avif",
    link: "/destinations/singapore",
  },
  {
    title: "PLAY",
    description:
      "A dynamic city-state in Southeast Asia, is celebrated for its modernity, diverse culture, and iconic skyline",
    img: "/assets/poster/play.jpg",
    link: "/destinations/singapore",
  },
  {
    title: "ICONIC MARVELS",
    description:
      "A captivating blend of vibrant street life, serene temples, and stunning natural beauty.",
    img: "/assets/poster/iconic.avif",
    link: "/destinations/singapore",
  },
  {
    title: "SHOP",
    description:
      "A dynamic city-state in Southeast Asia, is celebrated for its modernity, diverse culture, and iconic skyline",
    img: "/assets/poster/shop.avif",
    link: "/destinations/singapore",
  },
  {
    title: "MEET",
    description:
      "A captivating blend of vibrant street life, serene temples, and stunning natural beauty.",
    img: "/assets/poster/meet.jpg",
    link: "/destinations/singapore",
  },
];

const Shortcut = () => {
  return (
    <div className="bg-linear-to-b from-[#f2836f]/10 via-[#ffffff] to-[#ffffff]">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-10 py-20 px-8 md:px-10 2xl:px-0">
        <div className="flex flex-col gap-2.5">
          <label
            htmlFor=""
            className="text-sm md:text-lg font-semibold text-[#f2836f]"
          >
            EXPLORE THE REAL ATTRACTION OF SINGAPORE
          </label>
          <h2 className="text-2xl 2xl:text-3xl font-bold text-gray-700">
            Discover the Essence of{" "}
            <span className="text-teal-600">
              Luxury and Tradition in the Singapore
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {travelOptions.map((option, index) => (
            <div
              key={index}
              className="relative rounded-4xl overflow-hidden h-[55vh] md:h-[44vh] lg:h-[55vh] hover:scale-105 duration-1000 group shadow-lg"
            >
              <Image
                src={option.img}
                alt={option.title}
                fill
                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/64 lg:bg-[#f2836f]/15 group-hover:bg-black/64 transition-all duration-1000"></div>

              <div className="relative z-10 h-full flex flex-col items-start text-start justify-between gap-4 p-8 text-white">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor=""
                    className="text-xs md:text-sm font-bold text-[#f2836f] duration-1000"
                  >
                    TEXT HERE
                  </label>
                  <h2 className="playfair text-2xl md:text-xl 2xl:text-2xl font-bold">
                    {option.title}
                  </h2>
                </div>
                {/* <p className="text-xs 2xl:text-xs font-semibold text-gray-100 line-clamp-3">
                  {option.description}
                </p> */}
                <div className="flex items-center gap-4 text-sm">
                  <Link
                    href={option.link}
                    className="select-none btn-ogdual-sm btn-dynamic"
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

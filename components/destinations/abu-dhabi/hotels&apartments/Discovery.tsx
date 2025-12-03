import React from "react";
import Link from "next/link";
import Image from "next/image";

const travelOptions = [
  {
    title: "Emirates Palace",
    description:
      "A prestigious hotel with stunning views of the Arabian Gulf, known for its impeccable service and elegant accommodations.",
    img: "/assets/poster/abu-dhabi-emirates_palace.jpg",
    link: "/destinations/abu-dhabi/hotels&apartments",
  },
  {
    title: "The St. Regis Abu Dhabi",
    description:
      "A prestigious hotel with stunning views of the Arabian Gulf, known for its impeccable service and elegant accommodations.",
    img: "/assets/poster/abu-dhabi-st-regis.avif",
    link: "/destinations/abu-dhabi/hotels&apartments",
  },
  {
    title: "Jumeirah at Etihad Towers",
    description:
      "A prestigious hotel with stunning views of the Arabian Gulf, known for its impeccable service and elegant accommodations.",
    img: "/assets/poster/abu-dhabi-jumeirah.jpg",
    link: "/destinations/abu-dhabi/hotels&apartments",
  },
  {
    title: "The Ritz-Carlton Abu Dhabi - Grand Canal",
    description:
      "A prestigious hotel with stunning views of the Arabian Gulf, known for its impeccable service and elegant accommodations.",
    img: "/assets/poster/abu-dhabi-ritz-carlton.jpg",
    link: "/destinations/abu-dhabi/hotels&apartments",
  },
];

const Shortcut = () => {
  return (
    <div className="bg-linear-to-b from-[#f2836f]/10 via-[#ffffff] to-[#ffffff]">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-10 py-20 px-8 md:px-10 2xl:px-0">
        <div className="flex flex-col gap-3">
          <label
            htmlFor=""
            className="text-sm md:text-lg font-semibold text-[#f2836f]"
          >
            DISCOVER THE ATTRACTION OF ABU DHABI
          </label>
          <h2 className="text-2xl 2xl:text-3xl font-bold text-gray-700">
            Discover the Essence of{" "}
            <span className="text-teal-600">
              Luxury and Tradition in Abu Dhabi
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
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

              <div className="relative z-10 h-full flex flex-col items-start text-start justify-between gap-4 p-8 text-white">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor=""
                    className="text-xs md:text-sm font-bold text-[#f2836f] duration-1000"
                  >
                    TEXT HERE
                  </label>
                  <h2 className="text-2xl 2xl:text23xl font-bold">
                    {option.title}
                  </h2>
                </div>
                <div className="flex flex-col gap-6">
                  <p className="text-xs 2xl:text-xs font-semibold text-gray-100 line-clamp-3">
                    {option.description}
                  </p>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shortcut;

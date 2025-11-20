"use client";

import Link from "next/link";
import Image from "next/image";
import { TbHeart, TbChevronRight } from "react-icons/tb";

const destinations = [
  {
    img: "/assets/destinations/destinations-desert-safari.jpg",
    title: "Desert Safari Dubai",
    location: "France",
    description:
      "A romantic heartbeat of the world — stroll along the Seine, marvel at the Eiffel Tower, and let art and love fill your soul.",
  },
  {
    img: "/assets/destinations/dhow-cruise1.jpg",
    title: "Dhow Cruise",
    location: "Ontario, Canada",
    description:
      "Lakes, forests, and vibrant city life — Ontario balances breathtaking nature with the warm, buzzing energy of local culture.",
  },
  {
    img: "/assets/destinations/burj-khalifa.webp",
    title: "Burj Khalifa",
    location: "New Zealand",
    description:
      "Adventure calls from every peak and lake — Queenstown is nature’s playground, where thrill meets tranquility.",
  },
  {
    img: "/assets/destinations/dubai-frame.webp",
    title: "Dubai Frame",
    location: "Greece",
    description:
      "Sunset-kissed cliffs, white-washed homes, and the endless Aegean blue — Santorini is a dreamscape carved by the gods.",
  },
  {
    img: "/assets/destinations/img-world_of_adventure.jpg",
    title: "IMG Worlds of Adventure",
    location: "United Kingdom",
    description:
      "Where tradition meets trend — ride the London Eye, and wander through iconic streets that tell centuries of stories.",
  },
];

const Destinations = () => {
  return (
    <div className="bg-gray-100 text-gray-800 relative">
      <div className="max-w-6xl mx-auto pb-10 py-20 px-8 2xl:px-0 flex flex-col gap-14">
        <div className="flex flex-col items-center text-center justify-center gap-4">
          <label
            htmlFor=""
            className="text-sm md:text-base font-extrabold text-gray-600"
          >
            A DESTINATION THAT LEAVES A MARK ON YOUR SOUL
          </label>
          <h2 className="text-3xl 2xl:text-4xl font-extrabold text-teal-600">
            Unleash Your{" "}
            <span className="text-[#f2836f]">Adventurous Spirit</span>
          </h2>
          <p className="text-sm md:text-base text-gray-500 max-w-4xl">
            Whether you're interested in history, culture, luxury experiences,
            or outdoor adventures, the UAE has something for everyone. Here are
            our top recommendations for the month
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {destinations.map((dest, index) => (
            <div
              key={index}
              className="rounded-2xl overflow-hidden group transition"
            >
              <div className="w-full h-64 overflow-hidden relative rounded-3xl bg-gray-100">
                <Image
                  src={dest.img}
                  alt={dest.title}
                  fill
                  className="object-cover transform transition-transform duration-1000 group-hover:scale-125"
                />
                <div className="absolute inset-0 group-hover:bg-black/10 transition"></div>
              </div>
              <div className="py-4 px-1 flex flex-col gap-1">
                <label className="text-xs text-[#f2836f] font-bold">
                  Dubai
                </label>
                <h4 className="text-sm font-bold hover:text-black">
                  {dest.title}
                </h4>
                <p className="text-xs text-gray-400 line-clamp-2">
                  {dest.description}
                </p>

                <div className="flex items-center gap-4 text-sm">
                  <Link
                    href="/"
                    className="select-none btn-orange-sm btn-dynamic"
                  >
                    Explore
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

export default Destinations;

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const dubaiDestinations = [
  {
    img: "/assets/destinations/destinations-desert-safari.jpg",
    title: "Desert Safari Dubai",
    location: "Dubai",
    description:
      "Experience the desert dunes with thrilling rides and cultural shows.",
  },
  {
    img: "/assets/destinations/dhow-cruise1.jpg",
    title: "Dhow Cruise",
    location: "Dubai",
    description:
      "Relax on a traditional dhow with dinner and stunning skyline views.",
  },
  {
    img: "/assets/destinations/burj-khalifa.webp",
    title: "Burj Khalifa",
    location: "Dubai",
    description:
      "Visit the tallest building in the world with breathtaking views.",
  },
  {
    img: "/assets/destinations/dubai-frame.webp",
    title: "Dubai Frame",
    location: "Dubai",
    description: "A unique landmark connecting old and new Dubai.",
  },
  {
    img: "/assets/destinations/img-world_of_adventure.jpg",
    title: "IMG Worlds of Adventure",
    location: "Dubai",
    description:
      "The world’s largest indoor theme park packed with excitement.",
  },
];

const abuDhabiDestinations = [
  {
    img: "/assets/destinations/sheikh-zayed.jpg",
    title: "Sheikh Zayed Grand Mosque",
    location: "Abu Dhabi",
    description: "A masterpiece of Islamic architecture and cultural beauty.",
  },
  {
    img: "/assets/destinations/louvre.jpg",
    title: "Louvre Abu Dhabi",
    location: "Abu Dhabi",
    description: "A world-class museum blending global art and history.",
  },
  {
    img: "/assets/poster/event-ferrari-world.jpg",
    title: "Ferrari World",
    location: "Abu Dhabi",
    description:
      "Enjoy the world’s fastest roller coaster and thrilling rides.",
  },
  {
    img: "/assets/destinations/yas-island.jpg",
    title: "Yas Island",
    location: "Abu Dhabi",
    description: "A hub for luxury leisure, theme parks, and entertainment.",
  },
  {
    img: "/assets/destinations/qasr-al-watan1.avif",
    title: "Qasr Al Watan",
    location: "Abu Dhabi",
    description: "A royal palace showcasing UAE craftsmanship and heritage.",
  },
];

const Destinations = () => {
  const [activeCity, setActiveCity] = useState("dubai");

  const destinations =
    activeCity === "dubai" ? dubaiDestinations : abuDhabiDestinations;

  return (
    <div className="bg-gray-100 text-gray-800 relative">
      <div className="max-w-6xl mx-auto pb-10 py-20 px-8 2xl:px-0 flex flex-col items-center justify-center gap-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center justify-center gap-4">
          <label className="text-sm md:text-base font-bold text-gray-600">
            A DESTINATION THAT LEAVES A MARK ON YOUR SOUL
          </label>

          <h2 className="text-3xl 2xl:text-4xl text-teal-600">
            Unleash Your{" "}
            <span className="text-[#f2836f]">Adventurous Spirit</span>
          </h2>

          <p className="text-sm md:text-base text-gray-500 font-normal max-w-4xl">
            Whether you're interested in history, culture, luxury experiences,
            or outdoor adventures, the UAE has something for everyone.
          </p>
        </div>

        {/* Switch Buttons */}
        <div className="flex justify-center items-center bg-white shadow-lg rounded-full p-2 gap-2 border border-gray-100">
          <button
            onClick={() => setActiveCity("dubai")}
            className={`w-30 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all
      ${
        activeCity === "dubai"
          ? "bg-[#f2836f] text-white"
          : "hover:bg-[#f2836f]/20 text-gray-600"
      }`}
          >
            Dubai
          </button>

          <button
            onClick={() => setActiveCity("abu-dhabi")}
            className={`w-30 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all
      ${
        activeCity === "abu-dhabi"
          ? "bg-teal-600 text-white"
          : "hover:bg-teal-600/20 text-gray-600"
      }`}
          >
            Abu Dhabi
          </button>
        </div>

        {/* Cards */}
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
                  {dest.location}
                </label>

                <h4 className="text-[14px] font-bold text-gray-700">
                  {dest.title}
                </h4>

                <p className="text-xs text-gray-400 font-normal line-clamp-2">
                  {dest.description}
                </p>

                <div className="flex items-center gap-4 text-sm my-4 mx-2">
                  <Link
                    href={`/destinations/${activeCity}`}
                    className="select-none btn-orange-outline btn-dynamic"
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

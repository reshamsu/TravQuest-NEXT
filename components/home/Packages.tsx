"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants, Transition } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

interface Package {
  id: number;
  name: string;
  tagline: string;
  description: string;
  package_location: string[];
  image_urls: string[];
  created_at?: string;
}

const easeOut: Transition["ease"] = [0.25, 0.1, 0.25, 1];

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: easeOut },
  }),
};

const Packages: React.FC = () => {
  // ✅ HARD GUARD — prevents build crash
  if (!supabase) {
    return (
      <div className="p-10 text-center text-red-600">
        Supabase not configured. Check environment variables.
      </div>
    );
  }

  // ✅ Narrow once
  const sb = supabase;

  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);

      const { data, error } = await sb
        .from("packages")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching packages:", error.message);
        setPackages([]);
        setLoading(false);
        return;
      }

      const formatted: Package[] = data.map((row: any) => {
        let images: string[] = [];

        if (Array.isArray(row.image_urls)) images = row.image_urls;
        else if (typeof row.image_urls === "string") {
          try {
            images = JSON.parse(row.image_urls);
          } catch {
            images = [];
          }
        }

        return {
          id: row.id,
          name: row.name,
          tagline: row.tagline,
          description: row.description,
          package_location: row.package_location ?? [],
          image_urls: images,
          created_at: row.created_at,
        };
      });

      const dubaiOnly = formatted.filter((item) =>
        item.package_location.includes("Dubai")
      );

      setPackages(dubaiOnly);
      setLoading(false);
    };

    fetchPackages();
  }, [sb]);

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");
  // const dubaiDestinations = [
  //   {
  //     img: "/assets/destinations/destinations-desert-safari.jpg",
  //     title: "Desert Safari Dubai",
  //     location: "Dubai",
  //     description:
  //       "Experience the desert dunes with thrilling rides and cultural shows.",
  //   },
  //   {
  //     img: "/assets/destinations/dhow-cruise1.jpg",
  //     title: "Dhow Cruise",
  //     location: "Dubai",
  //     description:
  //       "Relax on a traditional dhow with dinner and stunning skyline views.",
  //   },
  //   {
  //     img: "/assets/destinations/burj-khalifa.webp",
  //     title: "Burj Khalifa",
  //     location: "Dubai",
  //     description:
  //       "Visit the tallest building in the world with breathtaking views.",
  //   },
  //   {
  //     img: "/assets/destinations/dubai-frame.webp",
  //     title: "Dubai Frame",
  //     location: "Dubai",
  //     description: "A unique landmark connecting old and new Dubai.",
  //   },
  //   {
  //     img: "/assets/destinations/img-world_of_adventure.jpg",
  //     title: "IMG Worlds of Adventure",
  //     location: "Dubai",
  //     description:
  //       "The world’s largest indoor theme park packed with excitement.",
  //   },
  // ];

  // const abuDhabiDestinations = [
  //   {
  //     img: "/assets/destinations/sheikh-zayed.jpg",
  //     title: "Sheikh Zayed Grand Mosque",
  //     location: "Abu Dhabi",
  //     description: "A masterpiece of Islamic architecture and cultural beauty.",
  //   },
  //   {
  //     img: "/assets/destinations/louvre.jpg",
  //     title: "Louvre Abu Dhabi",
  //     location: "Abu Dhabi",
  //     description: "A world-class museum blending global art and history.",
  //   },
  //   {
  //     img: "/assets/poster/event-ferrari-world.jpg",
  //     title: "Ferrari World",
  //     location: "Abu Dhabi",
  //     description:
  //       "Enjoy the world’s fastest roller coaster and thrilling rides.",
  //   },
  //   {
  //     img: "/assets/destinations/yas-island.jpg",
  //     title: "Yas Island",
  //     location: "Abu Dhabi",
  //     description: "A hub for luxury leisure, theme parks, and entertainment.",
  //   },
  //   {
  //     img: "/assets/destinations/qasr-al-watan1.avif",
  //     title: "Qasr Al Watan",
  //     location: "Abu Dhabi",
  //     description: "A royal palace showcasing UAE craftsmanship and heritage.",
  //   },
  // ];

  return (
    <div className="bg-gray-100 text-gray-800 relative">
      <div className="max-w-6xl mx-auto pb-10 py-20 px-8 2xl:px-0 flex flex-col items-center justify-center gap-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center justify-center gap-4">
          <label className="text-sm lg:text-base font-medium text-gray-800">
            A DESTINATION THAT LEAVES A MARK ON YOUR SOUL
          </label>

          <h2 className="playfair text-4xl 2xl:text-5xl font-bold text-teal-600">
            Unleash Your{" "}
            <span className="text-[#f2836f]">Adventurous Spirit</span>
          </h2>

          <p className="text-xs md:text-sm lg:text-base text-gray-600 font-normal max-w-4xl">
            Whether you're interested in history, culture, luxury experiences,
            or outdoor adventures, the UAE has something for everyone.
          </p>
        </div>

        {/* Switch Buttons
        <div className="flex justify-center items-center bg-white shadow-lg rounded-full p-2 gap-2 border border-gray-100">
          <button
            onClick={() => setActiveCity("dubai")}
            className={`w-30 py-2.5 rounded-full text-sm font-semibold cursor-pointer transition-all
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
            className={`w-30 py-2.5 rounded-full text-sm font-semibold cursor-pointer transition-all
      ${
        activeCity === "abu-dhabi"
          ? "bg-teal-600 text-white"
          : "hover:bg-teal-600/20 text-gray-600"
      }`}
          >
            Abu Dhabi
          </button>
        </div> */}

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {loading && (
            <p className="text-gray-500 col-span-full text-center">
              Loading packages...
            </p>
          )}

          {packages.map((pack, index) => (
            <motion.div
              key={pack.id}
              custom={index}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              className="rounded-2xl overflow-hidden group transition"
            >
              <div className="w-full h-64 overflow-hidden relative rounded-3xl bg-gray-100">
                <Image
                  src={pack.image_urls?.[0] || "/assets/banner/property1.webp"}
                  alt={pack.name}
                  fill
                  className="object-cover transform transition-transform duration-1000 group-hover:scale-125"
                />

                <div className="absolute inset-0 group-hover:bg-black/10 transition"></div>
              </div>

              <div className="py-4 px-1 flex flex-col gap-1">
                <label className="text-xs text-[#f2836f] font-bold">
                  {pack.package_location?.[0] ?? "Package"}
                </label>

                <h4 className="text-[14px] font-bold text-gray-700">
                  {pack.name}
                </h4>

                <p className="text-xs text-gray-500 font-normal line-clamp-2">
                  {pack.description}
                </p>

                <div className="flex items-center gap-4 text-sm my-4 mx-2">
                  <Link
                    href="/"
                    // href={`/packages/${slugify(pack.name)}`}
                    className="select-none btn-orange-outline btn-dynamic"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Packages;

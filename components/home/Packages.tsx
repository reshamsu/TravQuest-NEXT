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
  // ✅ ACTIVE SWITCH STATE
  const [activeCity, setActiveCity] = useState<"Dubai" | "Abu Dhabi">("Dubai");

  const [allPackages, setAllPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching packages:", error.message);
        setAllPackages([]);
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

      setAllPackages(formatted);
      setLoading(false);
    };

    fetchPackages();
  }, []);

  // ✅ FILTERED VIEW (reactive)
  const visiblePackages = allPackages.filter((pkg) =>
    pkg.package_location.includes(activeCity)
  );

  return (
    <div className="bg-gray-100 text-gray-800">
      <div className="max-w-6xl mx-auto pb-10 py-20 px-8 2xl:px-0 flex flex-col items-center justify-center gap-4">
        {/* Header */}
        <div className="text-center flex flex-col gap-3">
          <h2 className="playfair text-4xl 2xl:text-5xl font-bold text-teal-600">
            Unleash Your{" "}
            <span className="text-[#f2836f]">Adventurous Spirit</span>
          </h2>
          <label className="text-sm md:text-base 2xl:text-lg font-bold text-gray-600">
            A Destination that leaves a mark on your soul
          </label>
        </div>
        <p className="text-xs lg:text-sm font-normal text-center text-gray-600">
          Whether you're interested in history, culture, luxury experiences, or
          outdoor adventures, the UAE has something for everyone.
        </p>

        {/* ✅ SWITCH */}
        <div className="flex justify-center items-center bg-white shadow-lg rounded-full p-2 my-4 gap-2 border border-gray-100">
          {(["Dubai", "Abu Dhabi"] as const).map((city) => (
            <button
              key={city}
              onClick={() => setActiveCity(city)}
              className={`w-30 py-2.5 rounded-full text-sm font-semibold cursor-pointer transition-all
                ${
                  activeCity === city
                    ? city === "Dubai"
                      ? "bg-[#f2836f] text-white"
                      : "bg-teal-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {loading && (
            <p className="col-span-full text-center text-gray-500">
              Loading packages...
            </p>
          )}

          {!loading &&
            visiblePackages.map((pack, index) => (
              <motion.div
                key={pack.id}
                custom={index}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                className="rounded-2xl overflow-hidden group"
              >
                <div className="relative h-64 rounded-3xl overflow-hidden bg-gray-100">
                  <Image
                    src={
                      pack.image_urls?.[0] || "/assets/banner/property1.webp"
                    }
                    alt={pack.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="py-4 px-1 flex flex-col gap-1">
                  <span className="text-xs text-[#f2836f] font-bold">
                    {activeCity}
                  </span>

                  <h4 className="text-sm font-bold text-gray-700">
                    {pack.name}
                  </h4>

                  <p className="text-xs text-gray-500 line-clamp-2">
                    {pack.description}
                  </p>

                  <Link
                    href="/"
                    className="mt-3 select-none btn-orange-outline btn-dynamic"
                  >
                    Explore
                  </Link>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Packages;

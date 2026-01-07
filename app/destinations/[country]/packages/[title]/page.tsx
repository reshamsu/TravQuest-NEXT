"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants, Transition } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

interface Package {
  id: number;
  name: string;
  tagline: string | null;
  description: string | null;
  package_location: string[];
  image_urls: string[];
  created_at?: string;
}

/* ✅ SAFE SLUGIFY */
const slugify = (text?: string) =>
  text
    ? text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
    : "";

const easeOut: Transition["ease"] = [0.25, 0.1, 0.25, 1];

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: easeOut },
  }),
};

export default function Packages() {
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

      const formatted: Package[] = data.map((row: any) => ({
        id: row.id,
        name: row.name,
        tagline: row.tagline,
        description: row.description,
        package_location: row.package_location ?? [],
        image_urls: Array.isArray(row.image_urls)
          ? row.image_urls
          : [],
        created_at: row.created_at,
      }));

      setAllPackages(formatted);
      setLoading(false);
    };

    fetchPackages();
  }, []);

  if (loading) {
    return (
      <div className="h-[40vh] flex items-center justify-center text-gray-400">
        Loading packages…
      </div>
    );
  }

  const visiblePackages = allPackages.filter((pkg) =>
    pkg.package_location.includes(activeCity)
  );

  return (
    <div className="bg-gray-100 text-gray-800">
      <div className="max-w-6xl mx-auto py-20 px-8 2xl:px-0 flex flex-col gap-6">
        {/* Header */}
        <div className="text-center flex flex-col gap-2">
          <h2 className="playfair text-4xl font-bold text-teal-600">
            Unleash Your <span className="text-[#f2836f]">Adventure</span>
          </h2>
          <p className="text-sm text-gray-600">
            Handpicked experiences across the UAE
          </p>
        </div>

        {/* City Switch */}
        <div className="flex justify-center bg-white rounded-full shadow p-2 gap-2 w-fit mx-auto">
          {(["Dubai", "Abu Dhabi"] as const).map((city) => (
            <button
              key={city}
              onClick={() => setActiveCity(city)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {visiblePackages.map((pack, index) => (
            <motion.div
              key={pack.id}
              custom={index}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl transition"
            >
              <div className="relative h-56">
                <Image
                  src={pack.image_urls?.[0] || "/assets/banner/property1.webp"}
                  alt={pack.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 flex flex-col gap-2">
                <span className="text-xs font-bold text-[#f2836f]">
                  {activeCity}
                </span>

                <h4 className="text-sm font-bold text-gray-800">
                  {pack.name}
                </h4>

                <p className="text-xs text-gray-500 line-clamp-2">
                  {pack.description}
                </p>

                {/* ✅ CORRECT ROUTE */}
                <Link
                  href={`/packages/${slugify(pack.name)}`}
                  className="mt-3 inline-block text-sm font-semibold text-teal-600 hover:underline"
                >
                  Explore →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants, Transition } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

interface Destination {
  id: number;
  name: string;
  tagline: string;
  description: string;
  destination_area: string[];
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

const Destinations: React.FC = () => {
  // ✅ HARD GUARD — prevents build crash
  if (!supabase) {
    return (
      <div className="p-10 text-center text-red-600">
        Supabase not configured. Check environment variables.
      </div>
    );
  }

  // ✅ Narrow once for TS + runtime safety
  const sb = supabase;

  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);

      const { data, error } = await sb
        .from("destinations")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching destinations:", error.message);
        setDestinations([]);
        setLoading(false);
        return;
      }

      const formatted: Destination[] = data.map((row: any) => {
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
          destination_area: row.destination_area ?? [],
          image_urls: images,
          created_at: row.created_at,
        };
      });

      const uaeOnly = formatted.filter((item) =>
        item.destination_area.includes("UAE")
      );

      setDestinations(uaeOnly);
      setLoading(false);
    };

    fetchDestinations();
  }, [sb]);

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

  return (
    <div className="bg-linear-to-b from-gray-100 via-[#ffffff] to-teal-700/20">
      <div className="max-w-6xl mx-auto flex flex-col gap-4 py-20 px-8 md:px-10 2xl:px-0">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl lg:text-2xl 2xl:text-3xl font-bold uppercase text-gray-700">
            Let’s Travel Around the Globe…{" "}
            <span className="text-teal-600">One Destination at a Time</span>
          </h2>
          <label className="text-base lg:text-lg font-bold text-[#f2836f]">
            Where dreams take flight
          </label>
        </div>

        <p className="text-xs lg:text-sm font-normal text-justify text-gray-600">
          From bustling metropolises to serene landscapes, our global adventure
          awaits. Explore diverse cultures, savor exotic flavors, and create
          memories that span continents.
        </p>

        {/* DESTINATION GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {loading && (
            <p className="text-gray-500 col-span-full text-center">
              Loading destinations...
            </p>
          )}

          {!loading &&
            destinations.map((dest, index) => (
              <motion.div
                key={dest.id}
                custom={index}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                className="relative rounded-4xl overflow-hidden h-[55vh] hover:scale-105 duration-1000 group shadow-lg"
              >
                <Image
                  src={dest.image_urls?.[0] || "/assets/banner/property1.webp"}
                  alt={dest.name}
                  fill
                  className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/60 lg:bg-black/10 transition-all duration-700 group-hover:bg-black/70"></div>

                <div className="relative z-10 h-full flex flex-col justify-end gap-3.5 p-8 text-white">
                  <div>
                    <label className="text-sm font-semibold text-[#f2836f]">
                      {dest.destination_area?.[0] ?? "Destination"}
                    </label>
                    <h2 className="playfair text-2xl font-bold">{dest.name}</h2>
                  </div>

                  <p className="text-xs text-gray-300 line-clamp-3">
                    {dest.description}
                  </p>

                  <Link
                    href={`/destinations/${slugify(dest.name)}`}
                    className="btn-godual-sm btn-dynamic"
                  >
                    Discover More
                  </Link>
                </div>
              </motion.div>
            ))}
        </div>

        <span
          // onClick={scrollToTop}
          className="select-none btn-light-glass btn-dynamic mt-2"
        >
          Show more Destinations
        </span>
      </div>
    </div>
  );
};

export default Destinations;

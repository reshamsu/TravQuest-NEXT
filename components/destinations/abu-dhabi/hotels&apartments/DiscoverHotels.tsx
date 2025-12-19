"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants, Transition } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

interface Hotel {
  id: number;
  name: string;
  description: string;
  city: string;
  image_urls: string[];
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

const INITIAL_VISIBLE = 4;

const Shortcut = () => {
  // HARD GUARD
  if (!supabase) {
    return (
      <div className="p-10 text-center text-teal-600">
        Supabase not configured. Check environment variables.
      </div>
    );
  }

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      const { data, error } = await supabase
        .from("hotels")
        .select("id, name, description, city, image_urls")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching hotels:", error.message);
        setHotels([]);
      } else {
        setHotels(data || []);
      }

      setLoading(false);
    };

    fetchHotels();
  }, []);

  const visibleHotels = hotels.slice(0, visibleCount);
  const hasMore = hotels.length > visibleCount;

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

  if (loading) return null;

  return (
    <div className="bg-linear-to-b from-[#f2836f]/10 via-white to-white">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-10 py-20 px-8 md:px-10 2xl:px-0">
        {/* HEADER */}
        <div className="flex flex-col gap-3">
          <h2 className="playfair text-3xl 2xl:text-4xl font-bold text-teal-600">
            Discover the Essence of{" "}
            <span className="text-[#f2836f]">
              Luxury and Tradition in Abu Dhabi
            </span>
          </h2>
          <label className="text-sm md:text-base 2xl:text-lg font-bold text-gray-600">
            Explore the real attraction of Abu Dhabi
          </label>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {visibleHotels.map((hotel) => (
            <motion.div
              key={hotel.id}
              //  custom={index}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              className="relative rounded-4xl overflow-hidden h-[55vh] group shadow-lg hover:scale-105 duration-700"
            >
              <Image
                src={hotel.image_urls?.[0] || "/assets/placeholder.jpg"}
                alt={hotel.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/60 lg:bg-[#f2836f]/15 group-hover:bg-black/70 transition-all duration-1000" />

              <div className="relative z-10 h-full flex flex-col text-start justify-between p-8 text-white">
                <div className="flex flex-col items-start w-fit gap-1">
                  <label className="text-sm font-bold uppercase text-[#f2836f]">
                    {hotel.city}
                  </label>
                  <h2 className="playfair text-2xl font-bold">{hotel.name}</h2>
                </div>

                <div className="flex flex-col gap-6">
                  <p className="text-xs font-semibold text-gray-100 line-clamp-3">
                    {hotel.description}
                  </p>

                  <Link
                    href={`/hotels/${hotel.id}`}
                    className="select-none btn-ogdual-sm btn-dynamic"
                  >
                    See More
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SHOW MORE */}
        {hasMore && (
          <button
            onClick={() => setVisibleCount(hotels.length)}
            className="select-none btn-light-glass btn-dynamic"
          >
            Show more Hotels
          </button>
        )}
      </div>
    </div>
  );
};

export default Shortcut;

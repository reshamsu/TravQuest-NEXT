"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants, Transition } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

/* ================= TYPES ================= */

interface Hotel {
  id: number;
  name: string;
  description: string;
  city: string;
  image_urls: string[];
}

/* ================= ANIMATION ================= */

const easeOut: Transition["ease"] = [0.25, 0.1, 0.25, 1];

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.4,
      ease: easeOut,
    },
  }),
};

const INITIAL_VISIBLE = 4;

/* ================= COMPONENT ================= */

const Shortcut = () => {
  if (!supabase) {
    return (
      <div className="p-10 text-center text-red-600">
        Supabase not configured.
      </div>
    );
  }

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("hotels")
        .select("id, name, description, city, image_urls")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching hotels:", error.message);
        setHotels([]);
        setLoading(false);
        return;
      }

      /* ✅ Normalize image_urls safely */
      const normalized: Hotel[] = (data || []).map((row: any) => {
        let images: string[] = [];

        if (Array.isArray(row.image_urls)) {
          images = row.image_urls;
        } else if (typeof row.image_urls === "string") {
          try {
            images = JSON.parse(row.image_urls);
          } catch {
            images = [];
          }
        }

        return {
          id: row.id,
          name: row.name,
          description: row.description,
          city: row.city,
          image_urls: images,
        };
      });

      setHotels(normalized);
      setLoading(false);
    };

    fetchHotels();
  }, []);

  /* ================= STATE ================= */

  const visibleHotels = hotels.slice(0, visibleCount);
  const hasMore = hotels.length > visibleCount;

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">Loading hotels…</div>
    );
  }

  if (!hotels.length) {
    return (
      <div className="py-20 text-center text-gray-500">No hotels found.</div>
    );
  }

  /* ================= RENDER ================= */

  return (
    <div className="bg-linear-to-b from-[#f2836f]/10 via-white to-white">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-10 py-20 px-8 md:px-10 2xl:px-0">
        {/* HEADER */}
        <div className="flex flex-col gap-3">
          <h2 className="playfair text-3xl 2xl:text-4xl font-bold text-teal-600">
            Discover the Essence of{" "}
            <span className="text-[#f2836f]">Luxury and Tradition</span>
          </h2>
          <p className="text-sm md:text-base font-bold text-gray-600">
            Explore hand-picked hotels across premium destinations
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {visibleHotels.map((hotel, index) => (
            <motion.div
              key={hotel.id}
              custom={index}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              className="relative rounded-4xl overflow-hidden h-[55vh] group shadow-lg hover:scale-105 duration-700"
            >
              <Image
                src={hotel.image_urls[0] || "/assets/placeholder.jpg"}
                alt={hotel.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/60 lg:bg-[#f2836f]/15 group-hover:bg-black/70 transition-all duration-700" />

              <div className="relative z-10 h-full flex flex-col justify-between p-8 text-white text-left">
                <div>
                  <span className="text-xs font-bold uppercase text-[#f2836f]">
                    {hotel.city}
                  </span>
                  <h3 className="playfair text-2xl font-bold mt-1">
                    {hotel.name}
                  </h3>
                </div>

                <div className="flex flex-col gap-4">
                  <p className="text-xs font-semibold text-gray-100 line-clamp-3">
                    {hotel.description}
                  </p>

                  <Link
                    href={`/destinations/abu-dhabi/hotels-apartments/hotels/${hotel.id}`}
                    className="btn-ogdual-sm btn-dynamic w-fit"
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
            className="btn-light-glass btn-dynamic mt-6"
          >
            Show more hotels
          </button>
        )}
      </div>
    </div>
  );
};

export default Shortcut;

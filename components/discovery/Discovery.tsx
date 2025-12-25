"use client";

import { useEffect, useState } from "react";
import { motion, Variants, Transition } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

interface Discover {
  id: number;
  header: string;
  tagline: string;
  description: string;
  city: string[];
  image_urls: string[];
}

interface DiscoveryProps {
  city: string;
}

const slugify = (text: string) =>
  text
  .toLowerCase()
    .replace(/-/g, " ")
    .replace(/\band\b/g, "&")
    .replace(/\b\w/g, (c) => c.toUpperCase());

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

export default function Discover({ city }: DiscoveryProps) {
  const [items, setItems] = useState<Discover[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase || !city) {
      setLoading(false);
      return;
    }

    const fetchDiscoveries = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("discovery")
        .select("id, header, tagline, description, city, image_urls")
        .contains("city", [city]);

      if (error) {
        console.error("Discovery fetch failed:", error);
        setItems([]);
      } else {
        setItems(data ?? []);
      }

      setLoading(false);
    };

    fetchDiscoveries();
  }, [city]);

  if (loading) {
    return <div className="py-20 text-center">Loading discovery…</div>;
  }

  if (!items.length) {
    return (
      <div className="py-20 text-center text-gray-400">
        No discoveries found for <strong>{city}</strong>
      </div>
    );
  }

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = items.length > visibleCount;

  return (
    <div className="bg-linear-to-b from-[#f2836f]/10 via-[#ffffff] to-[#ffffff]">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-10 py-20 px-8 md:px-10 2xl:px-0">
        {/* HEADER */}
        <div className="flex flex-col gap-3">
          <h2 className="playfair text-3xl 2xl:text-4xl font-bold text-teal-600">
            Discover the Essence of{" "}
            <span className="text-[#f2836f]">
              Luxury and Tradition in the {city}
            </span>
          </h2>
          <label
            htmlFor=""
            className="text-sm md:text-base 2xl:text-lg font-bold text-gray-600"
          >
            Explore the real attraction of {city}
          </label>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {visibleItems.map((item, index) => (
            <motion.div
              key={item.id}
              custom={index}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              className="relative rounded-4xl overflow-hidden h-[55vh] hover:scale-105 duration-1000 group shadow-lg"
            >
              <Image
                src={item.image_urls?.[0] ?? "/assets/placeholder.webp"}
                alt={item.header}
                fill
                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/64 lg:bg-[#f2836f]/15 group-hover:bg-black/64 transition-all duration-1000" />

              <div className="relative z-10 h-full flex flex-col items-start text-start justify-between gap-4 p-8 text-white">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-extrabold uppercase text-[#f2836f]">
                    {item.tagline}
                  </label>
                  <h3 className="playfair text-xl font-bold">{item.header}</h3>
                </div>

                <div>
                  <p className="text-xs text-gray-300 line-clamp-3 mb-4">
                    {item.description}
                  </p>
                  <Link
                    href={`/destinations/${slugify(city)}/discover/${slugify(
                      item.header
                    )}`}
                    className="select-none btn-ogdual-sm btn-dynamic"
                  >
                    Discover Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SHOW MORE */}
        {hasMore && (
          <button
            onClick={() => setVisibleCount(items.length)}
            className="self-center btn-light-glass"
          >
            Show more discoveries
          </button>
        )}
      </div>
    </div>
  );
}

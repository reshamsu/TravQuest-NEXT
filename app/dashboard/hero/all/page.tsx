"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants, Transition } from "framer-motion";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

interface Hero {
  id: number;
  title: string;
  subtitle: string;
  image_urls: string[];
  page_type: string[];
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

const HeroAdmin = () => {
  if (!supabase) {
    return (
      <div className="p-10 text-center text-teal-600">
        Supabase not configured.
      </div>
    );
  }

  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroes = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("hero")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching hero:", error.message);
        setHeroes([]);
        setLoading(false);
        return;
      }

      const formatted: Hero[] = data.map((row: any) => {
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
          title: row.title,
          subtitle: row.subtitle,
          image_urls: images,
          page_type: Array.isArray(row.page_type) ? row.page_type : [],
          created_at: row.created_at,
        };
      });

      setHeroes(formatted);
      setLoading(false);
    };

    fetchHeroes();
  }, []);

  return (
    <div className="bg-gray-100 text-gray-700">
      <div className="max-w-6xl mx-auto lg:ml-80 pt-24 lg:pt-16 pb-10 px-6 md:px-10 lg:px-0 flex flex-col gap-6">
        {/* Header */}
         <div className="flex flex-col gap-1">
          <h2 className="playfair text-3xl font-bold text-teal-600">
            All <span className="text-[#f2836f]">Hero Sections</span>
          </h2>
          <label className="text-base lg:text-lg font-bold">
            Find all your website hero's here.
          </label>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          {loading && (
            <p className="col-span-full text-center text-gray-500">
              Loading hero sections...
            </p>
          )}

          {!loading &&
            heroes.map((hero, index) => (
              <motion.div
                key={hero.id}
                custom={index}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                className="rounded-2xl overflow-hidden group"
              >
                <div className="relative h-64 rounded-3xl overflow-hidden bg-gray-100">
                  <Image
                    src={hero.image_urls?.[0] || "/assets/banner/property1.webp"}
                    alt={hero.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="py-4 px-1 flex flex-col gap-1">
                  {hero.page_type.length > 0 && (
                    <span className="text-xs text-[#f2836f] font-bold">
                      {hero.page_type.join(" · ")}
                    </span>
                  )}

                  <h4 className="text-base font-bold text-gray-700">
                    {hero.title}
                  </h4>

                  <p className="text-xs text-gray-500 line-clamp-2">
                    {hero.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HeroAdmin;

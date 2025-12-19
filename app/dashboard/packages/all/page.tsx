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
  if (!supabase) {
    return (
      <div className="p-10 text-center text-teal-600">
        Supabase not configured. Check environment variables.
      </div>
    );
  }

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
          package_location: Array.isArray(row.package_location)
            ? row.package_location
            : [],
          image_urls: images,
          created_at: row.created_at,
        };
      });

      setPackages(formatted);
      setLoading(false);
    };

    fetchPackages();
  }, [sb]);

  return (
    <div className="bg-gray-100 text-gray-800">
      <div className="max-w-6xl mx-auto lg:ml-80 pt-24 lg:pt-16 pb-10 px-6 md:px-10 lg:px-0 flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h2 className="playfair text-3xl font-bold text-teal-600">
            All <span className="text-[#f2836f]">Packages</span>
          </h2>
          <label className="text-base lg:text-lg font-bold">
            Find all your website packages here.
          </label>
        </div>

        <p className="text-xs lg:text-sm font-normal text-justify text-gray-600">
          From bustling metropolises to serene landscapes, our global adventure
          awaits.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-4">
          {loading && (
            <p className="col-span-full text-center text-gray-500">
              Loading packages...
            </p>
          )}

          {!loading &&
            packages.map((pack, index) => (
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
                  {pack.package_location.length > 0 && (
                    <span className="text-xs text-[#f2836f] font-bold">
                      {pack.package_location.join(" · ")}
                    </span>
                  )}

                  <h4 className="text-sm font-bold text-gray-700">
                    {pack.name}
                  </h4>

                  <p className="text-xs text-gray-500 line-clamp-2">
                    {pack.description}
                  </p>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Packages;

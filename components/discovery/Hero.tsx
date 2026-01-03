"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

interface Discover {
  header: string;
  description: string;
  image_urls: string[];
}

export default function Hero() {
  const { header } = useParams<{ header: string }>();
  const [data, setData] = useState<Discover | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!header) return;

    const fetchDiscovery = async () => {
      const formattedName = header
        .toLowerCase()
        .replace(/-/g, " ")
        .replace(/\band\b/g, "&")
        .replace(/\b\w/g, (c) => c.toUpperCase());

      const { data, error } = await supabase
        .from("discovery")
        .select("header, description, image_urls")
        .ilike("header", formattedName);

      if (error || !data) {
        notFound();
        return;
      }

      setData(data[0]);
    };

    fetchDiscovery();
  }, [header]);

  if (!data) {
    return (
      <div className="h-[70vh] flex items-center justify-center text-gray-500">
        Loading discovery…
      </div>
    );
  }

  const images = data.image_urls ?? [];

  return (
    <div className="relative h-[70vh] w-full overflow-hidden flex justify-center text-center">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image src={img} alt={data.header} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ))}

      {images.length > 1 && (
        <>
          <button
            onClick={() =>
              setCurrent((c) => (c - 1 + images.length) % images.length)
            }
            className="hidden xl:flex absolute top-1/2 left-6 -translate-y-1/2 text-white z-20"
          >
            <TbChevronLeft size={42} />
          </button>

          <button
            onClick={() => setCurrent((c) => (c + 1) % images.length)}
            className="hidden xl:flex absolute top-1/2 right-6 -translate-y-1/2 text-white z-20"
          >
            <TbChevronRight size={42} />
          </button>
        </>
      )}

      <div className="absolute inset-0 flex flex-col justify-center items-center gap-6 text-white pt-24 z-10 px-8 md:px-10 2xl:px-0">
        <h1 className="playfair text-4xl lg:text-5xl font-bold">
          {data.header}
        </h1>
        <p className="text-xs md:text-sm text-gray-200 max-w-3xl">
          {data.description}
        </p>
      </div>
    </div>
  );
}

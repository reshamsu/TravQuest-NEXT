"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

interface Destination {
  country: string;
  tagline: string;
  image_urls: string[];
}

export default function Hero() {
  const { country } = useParams<{ country: string }>();
  const [data, setData] = useState<Destination | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!country) return;

    const fetchDestination = async () => {
      const formattedName = country
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

      const { data, error } = await supabase
        .from("destinations")
        .select("country, tagline, image_urls")
        .eq("country", formattedName)
        .maybeSingle();

      if (error || !data) {
        notFound();
        return;
      }

      setData(data);
    };

    fetchDestination();
  }, [country]);

  if (!data) {
    return (
      <div className="h-[70vh] flex items-center justify-center text-gray-500">
        Loading destination…
      </div>
    );
  }

  const images = data.image_urls;

  return (
    <div className="relative h-[74vh] w-full overflow-hidden flex justify-center text-center">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image src={img} alt={data.country} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/20 lg:bg-[#f2836f]/10 group-hover:bg-black/64 transition-all duration-1000" />
        </div>
      ))}

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

      {/* Text */}
      <div className="max-w-6xl mx-auto absolute inset-0 flex flex-col justify-center items-center text-center gap-4 text-white z-10 pt-22 px-8">
        <h1 className="playfair text-5xl md:text-6xl font-bold">{data.country}</h1>
        <p className="text-xs md:text-sm text-gray-200 max-w-3xl">
          {data.tagline}
        </p>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

interface Discover {
  title: string;
  subtitle: string;
  body: string;
  image_collages: string[];
}

const deslugify = (header: string) =>
  header
    .toLowerCase()
    .replace(/-/g, " ")
    .replace(/\band\b/g, "&")
    .replace(/\b\w/g, (c) => c.toUpperCase());

const Welcome = () => {
  // IMPORTANT: this must match your route folder name: [slug]
  const { header } = useParams<{ header: string }>();

  const [data, setData] = useState<Discover | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!header || !supabase) return;

    const fetchDiscovery = async () => {
      setLoading(true);

      const headerValue = deslugify(header);

      const { data, error } = await supabase
        .from("discovery")
        .select("title, subtitle, body, image_collages")
        .ilike("header", headerValue) // ✅ CORRECT
        .single();

      if (error) {
        console.error("Welcome fetch failed:", error);
        setLoading(false);
        return;
      }

      setData(data);
      setLoading(false);
    };

    fetchDiscovery();
  }, [header]);

  if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center text-gray-500">
        Loading introduction…
      </div>
    );
  }

  if (!data) return null;

  const images = data.image_collages ?? [];

  return (
    <div className="max-w-6xl mx-auto py-16 md:py-22 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 px-8 md:px-10 2xl:px-0">
      {/* CONTENT */}
      <div className="flex flex-col justify-center gap-4 md:gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl 2xl:text-4xl font-bold uppercase text-[#f2836f]">
            {data.title}
          </h2>
          <label className="text-base lg:text-lg font-bold text-teal-600">
            {data.subtitle}
          </label>
        </div>

        <p className="text-xs md:text-sm font-normal text-justify text-gray-600 whitespace-pre-line">
          {data.body}
        </p>
      </div>

      {/* IMAGES */}
      <div className="flex flex-col gap-4">
        {images[0] && (
          <div className="relative h-90 w-full">
            <Image
              src={images[0]}
              alt={data.title}
              fill
              className="object-cover rounded-4xl"
            />
            <div className="absolute inset-0 hover:bg-black/15 rounded-4xl duration-700" />
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.slice(1, 4).map((src, i) => (
            <div key={i} className="relative h-[120px] w-full">
              <Image
                src={src}
                alt={`${data.title} highlight ${i + 1}`}
                fill
                className="object-cover rounded-3xl"
              />
              <div className="absolute inset-0 hover:bg-black/15 rounded-3xl duration-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Welcome;

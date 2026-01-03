"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

interface Background {
  section3_title: string | null;
  section3_subtitle: string | null;
  section3_body: string | null;
  section3_image_urls: string[] | null;
}

const Background = () => {
  const [data, setData] = useState<Background | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSection3 = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("hero")
        .select(
          "section3_title, section3_subtitle, section3_body, section3_image_urls"
        )
        .contains("hero_page_type", ["Homepage"])
        .limit(1);

      if (!error && data) {
        setData(data[0]);
      }

      setLoading(false);
    };

    fetchSection3();
  }, []);

  if (!data || loading) {
    return (
      <div className="h-[40vh] flex items-center justify-center text-gray-500">
        .
      </div>
    );
  }

  const image = data.section3_image_urls?.[0];

  return (
    <div className="bg-linear-to-b from-[#ffffff] via-[#ffffff] to-[#f2836f]/10">
      <div className="max-w-6xl mx-auto py-4 md:pt-8 pb-20 px-8 md:px-10 2xl:px-0">
        {/* BACKGROUND IMAGE */}
        {image && (
          <div className="relative h-[44vh] lg:h-[60vh] rounded-4xl w-full transition-all duration-1000 bg-gray-100">
            <Image
              src={image}
              alt={data.section3_title ?? "Section background"}
              fill
              className="object-cover rounded-3xl"
              priority
            />
            <div className="absolute inset-0 bg-white/15 hover:bg-black/15 rounded-4xl transition-all duration-700" />
          </div>
        )}

        {/* CONTENT CARD */}
        <div className="max-w-4xl mx-4 lg:ml-20 -mt-20 bg-white p-7 md:p-10 lg:p-12 hover:scale-105 duration-1000 shadow-xl border-2 border-gray-100 rounded-4xl flex flex-col items-center text-center md:items-start md:text-start justify-center gap-4 relative">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold uppercase text-[#f2836f]">
              {data.section3_title}
            </h2>
            <label className="text-sm md:text-base lg:text-lg font-bold text-teal-600">
              {data.section3_subtitle}
            </label>
          </div>

          <p className="whitespace-pre-line text-xs lg:text-sm font-normal text-center md:text-justify text-gray-600">
            {data.section3_body}
          </p>

          <div className="flex items-center mt-2">
            <Link
              href="/explore-uae"
              className="select-none btn-orange-base btn-dynamic"
            >
              Explore UAE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Background;

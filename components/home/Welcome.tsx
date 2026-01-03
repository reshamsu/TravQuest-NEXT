"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

interface Welcome {
  section2_title: string | null;
  section2_subtitle: string | null;
  section2_body: string | null;
  section2_image_collages: string[] | null;
}

const Welcome = () => {
  const [data, setData] = useState<Welcome | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSection2 = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("hero")
        .select(
          "section2_title, section2_subtitle, section2_body, section2_image_collages"
        )
        .contains("hero_page_type", ["Homepage"])
        .limit(1);

      if (!error && data) {
        setData(data[0]);
      }

      setLoading(false);
    };

    fetchSection2();
  }, []);

  if (!data || loading) {
    return (
      <div className="h-[40vh] flex items-center justify-center text-gray-500">
        .
      </div>
    );
  }

  const images = data.section2_image_collages ?? [];

  return (
    <div className="bg-linear-to-b from-white via-white to-white">
      <div className="max-w-6xl mx-auto py-16 md:py-22 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 px-8 md:px-10 2xl:px-0">
        {/* IMAGES */}
        <div className="grid grid-cols-2 gap-5">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative h-[180px] lg:h-[200px] rounded-3xl w-full bg-gray-100"
            >
              <Image
                src={img}
                alt={`Section 2 image ${index + 1}`}
                fill
                className="object-cover rounded-3xl"
              />
              <div className="absolute inset-0 bg-white/10 hover:bg-black/15 rounded-3xl duration-500" />
            </div>
          ))}
        </div>

        {/* TEXT */}
        <div className="flex flex-col justify-center gap-4 xl:gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl 2xl:text-4xl font-bold uppercase text-[#f2836f]">
              {data.section2_title}
            </h2>
            <label className="text-base lg:text-lg font-bold text-teal-600">
              {data.section2_subtitle}
            </label>
          </div>

          <p className="whitespace-pre-line text-xs lg:text-sm font-normal text-justify text-gray-600">
            {data.section2_body}
          </p>

          <Link
            href="/about"
            className="select-none btn-green-base btn-dynamic"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

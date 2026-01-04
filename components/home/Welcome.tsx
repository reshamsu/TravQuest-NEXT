"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

interface WelcomeData {
  section2_title: string | null;
  section2_subtitle: string | null;
  section2_body: string | null;
  section2_image_collages: string[] | null;
}

const AUTO_DELAY = 4500;

const Welcome = () => {
  const [data, setData] = useState<WelcomeData | null>(null);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSection2 = async () => {
      const { data, error } = await supabase
        .from("hero")
        .select(
          "section2_title, section2_subtitle, section2_body, section2_image_collages"
        )
        .contains("hero_page_type", ["Homepage"])
        .limit(1)
        .single();

      if (!error && data) {
        setData(data);
      }

      setLoading(false);
    };

    fetchSection2();
  }, []);

  useEffect(() => {
    if (!data?.section2_image_collages?.length) return;

    const interval = setInterval(() => {
      setActive((prev) =>
        prev === data.section2_image_collages!.length - 1 ? 0 : prev + 1
      );
    }, AUTO_DELAY);

    return () => clearInterval(interval);
  }, [data]);

  if (loading || !data) {
    return (
      <div className="h-[40vh] flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  const images = data.section2_image_collages ?? [];

  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto py-16 md:py-22 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 px-8 md:px-10 2xl:px-0">
        {/* SLIDER */}
        <div className="relative h-[400px] flex items-center justify-center overflow-hidden rounded-4xl">
          {images.map((src, i) => {
            const offset = i - active;
            if (Math.abs(offset) > 2) return null;

            return (
              <div
                key={i}
                className="absolute transition-all duration-700 ease-out rounded-4xl"
                style={{
                  transform: `
                    translateX(${offset * 80}px)
                    scale(${i === active ? 1 : 0.75})
                  `,
                  opacity: i === active ? 1 : 0.6,
                  zIndex: 10 - Math.abs(offset),
                }}
              >
                <div className="relative h-[360px] md:h-[400px] w-[280px] lg:w-[400px] rounded-4xl overflow-hidden shadow-4xl">
                  <Image
                    src={src}
                    alt={`Destination ${i + 1}`}
                    fill
                    className="object-cover rounded-4xl"
                    priority={i === active}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/10 rounded-4xl" />
                </div>
              </div>
            );
          })}
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
            Explore Destinations
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Welcome;

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

/* ----------------------------------
   FALLBACKS
----------------------------------- */
const FALLBACK_TITLE = "Discover the Soul of Sri Lanka";
const FALLBACK_SUBTITLE = "Nature, Heritage & Timeless Beauty";
const FALLBACK_BODY = `
Blessed with golden beaches, misty hill country, lush tea plantations,
and abundant wildlife, Sri Lanka is a destination rich in natural beauty
and cultural depth. From serene coastal towns to vibrant local markets
and ancient cities, every journey here feels authentic and unforgettable.
`;
const FALLBACK_IMAGES = [
  "/assets/poster/sri-lanka-lotus_tower2.jpg",
  "/assets/poster/sri-lanka-hills.jpg",
  "/assets/poster/sri-lanka-train_ride.jpg",
  "/assets/poster/sri-lanka-elephant_tour.jpg",
];

interface DestinationRow {
  title: string;
  subtitle: string;
  body: string;
  image_collage: string[];
}

const Intro = () => {
  const [title, setTitle] = useState(FALLBACK_TITLE);
  const [subtitle, setSubtitle] = useState(FALLBACK_SUBTITLE);
  const [body, setBody] = useState(FALLBACK_BODY);
  const [images, setImages] = useState<string[]>(FALLBACK_IMAGES);

  useEffect(() => {
    if (!supabase) return;

    const fetchWelcome = async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select("title, subtitle, body, image_collage")
        .ilike("name", "Sri Lanka")
        .limit(1)
        .single();

      if (error || !data) {
        console.warn("Using fallback welcome content");
        return;
      }

      const row = data as DestinationRow;

      if (row.title) setTitle(row.title);
      if (row.subtitle) setSubtitle(row.subtitle);
      if (row.body) setBody(row.body);
      if (row.image_collage?.length) setImages(row.image_collage);
    };

    fetchWelcome();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-16 md:py-22 grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-24 px-8 md:px-10 2xl:px-0">
      {/* CONTENT */}
      <div className="flex flex-col justify-center gap-4 lg:gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl 2xl:text-4xl font-bold uppercase text-[#f2836f]">
            {title}
          </h2>
          <label className="text-base lg:text-lg font-bold text-teal-600">
            {subtitle}
          </label>
        </div>

        <p className="text-xs md:text-sm font-normal text-justify text-gray-600">
          {body}
        </p>
      </div>

      {/* IMAGES */}
      <div className="flex flex-col gap-4">
        {/* MAIN IMAGE */}
        <div className="relative h-90 w-full">
          <Image
            src={images[0]}
            alt={title}
            fill
            className="object-cover rounded-3xl"
          />
          <div className="absolute inset-0 bg-white/10 hover:bg-black/15 rounded-2xl duration-500" />
        </div>

        {/* COLLAGE */}
        <div className="grid grid-cols-3 gap-4">
          {images.slice(1, 4).map((src, i) => (
            <div
              key={i}
              className="relative h-[120px] rounded-3xl w-full bg-gray-100"
            >
              <Image
                src={src}
                alt={`${title} experience ${i + 1}`}
                fill
                className="object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-white/15 hover:bg-black/15 rounded-2xl duration-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Intro;

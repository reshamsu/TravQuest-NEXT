"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

/* =====================================================
   FALLBACKS — COMMENTED ON PURPOSE
   -----------------------------------------------------
   ❌ These are intentionally NOT USED
   ❌ If DB fails, UI will reflect it clearly
===================================================== */

// const FALLBACK_TITLE = "Discover the Soul of Sri Lanka";
// const FALLBACK_SUBTITLE = "Nature, Heritage & Timeless Beauty";
// const FALLBACK_BODY = `Sri Lanka description fallback`;
// const FALLBACK_IMAGES = [
//   "/assets/poster/sri-lanka-lotus_tower2.jpg",
//   "/assets/poster/sri-lanka-hills.jpg",
//   "/assets/poster/sri-lanka-train_ride.jpg",
//   "/assets/poster/sri-lanka-elephant_tour.jpg",
// ];

/* =====================================================
   EXPECTED DATABASE SHAPE
===================================================== */
interface Destination {
  title: string | null;
  subtitle: string | null;
  body: string | null;
  image_collage: string[] | null;
}

const Welcome = () => {
  /* ===================================================
     STATE — STARTS EMPTY
     ---------------------------------------------------
     If DB does not return data, UI stays empty
     (this is intentional for debugging)
  =================================================== */

  const [title, setTitle] = useState<string | null>(null);
  const [subtitle, setSubtitle] = useState<string | null>(null);
  const [body, setBody] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      console.error("Supabase client not available");
      setLoading(false);
      return;
    }

    const fetchWelcome = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("destinations")
        .select("title, subtitle, body, image_collages")
        .eq("name", "Sri Lanka")
        .maybeSingle();

      if (error) {
        console.error("Supabase error:", error.message);
        setLoading(false);
        return;
      }

      if (!data) {
        console.warn("No destination row found for Sri Lanka");
        setLoading(false);
        return;
      }

      /* Apply DB values strictly */
      setTitle(data.title ?? null);
      setSubtitle(data.subtitle ?? null);
      setBody(data.body ?? null);

      if (Array.isArray(data.image_collages)) {
        setImages(data.image_collages);
      }

      setLoading(false);
    };

    fetchWelcome();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading destination content…
      </div>
    );
  }

  if (!title && !body) {
    return (
      <div className="py-20 text-center text-red-500">
        Destination content not found in database.
      </div>
    );
  }

  /* ===================================================
     RENDER
  =================================================== */

  return (
    <div className="max-w-6xl mx-auto py-16 md:py-22 grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-24 px-8 md:px-10 2xl:px-0">
      {/* ================= CONTENT ================= */}
      <div className="flex flex-col justify-center gap-4 lg:gap-6">
        <div className="flex flex-col gap-1">
          {title && (
            <h2 className="text-3xl 2xl:text-4xl font-bold uppercase text-[#f2836f]">
              {title}
            </h2>
          )}

          {subtitle && (
            <label className="text-base lg:text-lg font-bold text-teal-600">
              {subtitle}
            </label>
          )}
        </div>

        {body && (
          <p className="text-xs md:text-sm font-normal text-justify text-gray-600">
            {body}
          </p>
        )}
      </div>

      {/* ================= IMAGES ================= */}
      <div className="flex flex-col gap-4">
        {/* MAIN IMAGE */}
        {images[0] && (
          <div className="relative h-90 w-full">
            <Image
              src={images[0]}
              alt={title ?? "Destination image"}
              fill
              className="object-cover rounded-3xl"
            />
          </div>
        )}

        {/* COLLAGE */}
        {images.length > 1 && (
          <div className="grid grid-cols-3 gap-4">
            {images.slice(1, 4).map((src, i) => (
              <div
                key={i}
                className="relative h-[120px] rounded-3xl w-full bg-gray-100"
              >
                <Image
                  src={src}
                  alt={`Destination image ${i + 1}`}
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;

"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { TbMapPin, TbChecks, TbStar } from "react-icons/tb";

/* ---------------- TYPES ---------------- */

interface Hotel {
  id: number;
  created_at: string;
  name: string;
  introduction: string;
  highlights: string;
  description: string;
  city: string;
  attractions: string[];
  facilities: string[];
  room_rates: string;
  image_urls: string[];
}

/* ---------------- HELPERS ---------------- */

// VERY IMPORTANT: do NOT try to reconstruct punctuation
const deslugifyLoose = (slug: string) =>
  slug.replace(/-+/g, " ").replace(/\s+/g, " ").trim();

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/* ---------------- COMPONENT ---------------- */

export default function Page() {
  const { name } = useParams<{ name?: string }>();

  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  /* ---------------- FETCH ---------------- */

  useEffect(() => {
    if (!name) return;

    const fetchHotel = async () => {
      setLoading(true);

      const searchName = deslugifyLoose(name);

      const { data, error } = await supabase
        .from("hotels")
        .select("*")
        .ilike("name", `%${searchName}%`)
        .single();

      if (error || !data) {
        console.error("Hotel fetch failed:", error);
        setHotel(null);
        setLoading(false);
        return;
      }

      const normalizeArray = (value: any): string[] =>
        Array.isArray(value)
          ? value
          : typeof value === "string"
          ? (() => {
              try {
                return JSON.parse(value);
              } catch {
                return [];
              }
            })()
          : [];

      setHotel({
        ...data,
        attractions: normalizeArray(data.attractions),
        facilities: normalizeArray(data.facilities),
        image_urls: normalizeArray(data.image_urls),
      });

      setLoading(false);
    };

    fetchHotel();
  }, [name]);

  /* ---------------- GUARDS ---------------- */

  if (loading || !hotel) {
    return (
      <div className="h-[70vh] flex items-center justify-center text-gray-500">
        Loading Hotel…
      </div>
    );
  }

  /* ---------------- SAFE DERIVED VALUES ---------------- */

  const images =
    hotel.image_urls.length > 0
      ? hotel.image_urls
      : ["/assets/hero/placeholder.jpg"];

  const citySlug = typeof hotel.city === "string" ? slugify(hotel.city) : "";

  /* ---------------- TOUCH ---------------- */

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 75) {
      setCurrentIndex((i) => (i + 1) % images.length);
    } else if (touchEndX.current - touchStartX.current > 75) {
      setCurrentIndex((i) => (i - 1 + images.length) % images.length);
    }
  };

  const hotelSlug = slugify(hotel.name);

  const shareUrl = `https://thetravquest.com/destinations/${citySlug}/hotels/${hotelSlug}`;

  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(
    `Check out this hotel: ${shareUrl}`
  )}`;

  /* ---------------- RENDER ---------------- */

  return (
    <>
            <div className="max-w-6xl mx-auto inset-0 flex items-end justify-between pt-6 px-0 lg:px-4 2xl:px-0 text-white z-10">
      {/* HERO */}
      <div
        className="relative h-[74vh] w-full overflow-hidden select-none lg:rounded-4xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={images[currentIndex]}
          alt={hotel.name}
          fill
          priority
          sizes="100vw"
          className="object-cover transition-all duration-700"
        />

        <div className="absolute inset-0 bg-black/10" />

          <div>
            <h1 className="text-xl md:text-2xl 2xl:text-3xl font-bold">
              {hotel.name}
            </h1>
            <p className="text-sm md:text-base text-gray-200 max-w-3xl">
              {hotel.introduction}
            </p>
          </div>

          <p className="flex items-center gap-2 text-sm font-bold">
            <TbMapPin size={22} className="text-[#f2836f]" />
            {hotel.city}
          </p>
        </div>

        {/* DOTS */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full ${
                i === currentIndex ? "bg-white scale-110" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto p-7 grid grid-cols-1 lg:grid-cols-2 gap-16 text-gray-700">
        {/* LEFT */}
        <div className="flex flex-col gap-8">
          <div className="text-xs text-gray-500">
            Added on {new Date(hotel.created_at).toLocaleDateString("en-GB")}
          </div>

          <section>
            <h2 className="text-xl font-extrabold mb-2">Highlights</h2>
            <p className="whitespace-break-spaces text-xs text-gray-500 leading-relaxed">{hotel.highlights}</p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2">Description</h2>
            <p className="whitespace-break-spaces text-xs text-gray-500 leading-relaxed">
              {hotel.description}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-4">Facilities</h2>
            <ul className="flex flex-col gap-3 text-sm">
              {hotel.facilities.map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <TbChecks size={22} className="text-teal-600" />
                  {f}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-4">Nearby Attractions</h2>
            <ul className="flex flex-col gap-3 text-sm">
              {hotel.attractions.map((a, i) => (
                <li key={i} className="flex items-center gap-2">
                  <TbStar size={22} className="text-[#f2836f]" />
                  {a}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* RIGHT */}
        <div className="bg-white shadow-lg border-2 border-gray-200/40 rounded-3xl p-8 md:p-10 h-fit flex flex-col gap-6">
          <div>
            <h3 className="text-xl font-extrabold mb-2">Room Rates</h3>
            <p className="whitespace-break-spaces text-xs text-gray-500 leading-relaxed">{hotel.room_rates}</p>
          </div>

          <div className="pt-6 border-t border-gray-200 text-sm text-gray-600">
            <p>
              City:{" "}
              <span className="font-semibold text-gray-800">{hotel.city}</span>
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="tel:+97100000000"
                className="btn-orange-sm btn-dynamic text-center"
              >
                Inquire Now
              </Link>
              <Link
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dark-base btn-dynamic text-center"
              >
                Share Hotel
              </Link>
            </div>
            <Link
              href="/destinations/abu-dhabi/hotels-apartments"
              className="btn-light-glass btn-dynamic text-center"
            >
              Back to Hotels
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

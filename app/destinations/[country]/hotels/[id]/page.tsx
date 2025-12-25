"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { TbMapPin, TbChecks, TbStar, TbBed } from "react-icons/tb";

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

export default function Page() {
  const { id } = useParams();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (!id) return;

    const fetchHotel = async () => {
      setLoading(true);

      const hotelId = Number(id);
      if (Number.isNaN(hotelId)) {
        console.error("Invalid hotel id:", id);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("hotels")
        .select("*")
        .eq("id", hotelId)
        .single();

      if (error) {
        console.error("Supabase error:", error);
        setHotel(null);
        setLoading(false);
        return;
      }

      // 🔒 Normalize text[] fields safely
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
  }, [id]);

 if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center text-gray-500">
        Loading hotels…
      </div>
    );
  }

  if (!hotel) {
    return <p className="text-center py-20 text-gray-500">Hotel not found.</p>;
  }

  const images =
    hotel.image_urls.length > 0 ? hotel.image_urls : ["/assets/hero/.jpg"];

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

  return (
    <>
      <div
        className="relative h-[74vh] w-full overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={images[currentIndex]}
          alt={hotel.name}
          fill
          priority
          className="object-cover transition-all duration-700"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="max-w-6xl mx-auto absolute inset-0 flex items-end justify-between py-12 px-6 text-white z-10">
          <div className="space-y-1">
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
      <div className="max-w-6xl mx-auto py-8 px-6 grid grid-cols-1 md:grid-cols-2 gap-16 text-gray-700">
        {/* LEFT */}
        <div className="flex flex-col gap-8">
          <div className="text-sm text-gray-500">
            Added on {new Date(hotel.created_at).toLocaleDateString("en-GB")}
          </div>

          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-extrabold mb-2">Highlights</h2>
            <p className="text-gray-600">{hotel.highlights}</p>
          </div>

          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-extrabold mb-2">Description</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {hotel.description}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold mb-4">Facilities</h2>
            <ul className="flex flex-col gap-3 text-sm">
              {hotel.facilities.map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <TbChecks className="text-[#f2836f]" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-extrabold mb-4">Nearby Attractions</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {hotel.attractions.map((a, i) => (
                <li key={i} className="flex items-center gap-2">
                  <TbStar className="text-teal-600" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-white shadow-lg border-2 border-gray-200/40 rounded-3xl p-8 md:p-10 h-fit flex flex-col gap-6">
          <div>
            <h3 className="text-xl font-extrabold mb-2">Room Rates</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {hotel.room_rates}
            </p>
          </div>

          <div className="pt-6 border-t border-gray-200 text-sm text-gray-600">
            <p>
              City:{" "}
              <span className="font-semibold text-gray-800">{hotel.city}</span>
            </p>
            <p>
              Category:{" "}
              <span className="font-semibold text-gray-800">Luxury Hotel</span>
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 mt-4">
            <Link
              href="tel:+97100000000"
              className="btn-green-sm btn-dynamic text-center"
            >
              Inquire Now
            </Link>
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
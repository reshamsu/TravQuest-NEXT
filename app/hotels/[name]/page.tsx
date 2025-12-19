"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import {
  TbMapPin,
  TbCircleCheck,
  TbBuildingSkyscraper,
  TbStar,
  TbBed,
} from "react-icons/tb";

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
  room_rates: string[];

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
    const fetchHotel = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("hotels")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setHotel(data as Hotel);
      else console.error(error);

      setLoading(false);
    };

    if (id) fetchHotel();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center pt-20 h-[74vh]">
        <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-3 text-gray-500">Loading hotel details...</p>
      </div>
    );

  if (!hotel)
    return <p className="text-center py-20 text-gray-500">Hotel not found.</p>;

  const images =
    hotel.image_urls.length > 0
      ? hotel.image_urls
      : ["/assets/banner/property5.jpg"];

  /* Swipe logic */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 75)
      setCurrentIndex((i) => (i + 1) % images.length);
    if (touchEndX.current - touchStartX.current > 75)
      setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  };

  return (
    <div className="max-w-6xl mx-auto mt-18 px-0 xl:px-6 2xl:px-0">
      {/* HERO */}
      <div
        className="relative h-[60vh] w-full overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={images[currentIndex]}
          alt={hotel.name}
          fill
          priority
          className="object-cover transition-all duration-700 xl:rounded-b-4xl"
        />

        <div className="absolute inset-0 bg-black/45 xl:rounded-b-4xl" />

        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10 text-white z-10">
          <p className="flex items-center gap-2 text-sm font-bold">
            <TbMapPin size={22} className="text-orange-400" />
            {hotel.city}
          </p>

          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl 2xl:text-3xl font-bold">
              {hotel.name}
            </h1>
            <p className="text-sm md:text-base text-gray-200 max-w-3xl">
              {hotel.introduction}
            </p>
          </div>
        </div>

        {/* DOTS */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full ${
                i === currentIndex
                  ? "bg-white scale-110"
                  : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT */}
        <div className="flex flex-col gap-8">
          <div className="text-sm text-gray-500">
            Added on{" "}
            {new Date(hotel.created_at).toLocaleDateString("en-GB")}
          </div>

          {/* HIGHLIGHTS */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-extrabold mb-2">Highlights</h2>
            <p className="text-gray-600">{hotel.highlights}</p>
          </div>

          {/* DESCRIPTION */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-extrabold mb-2">Description</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {hotel.description}
            </p>
          </div>

          {/* FACILITIES */}
          <div>
            <h2 className="text-xl font-extrabold mb-4">Facilities</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {hotel.facilities.map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <TbCircleCheck className="text-orange-400" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* ATTRACTIONS */}
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
        <div className="bg-white shadow-lg border-2 border-orange-200 rounded-3xl p-8 h-fit flex flex-col gap-6">
          <div>
            <h3 className="text-xl font-extrabold mb-2">Room Rates</h3>
            <ul className="flex flex-col gap-2 text-sm text-gray-700">
              {hotel.room_rates.map((rate, i) => (
                <li key={i} className="flex items-center gap-2">
                  <TbBed className="text-orange-400" />
                  {rate}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6 border-t text-sm text-gray-600">
            <p>
              City:{" "}
              <span className="font-semibold text-gray-800">
                {hotel.city}
              </span>
            </p>
            <p>
              Category:{" "}
              <span className="font-semibold text-gray-800">
                Luxury Hotel
              </span>
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 mt-4">
            <Link
              href="tel:+97100000000"
              className="btn-orange-sm btn-dynamic text-center"
            >
              Contact Hotel
            </Link>
            <Link
              href="/destinations"
              className="btn-light-base btn-dynamic text-center"
            >
              Back to Hotels
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

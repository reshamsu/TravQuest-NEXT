"use client";

export const dynamic = "force-dynamic";

import React, { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { TbSend2 } from "react-icons/tb";

interface Hotel {
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
  // ✅ HARD GUARD — REQUIRED
  if (!supabase) {
    return (
      <div className="p-10 text-center text-teal-600">
        Supabase is not configured. Check environment variables.
      </div>
    );
  }

  // ✅ NARROW TYPE ONCE
  const sb = supabase;

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [newHotel, setNewHotel] = useState<Hotel>({
    name: "",
    introduction: "",
    highlights: "",
    description: "",
    city: "",
    attractions: [],
    facilities: [],
    room_rates: [],
    image_urls: [],
  });

  const [mainImages, setMainImages] = useState<FileList | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setNewHotel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const uploadImages = async (
    files: FileList | null,
    folder: string
  ): Promise<string[]> => {
    if (!files || files.length === 0) return [];

    setUploading(true);
    const urls: string[] = [];

    for (const file of Array.from(files)) {
      if (file.size > 5 * 1024 * 1024) continue;

      const path = `${folder}/${Date.now()}_${file.name}`;

      const { error } = await sb.storage.from("hotels").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });

      if (error) continue;

      const { data } = sb.storage.from("hotels").getPublicUrl(path);
      urls.push(data.publicUrl);
    }

    setUploading(false);
    return urls;
  };

  const toggleArrayValue = (
    field: "attractions" | "facilities",
    value: string
  ) => {
    setNewHotel((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  // -----------------------------
  // SUBMIT
  // -----------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const image_urls = await uploadImages(mainImages, "images");

    const payload = {
      name: newHotel.name,
      introduction: newHotel.introduction,
      highlights: newHotel.highlights,
      description: newHotel.description,
      city: newHotel.city,
      image_urls,
    };

    const { error } = await sb
      .from("hotels")
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error("Error inserting Hotel:", error.message);
      alert("Failed to add Hotel.");
    } else {
      setNewHotel({
        name: "",
        introduction: "",
        highlights: "",
        description: "",
        city: "",
        attractions: [],
        facilities: [],
        room_rates: [],
        image_urls: [],
      });
      setMessage("Hotel added successfully!");
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-100 text-gray-800 relative">
      <div className="max-w-3xl mx-auto lg:ml-80 md:px-6 pt-24 lg:pt-16 pb-10 flex flex-col gap-6">
        <div className="bg-white border md:border-2 border-gray-100 rounded-3xl shadow-md overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex flex-col gap-1 border-b-2 border-gray-100 p-8 pb-6">
            <h2 className="text-base md:text-lg font-bold">
              Add New Hotels to <span className="text-teal-600">TravQuest</span>
            </h2>
            <p className="text-xs md:text-sm text-gray-400">
              Add your hotel listing to{" "}
              <Link href="/" className="underline">
                TravQuest Marketplace
              </Link>
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-8 w-full p-8 md:p-10"
          >
            {/* NAME */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Hotel Name*</label>
              <input
                name="name"
                value={newHotel.name}
                onChange={handleChange}
                placeholder="Enter hotel name"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 capitalize"
                required
              />
            </div>

            {/* INTRO */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Introduction*</label>
              <input
                name="introduction"
                value={newHotel.introduction}
                onChange={handleChange}
                placeholder="Enter an Introduction"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 capitalize"
                required
              />
            </div>

            {/* HIGHLIGHTS */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Highlights*</label>
              <input
                name="highlights"
                value={newHotel.highlights}
                onChange={handleChange}
                placeholder="Mention Some Highlights"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 capitalize"
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Description*</label>
              <textarea
                name="description"
                value={newHotel.description}
                onChange={handleChange}
                placeholder="Write a description"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 h-28 capitalize"
                required
              />
            </div>

            {/* CITY */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">City*</label>
              <select
                name="city"
                value={newHotel.city}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
                required
              >
                <option value="" disabled>
                  Select City
                </option>
                <option value="Dubai">Dubai</option>
                <option value="Abu Dhabi">Abu Dhabi</option>
                <option value="Fujairah">Fujairah</option>
                <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                <option value="Jordan">Jordan</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Maldives">Maldives</option>
                <option value="Singapore">Singapore</option>
                <option value="Thailand">Thailand</option>
              </select>
            </div>

            {/* ATTRACTIONS */}
            <div className="flex flex-col gap-3">
              <label className="text-sm font-bold">Nearby Attractions*</label>

              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  "Beachfront",
                  "City Center",
                  "Shopping Mall",
                  "Tourist Landmarks",
                  "Airport Access",
                  "Nature & Mountains",
                ].map((item) => (
                  <label key={item} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newHotel.attractions.includes(item)}
                      onChange={() => toggleArrayValue("attractions", item)}
                      className="accent-teal-600"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            {/* FACILITIES */}
            <div className="flex flex-col gap-3">
              <label className="text-sm font-bold">Hotel Facilities*</label>

              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  "Free Wi-Fi",
                  "Swimming Pool",
                  "Spa & Wellness",
                  "Gym",
                  "Restaurant",
                  "Bar / Lounge",
                  "24-Hour Reception",
                  "Airport Shuttle",
                ].map((facility) => (
                  <label key={facility} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newHotel.facilities.includes(facility)}
                      onChange={() => toggleArrayValue("facilities", facility)}
                      className="accent-teal-600"
                    />
                    {facility}
                  </label>
                ))}
              </div>
            </div>

            {/* ROOM RATES */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Room Rates*</label>
              <textarea
                placeholder={`Example: Deluxe Room – USD 180 / night 
                      Suite – USD 320 / night 
                      Family Room – USD 250 / night`}
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 h-28 text-sm"
                onChange={(e) =>
                  setNewHotel((prev) => ({
                    ...prev,
                    room_rates: e.target.value
                      .split("\n")
                      .map((r) => r.trim())
                      .filter(Boolean),
                  }))
                }
              />
            </div>

            {/* UPLOAD IMAGES */}
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm font-bold">Upload Images*</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setMainImages(e.target.files)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5"
                required
              />
            </div>

            {/* MESSAGE */}
            {message && (
              <p className="text-center text-sm text-teal-600">{message}</p>
            )}

            {/* SUBMIT */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading || uploading}
                className="select-none btn-orange-base btn-dynamic flex items-center gap-2"
              >
                {loading || uploading ? "Uploading..." : "Save Hotel"}
                <TbSend2 size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

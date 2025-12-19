"use client";

export const dynamic = "force-dynamic";

import React, { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { TbSend2 } from "react-icons/tb";
import Image from "next/image";

interface Destination {
  name: string;
  tagline: string;
  title: string;
  subtitle: string;
  description: string;
  body: string;
  destination_area: string[];
  image_urls: string[];
  image_collage: string[];
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

  const [newDestination, setNewDestination] = useState<Destination>({
    name: "",
    tagline: "",
    title: "",
    subtitle: "",
    description: "",
    body: "",
    destination_area: [],
    image_urls: [],
    image_collage: [],
  });

  const [mainImages, setMainImages] = useState<FileList | null>(null);
  const [collageImages, setCollageImages] = useState<FileList | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setNewDestination((prev) => ({
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

      const { error } = await sb.storage
        .from("destinations")
        .upload(path, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) continue;

      const { data } = sb.storage.from("destinations").getPublicUrl(path);
      urls.push(data.publicUrl);
    }

    //   setMessage(`${uploadedUrls.length} image(s) uploaded successfully`);
    //   return uploadedUrls;
    // } catch (err) {
    //   console.error("Error uploading images:", err);
    //   setMessage("Error uploading images");
    //   return [];
    // } finally {
    setUploading(false);
    return urls;
  };

  // -----------------------------
  // SUBMIT
  // -----------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const image_urls = await uploadImages(mainImages, "images");
    const image_collage = await uploadImages(collageImages, "collages");

    const payload = {
      name: newDestination.name,
      tagline: newDestination.tagline,
      description: newDestination.description,
      body: newDestination.body,
      destination_area: newDestination.destination_area,
      image_urls,
      image_collage,
    };

    const { error } = await sb
      .from("destinations")
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error("Error inserting destination:", error.message);
      alert("Failed to add destination.");
    } else {
      setNewDestination({
        name: "",
        tagline: "",
        title: "",
        subtitle: "",
        description: "",
        body: "",
        destination_area: [],
        image_urls: [],
        image_collage: [],
      });
      setMessage("Destination added successfully!");
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-100 text-gray-800 relative">
      <div className="max-w-3xl mx-auto lg:ml-80 md:px-6 pt-24 lg:pt-16 pb-10 flex flex-col gap-6">
        <div className="bg-white border md:border-2 border-gray-100 rounded-3xl shadow-md overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex flex-col gap-1 border-b-2 border-gray-100 p-8 pb-6">
            <h2 className="text-lg font-bold">
              Add a New Shortcut Card to{" "}
              <span className="text-teal-600">TravQuest</span>
            </h2>
            <p className="text-sm text-gray-400">
              Add your shortcut listing to{" "}
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
              <label className="text-sm font-bold">Country Name*</label>
              <input
                name="name"
                value={newDestination.name}
                onChange={handleChange}
                placeholder="Enter country name"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 capitalize"
                required
              />
            </div>

            {/* TAGLINE */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Tagline*</label>
              <input
                name="tagline"
                value={newDestination.tagline}
                onChange={handleChange}
                placeholder="Short tagline"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 capitalize"
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Description*</label>
              <textarea
                name="description"
                value={newDestination.description}
                onChange={handleChange}
                placeholder="Write a description"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 h-28 capitalize"
                required
              />
            </div>

            {/* DESTINATION AREA */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Destination Area*</label>
              <select
                name="destination_area"
                value={newDestination.destination_area[0] || ""}
                onChange={(e) =>
                  setNewDestination((prev) => ({
                    ...prev,
                    destination_area: [e.target.value],
                  }))
                }
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
                required
              >
                <option value="" disabled>
                  Select Area
                </option>
                <option value="Asia">Asia</option>
                <option value="Africa">Africa</option>
                <option value="Europe">Europe</option>
                <option value="Middle East">Middle East</option>
                <option value="North America">North America</option>
                <option value="UAE">UAE</option>
              </select>
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
                {loading || uploading ? "Uploading..." : "Save Card"}
                <TbSend2 size={20} />
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white border md:border-2 border-gray-100 rounded-3xl shadow-md overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex flex-col gap-1 border-b-2 border-gray-100 p-8 pb-6">
            <h2 className="text-lg font-bold">
              Enter Second Section for Shortcuts to{" "}
              <span className="text-teal-600">TravQuest</span>
            </h2>
            <p className="text-sm text-gray-400">
              Add your shortcut listing to{" "}
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
            {/* TITLE */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Title*</label>
              <input
                name="title"
                value={newDestination.title}
                onChange={handleChange}
                placeholder="Enter Title"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 capitalize"
                required
              />
            </div>

            {/* SUBTITLE */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Subtitle*</label>
              <input
                name="subtitle"
                value={newDestination.subtitle}
                onChange={handleChange}
                placeholder="Enter subtitle"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 capitalize"
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Body Paragraph*</label>
              <textarea
                name="body"
                value={newDestination.body}
                onChange={handleChange}
                placeholder="Write a few body paragraphs"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 h-28 capitalize"
                required
              />
            </div>

            {/* UPLOAD IMAGES */}
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm font-bold">
                Upload Image Collages*
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setCollageImages(e.target.files)}
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
                {loading || uploading ? "Uploading..." : "Save Section"}
                <TbSend2 size={20} />
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white border md:border-2 border-gray-100 rounded-3xl shadow-md overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex flex-col gap-1 border-b-2 border-gray-100 p-8 pb-6">
            <h2 className="text-lg font-bold">
              Enter Third Section for Shortcuts to{" "}
              <span className="text-teal-600">TravQuest</span>
            </h2>
            <p className="text-sm text-gray-400">
              Add your shortcut listing to{" "}
              <Link href="/" className="underline">
                TravQuest Marketplace
              </Link>
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 w-full p-8 md:p-10"
          >
            <div className="grid grid-cols-3 gap-6">
              <div className="relative rounded-4xl overflow-hidden h-60 group shadow-lg hover:scale-105 duration-700">
                <Image
                  src="/assets/poster/event-burj-khalifa.jpg"
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/60 lg:bg-black/10 transition-all duration-700 group-hover:bg-black/70" />

                <div className="relative z-10 h-full flex flex-col justify-end gap-3.5 p-8 text-white">
                  <div>
                    <label className="text-sm font-semibold text-[#f2836f]">
                      TEXT HERE
                    </label>
                    <h2 className="playfair text-2xl font-bold">STAY</h2>
                  </div>
                </div>
              </div>
              <div className="relative rounded-4xl overflow-hidden h-60 group shadow-lg hover:scale-105 duration-700">
                <Image
                  src="/assets/poster/event-burj-khalifa.jpg"
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/60 lg:bg-black/10 transition-all duration-700 group-hover:bg-black/70" />

                <div className="relative z-10 h-full flex flex-col justify-end gap-3.5 p-8 text-white">
                  <div>
                    <label className="text-sm font-semibold text-[#f2836f]">
                      TEXT HERE
                    </label>
                    <h2 className="playfair text-2xl font-bold">PLAY</h2>
                  </div>
                </div>
              </div>
              <div className="relative rounded-4xl overflow-hidden h-60 group shadow-lg hover:scale-105 duration-700">
                <Image
                  src="/assets/poster/event-burj-khalifa.jpg"
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/60 lg:bg-black/10 transition-all duration-700 group-hover:bg-black/70" />

                <div className="relative z-10 h-full flex flex-col justify-end gap-3.5 p-8 text-white">
                  <div>
                    <label className="text-sm font-semibold text-[#f2836f]">
                      TEXT HERE
                    </label>
                    <h2 className="playfair text-2xl font-bold">
                      ICONIC MARVELS
                    </h2>
                  </div>
                </div>
              </div>
              <div className="relative rounded-4xl overflow-hidden h-60 group shadow-lg hover:scale-105 duration-700">
                <Image
                  src="/assets/poster/event-burj-khalifa.jpg"
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/60 lg:bg-black/10 transition-all duration-700 group-hover:bg-black/70" />

                <div className="relative z-10 h-full flex flex-col justify-end gap-3.5 p-8 text-white">
                  <div>
                    <label className="text-sm font-semibold text-[#f2836f]">
                      TEXT HERE
                    </label>
                    <h2 className="playfair text-2xl font-bold">SHOP</h2>
                  </div>
                </div>
              </div>
              <div className="relative rounded-4xl overflow-hidden h-60 group shadow-lg hover:scale-105 duration-700">
                <Image
                  src="/assets/poster/event-burj-khalifa.jpg"
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/60 lg:bg-black/10 transition-all duration-700 group-hover:bg-black/70" />

                <div className="relative z-10 h-full flex flex-col justify-end gap-3.5 p-8 text-white">
                  <div>
                    <label className="text-sm font-semibold text-[#f2836f]">
                      TEXT HERE
                    </label>
                    <h2 className="playfair text-2xl font-bold">MEET</h2>
                  </div>
                </div>
              </div>
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
                {loading || uploading ? "Uploading..." : "Save Shortcuts"}
                <TbSend2 size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

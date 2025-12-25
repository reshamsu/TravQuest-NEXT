"use client";

export const dynamic = "force-dynamic";

import React, { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { TbSend2 } from "react-icons/tb";

interface Hero {
  title: string;
  subtitle: string;
  page_type: string[];
  image_urls: string[];
}

export default function Page() {
  // ✅ HARD GUARD — REQUIRED
  if (!supabase) {
    return (
      <div className="p-10 text-center text-red-600">
        Supabase is not configured. Check environment variables.
      </div>
    );
  }

  // ✅ NARROW TYPE ONCE
  const sb = supabase;

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [newHero, setNewHero] = useState<Hero>({
    title: "",
    subtitle: "",
    page_type: [],
    image_urls: [],
  });

  const [images, setImages] = useState<FileList | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setNewHero((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (): Promise<string[]> => {
    if (!images || images.length === 0) return [];

    try {
      setUploading(true);
      const uploadedUrls: string[] = [];

      for (let i = 0; i < images.length; i++) {
        const file = images[i];

        if (file.size > 10 * 1024 * 1024) {
          alert(`${file.name} is too large! Max 10MB.`);
          continue;
        }

        const filePath = `images/${Date.now()}_${file.name}`;

        const { error: uploadError } = await sb.storage
          .from("hero")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          console.error("Upload error:", uploadError.message);
          continue;
        }

        const { data } = sb.storage.from("hero").getPublicUrl(filePath);

        uploadedUrls.push(data.publicUrl);
      }

      setMessage(`${uploadedUrls.length} image(s) uploaded successfully`);
      return uploadedUrls;
    } catch (err) {
      console.error("Error uploading images:", err);
      setMessage("Error uploading images");
      return [];
    } finally {
      setUploading(false);
    }
  };

  // -----------------------------
  // SUBMIT
  // -----------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const uploadedUrls = images ? await handleImageUpload() : [];

    const payload = {
      title: newHero.title,
      subtitle: newHero.subtitle,
      page_type: newHero.page_type,
      image_urls: uploadedUrls.length ? uploadedUrls : newHero.image_urls,
    };

    const { error } = await sb.from("hero").insert([payload]).select().single();

    if (error) {
      console.error("Error inserting hero:", error.message);
      alert("Failed to add hero.");
    } else {
      setNewHero({
        title: "",
        subtitle: "",
        page_type: [],
        image_urls: [],
      });
      setImages(null);
      setMessage("Hero added successfully!");
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
              Add a New Destination to{" "}
              <span className="text-teal-600">TravQuest</span>
            </h2>
            <p className="text-xs md:text-sm text-gray-400">
              Add your destination listing to{" "}
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
              <label className="text-sm font-bold">Hero Title*</label>
              <input
                name="title"
                value={newHero.title}
                onChange={handleChange}
                placeholder="Enter hero title"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 capitalize"
                required
              />
            </div>

            {/* SUBTITLE */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Hero Subtitle*</label>
              <input
                name="subtitle"
                value={newHero.subtitle}
                onChange={handleChange}
                placeholder="Short subtitle"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 capitalize"
                required
              />
            </div>

            {/* PAGE TYPE */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Page Type*</label>
              <select
                name="page_type"
                value={newHero.page_type[0] || ""}
                onChange={(e) =>
                  setNewHero((prev) => ({
                    ...prev,
                    page_type: [e.target.value],
                  }))
                }
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
                required
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="Homepage">Homepage</option>
                <option value="Explore UAE">Explore UAE</option>
                <option value="About">About</option>
                <option value="Contact">Contact</option>
              </select>
            </div>

            {/* UPLOAD IMAGES */}
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm font-bold">Upload Images*</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setImages(e.target.files)}
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
                {loading || uploading ? "Uploading..." : "Save Hero"}
                <TbSend2 size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

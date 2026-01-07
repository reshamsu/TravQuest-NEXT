"use client";
export const dynamic = "force-dynamic";

import React, { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { TbSend2 } from "react-icons/tb";

interface Package {
  title: string;
  tagline: string;
  description: string;
  city: string[];
  image_urls: string[];
}

export default function Page() {
  // ✅ HARD GUARD (prevents build crash)
  if (!supabase) {
    return (
      <div className="p-10 text-center text-red-600">
        Supabase is not configured. Check environment variables.
      </div>
    );
  }

  // ✅ Narrow once for TS
  const sb = supabase;

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [newPackage, setNewPackage] = useState<Package>({
    title: "",
    tagline: "",
    description: "",
    city: [],
    image_urls: [],
  });

  const [images, setImages] = useState<FileList | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setNewPackage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -----------------------------
  // IMAGE UPLOAD
  // -----------------------------
  const handleImageUpload = async (): Promise<string[]> => {
    if (!images || images.length === 0) return [];

    try {
      setUploading(true);
      const uploadedUrls: string[] = [];

      for (let i = 0; i < images.length; i++) {
        const file = images[i];

        if (file.size > 5 * 1024 * 1024) {
          alert(`${file.name} is too large! Max 5MB.`);
          continue;
        }

        const filePath = `images/${Date.now()}_${file.name}`;

        const { error: uploadError } = await sb.storage
          .from("packages")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          console.error("Upload error:", uploadError.message);
          continue;
        }

        const { data } = sb.storage.from("packages").getPublicUrl(filePath);

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
      title: newPackage.title,
      tagline: newPackage.tagline,
      description: newPackage.description,
      city: newPackage.city,
      image_urls: uploadedUrls.length ? uploadedUrls : newPackage.image_urls,
    };

    const { error } = await sb
      .from("packages")
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error("Error inserting package:", error.message);
      alert("Failed to add package.");
    } else {
      setNewPackage({
        title: "",
        tagline: "",
        description: "",
        city: [],
        image_urls: [],
      });
      setImages(null);
      setMessage("Package added successfully!");
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-100 text-gray-800 relative">
      <div className="max-w-3xl mx-auto lg:ml-80 md:px-6 pt-24 lg:pt-16 pb-10 flex flex-col gap-6 h-full md:h-dvh lg:h-full">
        <div className="bg-white border md:border-2 border-gray-100 rounded-3xl shadow-md overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex flex-col gap-1 border-b-2 border-gray-100 p-8 pb-6">
            <h2 className="text-base md:text-lg font-bold">
              Add a New Packages to{" "}
              <span className="text-teal-600">TravQuest</span>
            </h2>
            <p className="text-xs md:text-sm text-gray-400">
              Add your package listing to{" "}
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
              <label className="text-sm font-bold">Package Name*</label>
              <input
                name="name"
                value={newPackage.title}
                onChange={handleChange}
                placeholder="Enter package name"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 capitalize"
                required
              />
            </div>

            {/* TAGLINE */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Tagline*</label>
              <input
                name="tagline"
                value={newPackage.tagline}
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
                value={newPackage.description}
                onChange={handleChange}
                placeholder="Write a description"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 h-28 capitalize"
                required
              />
            </div>

            {/* PACKAGE LOCATION */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Package City*</label>
              <select
                name="city"
                value={newPackage.city[0] || ""}
                onChange={(e) =>
                  setNewPackage((prev) => ({
                    ...prev,
                    city: [e.target.value],
                  }))
                }
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
                required
              >
                <option value="" disabled>
                  Select City
                </option>
                <option value="Dubai">Dubai</option>
                <option value="Abu Dhabi">Abu Dhabi</option>
                <option value="Furjairah">Furjairah</option>
                <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                <option value="Jordan">Jordan</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Maldives">Maldives</option>
                <option value="Singapore">Singapore</option>
                <option value="Thailand">Thailand</option>
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
                {loading || uploading ? "Uploading..." : "Save Package"}
                <TbSend2 size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

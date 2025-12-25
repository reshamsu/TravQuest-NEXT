"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { TbSend2 } from "react-icons/tb";

/* ================= TYPES ================= */

interface DiscoverBase {
  header: string;
  tagline: string;
  description: string;
  city: string[];
}

interface DiscoverSection2 {
  title: string;
  subtitle: string;
  body: string;
}

// interface DiscoverSection3 {
//   shortcut_types: string[];
//   label: string[];
// }

/* ================= COMPONENT ================= */

export default function Page() {
  if (!supabase) {
    return (
      <div className="p-10 text-center text-teal-600">
        Supabase not configured
      </div>
    );
  }

  const [discoveryId, setDiscoveryId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [destinations, setDestinations] = useState<string[]>([]);
  const [loadingDestinations, setLoadingDestinations] = useState(true);

  /* ---------- REHYDRATE DESTINATION ID ---------- */
  useEffect(() => {
    const storedId = localStorage.getItem("discoveryId");
    if (storedId) setDiscoveryId(Number(storedId));
  }, []);

  /* ---------- FORM STATES ---------- */

  const [base, setBase] = useState<DiscoverBase>({
    header: "",
    tagline: "",
    description: "",
    city: [],
  });

  const [section2, setSection2] = useState<DiscoverSection2>({
    title: "",
    subtitle: "",
    body: "",
  });

  // const [section3, setSection3] = useState<DiscoverSection3>({
  //   shortcut_types: [],
  //   label: [],
  // });

  useEffect(() => {
    if (!supabase) return;

    const fetchDestinations = async () => {
      setLoadingDestinations(true);

      const { data, error } = await supabase
        .from("destinations")
        .select("country");

      if (error) {
        console.error("Failed to load destinations:", error);
        setDestinations([]);
        setLoadingDestinations(false);
        return;
      }

      const cities = Array.from(
        new Set(data.map((row) => row.country).filter(Boolean))
      ).sort((a, b) => a.localeCompare(b));

      setDestinations(cities);
      setLoadingDestinations(false);
    };

    fetchDestinations();
  }, []);

  /* ---------- IMAGE STATES ---------- */

  const [mainImages, setMainImages] = useState<FileList | null>(null);
  const [collageImages, setCollageImages] = useState<FileList | null>(null);

  /* ================= IMAGE UPLOAD ================= */

  const uploadImages = async (
    files: FileList | null,
    folder: string
  ): Promise<string[]> => {
    if (!files || files.length === 0) return [];

    const urls: string[] = [];

    for (const file of Array.from(files)) {
      const path = `${folder}/${Date.now()}_${file.name}`;

      const { error } = await supabase.storage
        .from("discovery")
        .upload(path, file, { upsert: false });

      if (error) {
        console.error(error);
        continue;
      }

      const { data } = supabase.storage.from("discovery").getPublicUrl(path);
      urls.push(data.publicUrl);
    }

    return urls;
  };

  /* ================= SUBMIT 1 ================= */

  const handleBaseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const image_urls = await uploadImages(mainImages, "images");

    const { data, error } = await supabase
      .from("discovery")
      .insert({
        header: base.header,
        tagline: base.tagline,
        description: base.description,
        city: base.city,
        image_urls,
      })
      .select("id")
      .single();

    if (error) {
      console.error(error);
      setMessage("Failed to create discovery");
    } else {
      setDiscoveryId(data.id);
      localStorage.setItem("discoveryId", String(data.id));
      setMessage("Discovery card created ✔");
    }

    setLoading(false);
  };

  /* ================= SUBMIT 2 ================= */

  const handleSection2Submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!discoveryId) {
      setMessage("Create a discovery first");
      return;
    }

    setLoading(true);
    setMessage("");

    const image_collages = await uploadImages(collageImages, "collages");

    const { error } = await supabase
      .from("discovery")
      .update({
        title: section2.title,
        subtitle: section2.subtitle,
        body: section2.body,
        image_collages,
      })
      .eq("id", discoveryId);

    if (error) {
      console.error(error);
      setMessage("Failed to save section 2");
    } else {
      setMessage("Discovery section 2 saved ✔");
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
              Add a New Discovery Card to{" "}
              <span className="text-teal-600">TravQuest</span>
            </h2>
            <p className="text-xs md:text-sm text-gray-400">
              Add your discovery listing to{" "}
              <Link href="/" className="underline">
                TravQuest Marketplace
              </Link>
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleBaseSubmit}
            className="grid grid-cols-1 gap-8 w-full p-8 md:p-10"
          >
            {/* NAME */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Header*</label>
              <input
                name="header"
                value={base.header}
                onChange={(e) => setBase({ ...base, header: e.target.value })}
                placeholder="Enter Header"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 capitalize"
                required
              />
            </div>

            {/* TAGLINE */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Tagline*</label>
              <input
                name="tagline"
                value={base.tagline}
                onChange={(e) => setBase({ ...base, tagline: e.target.value })}
                placeholder="Short tagline"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 capitalize"
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Description</label>
              <textarea
                name="description"
                value={base.description}
                onChange={(e) =>
                  setBase({ ...base, description: e.target.value })
                }
                placeholder="Write a description"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 h-28 capitalize"
              />
            </div>

            {/* DESTINATION AREA */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">City*</label>
              <select
                name="city"
                value={base.city[0] || ""}
                onChange={(e) => setBase({ ...base, city: [e.target.value] })}
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
                required
                disabled={loadingDestinations}
              >
                <option value="" disabled>
                  {loadingDestinations ? "Loading cities..." : "Select City"}
                </option>

                {destinations.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* UPLOAD IMAGES */}
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm font-bold">Upload Images*</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setMainImages(e.target.files)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5"
                required
              />
            </div>

            {message && (
              <p className="text-center text-sm text-teal-600">{message}</p>
            )}

            <div className="flex justify-end">
              <button className="select-none btn-orange-base btn-dynamic flex items-center gap-2">
                Save Card <TbSend2 size={20} />
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white border md:border-2 border-gray-100 rounded-3xl shadow-md overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex flex-col gap-1 border-b-2 border-gray-100 p-8 pb-6">
            <h2 className="text-lg font-bold">
              Enter Second Section for Discoveries to{" "}
              <span className="text-teal-600">TravQuest</span>
            </h2>
            <p className="text-sm text-gray-400">
              Add your discovery listing to{" "}
              <Link href="/" className="underline">
                TravQuest Marketplace
              </Link>
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSection2Submit}
            className="grid grid-cols-1 gap-8 w-full p-8 md:p-10"
          >
            {/* TITLE */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Title*</label>
              <input
                name="title"
                value={section2.title}
                onChange={(e) =>
                  setSection2({ ...section2, title: e.target.value })
                }
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
                value={section2.subtitle}
                onChange={(e) =>
                  setSection2({ ...section2, subtitle: e.target.value })
                }
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
                value={section2.body}
                onChange={(e) =>
                  setSection2({ ...section2, body: e.target.value })
                }
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
              <button className="select-none btn-orange-base btn-dynamic flex items-center gap-2">
                Save Section 2
                <TbSend2 size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

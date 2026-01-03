"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { TbSend2 } from "react-icons/tb";

interface HeroBase {
  hero_title: string;
  hero_subtitle: string;
  hero_page_type: string[];
  hero_image_urls: string[];
}

interface HeroSection2 {
  section2_title: string;
  section2_subtitle: string;
  section2_body: string;
}

interface HeroSection3 {
  section3_title: string;
  section3_subtitle: string;
  section3_body: string;
}

export default function Page() {
  // ✅ HARD GUARD — REQUIRED
  if (!supabase) {
    return (
      <div className="p-10 text-center text-teal-600">
        Supabase is not configured.
      </div>
    );
  }

  const [heroId, setHeroId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedId = localStorage.getItem("heroId");
    if (storedId) setHeroId(Number(storedId));
  }, []);

  const [base, setBase] = useState<HeroBase>({
    hero_title: "",
    hero_subtitle: "",
    hero_page_type: [],
    hero_image_urls: [],
  });

  const [section2, setSection2] = useState<HeroSection2>({
    section2_title: "",
    section2_subtitle: "",
    section2_body: "",
  });

  const [section3, setSection3] = useState<HeroSection3>({
    section3_title: "",
    section3_subtitle: "",
    section3_body: "",
  });

  const [mainImages, setMainImages] = useState<FileList | null>(null);
  const [collageImages, setCollageImages] = useState<FileList | null>(null);
  const [backgroundImages, setBackgroundImages] = useState<FileList | null>(
    null
  );

  const uploadImages = async (
    files: FileList | null,
    folder: string
  ): Promise<string[]> => {
    if (!files || files.length === 0) return [];

    const urls: string[] = [];

    for (const file of Array.from(files)) {
      const path = `${folder}/${Date.now()}_${file.name}`;

      const { error } = await supabase.storage
        .from("hero")
        .upload(path, file, { upsert: false });

      if (error) {
        console.error(error);
        continue;
      }

      const { data } = supabase.storage.from("hero").getPublicUrl(path);
      urls.push(data.publicUrl);
    }

    return urls;
  };

  const handleBaseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const hero_image_urls = await uploadImages(mainImages, "images");

    const { data, error } = await supabase
      .from("hero")
      .insert({
        hero_title: base.hero_title,
        hero_subtitle: base.hero_subtitle,
        hero_page_type: base.hero_page_type,
        hero_image_urls,
      })
      .select("id")
      .single();

    if (error) {
      console.error(error);
      setMessage("Failed to create hero");
    } else {
      setHeroId(data.id);
      localStorage.setItem("heroId", String(data.id));
      setMessage("Hero section created ✔");
    }

    setLoading(false);
  };

  const handleSection2Submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!heroId) {
      setMessage("Create hero first");
      return;
    }

    setLoading(true);
    setMessage("");

    const section2_image_collages = await uploadImages(
      collageImages,
      "collages"
    );

    const { error } = await supabase
      .from("hero")
      .update({
        section2_title: section2.section2_title,
        section2_subtitle: section2.section2_subtitle,
        section2_body: section2.section2_body,
        section2_image_collages,
      })
      .eq("id", heroId);

    if (error) {
      console.error(error);
      setMessage("Failed to save section 2");
    } else {
      setMessage("Hero section 2 saved ✔");
    }

    setLoading(false);
  };

  const handleSection3Submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!heroId) {
      setMessage("Create hero first");
      return;
    }

    setLoading(true);
    setMessage("");

    const section3_image_urls = await uploadImages(backgroundImages, "groups");

    const { error } = await supabase
      .from("hero")
      .update({
        section3_title: section3.section3_title,
        section3_subtitle: section3.section3_subtitle,
        section3_body: section3.section3_body,
        section3_image_urls,
      })
      .eq("id", heroId);

    if (error) {
      console.error(error);
      setMessage("Failed to save section 3");
    } else {
      setMessage("Hero section 3 saved ✔");
      localStorage.removeItem("heroId");
      setHeroId(null);
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
              Add a New Hero to <span className="text-teal-600">TravQuest</span>
            </h2>
            <p className="text-xs md:text-sm text-gray-400">
              Add your hero listing to{" "}
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
            {/* TITLE */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Hero Title*</label>
              <input
                name="title"
                value={base.hero_title}
                onChange={(e) =>
                  setBase({ ...base, hero_title: e.target.value })
                }
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
                value={base.hero_subtitle}
                onChange={(e) =>
                  setBase({ ...base, hero_subtitle: e.target.value })
                }
                placeholder="Short subtitle"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 capitalize"
                required
              />
            </div>

            {/* PAGE TYPE */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Page Type*</label>
              <select
                value={base.hero_page_type[0] || ""}
                onChange={(e) =>
                  setBase((prev) => ({
                    ...prev,
                    hero_page_type: [e.target.value],
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
              <button className="select-none btn-orange-base btn-dynamic flex items-center gap-2">
                Save Hero Section <TbSend2 size={20} />
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white border md:border-2 border-gray-100 rounded-3xl shadow-md overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex flex-col gap-1 border-b-2 border-gray-100 p-8 pb-6">
            <h2 className="text-lg font-bold">
              Enter Second Section for Homepage to{" "}
              <span className="text-teal-600">TravQuest</span>
            </h2>
            <p className="text-sm text-gray-400">
              Add your homepage listing to{" "}
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
                name="section2_title"
                value={section2.section2_title}
                onChange={(e) =>
                  setSection2({ ...section2, section2_title: e.target.value })
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
                name="section2_subtitle"
                value={section2.section2_subtitle}
                onChange={(e) =>
                  setSection2({
                    ...section2,
                    section2_subtitle: e.target.value,
                  })
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
                name="section2_body"
                value={section2.section2_body}
                onChange={(e) =>
                  setSection2({ ...section2, section2_body: e.target.value })
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

        <div className="bg-white border md:border-2 border-gray-100 rounded-3xl shadow-md overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex flex-col gap-1 border-b-2 border-gray-100 p-8 pb-6">
            <h2 className="text-lg font-bold">
              Enter Third Section for Homepage to{" "}
              <span className="text-teal-600">TravQuest</span>
            </h2>
            <p className="text-sm text-gray-400">
              Add your homepage listing to{" "}
              <Link href="/" className="underline">
                TravQuest Marketplace
              </Link>
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSection3Submit}
            className="grid grid-cols-1 gap-8 w-full p-8 md:p-10"
          >
            {/* TITLE */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Title*</label>
              <input
                name="title"
                value={section3.section3_title}
                onChange={(e) =>
                  setSection3({ ...section3, section3_title: e.target.value })
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
                value={section3.section3_subtitle}
                onChange={(e) =>
                  setSection3({
                    ...section3,
                    section3_subtitle: e.target.value,
                  })
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
                value={section3.section3_body}
                onChange={(e) =>
                  setSection3({ ...section3, section3_body: e.target.value })
                }
                placeholder="Write a few body paragraphs"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 h-28 capitalize"
                required
              />
            </div>

            {/* UPLOAD IMAGES */}
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm font-bold">
                Upload Image Background*
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setBackgroundImages(e.target.files)}
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
                Save Section 3
                <TbSend2 size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

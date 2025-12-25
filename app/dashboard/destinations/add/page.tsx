"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { TbSend2 } from "react-icons/tb";

/* ================= TYPES ================= */

interface DestinationBase {
  country: string;
  tagline: string;
  description: string;
  continents: string[];
}

interface DestinationSection2 {
  title: string;
  subtitle: string;
  body: string;
}

// interface DestinationSection3 {
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

  const [destinationId, setDestinationId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /* ---------- REHYDRATE DESTINATION ID ---------- */
  useEffect(() => {
    const storedId = localStorage.getItem("destinationId");
    if (storedId) setDestinationId(Number(storedId));
  }, []);

  /* ---------- FORM STATES ---------- */

  const [base, setBase] = useState<DestinationBase>({
    country: "",
    tagline: "",
    description: "",
    continents: [],
  });

  const [section2, setSection2] = useState<DestinationSection2>({
    title: "",
    subtitle: "",
    body: "",
  });

  // const [section3, setSection3] = useState<DestinationSection3>({
  //   shortcut_types: [],
  //   label: [],
  // });

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
        .from("destinations")
        .upload(path, file, { upsert: false });

      if (error) {
        console.error(error);
        continue;
      }

      const { data } = supabase.storage.from("destinations").getPublicUrl(path);
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
      .from("destinations")
      .insert({
        country: base.country,
        tagline: base.tagline,
        description: base.description,
        continents: base.continents,
        image_urls,
      })
      .select("id")
      .single();

    if (error) {
      console.error(error);
      setMessage("Failed to create destination");
    } else {
      setDestinationId(data.id);
      localStorage.setItem("destinationId", String(data.id));
      setMessage("Destination card created ✔");
    }

    setLoading(false);
  };

  /* ================= SUBMIT 2 ================= */

  const handleSection2Submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!destinationId) {
      setMessage("Create destination first");
      return;
    }

    setLoading(true);
    setMessage("");

    const image_collages = await uploadImages(collageImages, "collages");

    const { error } = await supabase
      .from("destinations")
      .update({
        title: section2.title,
        subtitle: section2.subtitle,
        body: section2.body,
        image_collages,
      })
      .eq("id", destinationId);

    if (error) {
      console.error(error);
      setMessage("Failed to save section 2");
    } else {
      setMessage("Destination section 2 saved ✔");
    }

    setLoading(false);
  };

  /* ================= SUBMIT 3 ================= */

  // const handleSection3Submit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!destinationId) {
  //     setMessage("Create destination first");
  //     return;
  //   }

  //   setLoading(true);
  //   setMessage("");

  //   const image_groups = await uploadImages(groupImages, "groups");

  //   const { error } = await supabase
  //     .from("destinations")
  //     .update({
  //       shortcut_types: section3.shortcut_types,
  //       label: section3.label,
  //       image_groups,
  //     })
  //     .eq("id", destinationId);

  //   if (error) {
  //     console.error(error);
  //     setMessage("Failed to save section 3");
  //   } else {
  //     setMessage("Destination section 3 saved ✔");
  //     localStorage.removeItem("destinationId");
  //     setDestinationId(null);
  //   }

  //   setLoading(false);
  // };

  return (
    <div className="bg-gray-100 text-gray-800 relative">
      <div className="max-w-3xl mx-auto lg:ml-80 md:px-6 pt-24 lg:pt-16 pb-10 flex flex-col gap-6">
        <div className="bg-white border md:border-2 border-gray-100 rounded-3xl shadow-md overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex flex-col gap-1 border-b-2 border-gray-100 p-8 pb-6">
            <h2 className="text-base md:text-lg font-bold">
              Add a New Destination Card to{" "}
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
            onSubmit={handleBaseSubmit}
            className="grid grid-cols-1 gap-8 w-full p-8 md:p-10"
          >
            {/* NAME */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Country Name*</label>
              <input
                name="country"
                value={base.country}
                onChange={(e) => setBase({ ...base, country: e.target.value })}
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
                value={base.tagline}
                onChange={(e) => setBase({ ...base, tagline: e.target.value })}
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
                value={base.description}
                onChange={(e) =>
                  setBase({ ...base, description: e.target.value })
                }
                placeholder="Write a description"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 h-28 capitalize"
                required
              />
            </div>

            {/* DESTINATION AREA */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">City*</label>
              <select
                name="city"
                value={base.continents[0] || ""}
                onChange={(e) =>
                  setBase({ ...base, continents: [e.target.value] })
                }
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
                required
              >
                <option value="" disabled>
                  Select City
                </option>
                <option value="Asia">Asia</option>
                <option value="Africa">Africa</option>
                <option value="Europe">Europe</option>
                <option value="Middle East">Middle East</option>
                <option value="North America">North America</option>
                <option value="UAE">UAE</option>
              </select>
            </div>

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
              Enter Second Section for Destinations to{" "}
              <span className="text-teal-600">TravQuest</span>
            </h2>
            <p className="text-sm text-gray-400">
              Add your destination listing to{" "}
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

        {/* <div className="bg-white border md:border-2 border-gray-100 rounded-3xl shadow-md overflow-hidden flex flex-col">
         
          <div className="flex flex-col gap-1 border-b-2 border-gray-100 p-8 pb-6">
            <h2 className="text-lg font-bold">
              Enter Third Section for Destinations to{" "}
              <span className="text-teal-600">TravQuest</span>
            </h2>
            <p className="text-sm text-gray-400">
              Add your destination listing to{" "}
              <Link href="/" className="underline">
                TravQuest Marketplace
              </Link>
            </p>
          </div>

          <form
            onSubmit={handleSection3Submit}
            className="grid grid-cols-1 gap-8 w-full p-8 md:p-10"
          >
      
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Shortcut Types*</label>
              <input
                name="shortcut_types"
                value={section3.shortcut_types.join(", ")}
                onChange={(e) =>
                  setSection3({
                    ...section3,
                    shortcut_types: e.target.value
                      .split(",")
                      .map((v) => v.trim())
                      .filter(Boolean),
                  })
                }
                placeholder="Enter All Types"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 capitalize"
                required
              />
            </div>

   
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Label*</label>
              <input
                name="label"
                value={section3.label.join(", ")}
                onChange={(e) =>
                  setSection3({
                    ...section3,
                    label: e.target.value
                      .split(",")
                      .map((v) => v.trim())
                      .filter(Boolean),
                  })
                }
                placeholder="Enter Label"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 capitalize"
                required
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm font-bold">Upload Image Cards*</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setGroupImages(e.target.files)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5"
                required
              />
            </div>

       
            {message && (
              <p className="text-center text-sm text-teal-600">{message}</p>
            )}

        
            <div className="flex justify-end">
              <button className="select-none btn-orange-base btn-dynamic flex items-center gap-2">
                Save Section 3
                <TbSend2 size={20} />
              </button>
            </div>
          </form>
        </div> */}
      </div>
    </div>
  );
}

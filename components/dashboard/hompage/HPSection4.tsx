import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TbPencil } from "react-icons/tb";

const images = ["/assets/poster/event-desert-safari1.webp"];

const Section3 = () => {
  return (
    <div className="max-w-6xl mx-auto h-full px-8 2xl:px-0 ml-0 md:ml-80 2xl:ml-96 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-8 lg:py-10">
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex flex-col gap-1 text-gray-700">
            <h1 className="text-xl font-extrabold">Section 3</h1>
            <p className="text-gray-600 text-sm lg:text-base">
              Add or Update your section 3 content here!
            </p>
          </div>

          <div className="relative w-full">
            <Image
              src="/assets/hero/bg-burj-khalifa.jpg"
              alt="UAE"
              width={800}
              height={800}
              className="object-cover rounded-3xl"
            />
            <div className="absolute inset-0 bg-white/15 hover:bg-black/15 rounded-3xl duration-500" />
            <div>
              <Link
                href="/dashboard"
                className="absolute top-3 right-3 text-sm bg-white flex items-center gap-1 pl-3 py-2 px-4 rounded-2xl border border-gray-200 shadow-lg hover:scale-110 duration-500"
              >
                <TbPencil size={20} /> Edit
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-6 md:p-4 text-gray-700">
          <div>
            <h3 className="text-xl font-bold">
              Update{" "}
              <span className="text-[#f2836f]">Section 3 Information</span>
            </h3>
          </div>

          <form method="post" className="flex flex-col items-end gap-8">
            <div className="grid grid-cols-1 gap-8 text-gray-800 w-full">
              <div className="flex flex-col gap-3 w-full">
                <label className="text-teal-600 font-bold text-sm">
                  Section 3 Tagline<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Your S3 Tagline"
                  className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-3"
                  required
                />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <label className="text-teal-600 font-bold text-sm">
                  Section 3 Header<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Your S3 Header"
                  className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-3"
                  required
                />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <label className="text-teal-600 font-bold text-sm">
                  Section Description
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Your S3 Description"
                  className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-3"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="select-none btn-dark-sm btn-dynamic"
            >
              Update Info
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Section3;

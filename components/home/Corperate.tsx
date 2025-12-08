import React from "react";
import Image from "next/image";
import Link from "next/link";

const Corporate = () => {
  return (
    <div className="bg-linear-to-b from-[#ffffff] via-[#ffffff] to-[#f2836f]/10">
      <div className="max-w-6xl mx-auto py-4 md:py-8 px-6 md:px-10 2xl:px-0">
        <div className="relative h-[44vh] lg:h-[60vh] rounded-4xl w-full transition-all duration-1000 bg-gray-100">
          <Image
            src="/assets/hero/bg-burj-khalifa.jpg"
            alt=""
            fill
            className="object-cover rounded-3xl"
          />
          <div className="absolute inset-0 bg-white/15 hover:bg-black/15 rounded-4xl transition-all duration-700" />
        </div>

        <div className="max-w-4xl mx-4 lg:ml-20 -mt-20 bg-white p-6.5 md:p-10 hover:scale-105 duration-1000 shadow-xl border-2 border-gray-100 rounded-3xl flex flex-col items-center text-center md:items-start md:text-start justify-center gap-4 lg:gap-6 relative">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#f2836f]">
              Corperate Travels
            </h2>
            <label className="text-base lg:text-lg font-semibold text-teal-600">
              A MELTING POT OF CULTURES & TRADITIONS
            </label>
          </div>

          <p className="text-xs md:text-sm lg:text-base font-normal text-gray-600">
            The United Arab Emirates (UAE) is a melting pot of cultures and
            traditions, with a rich history and heritage while it is the home to
            a variety of landscapes, including beaches, deserts, mountains, and
            cityscapes.
          </p>

          <div className="flex items-center gap-4 mt-2">
            <Link
              href="/explore-uae"
              className="select-none btn-green-base btn-dynamic"
            >
              Explore More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Corporate;

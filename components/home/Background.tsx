import React from "react";
import Image from "next/image";
import Link from "next/link";

const Background = () => {
  return (
    <div className="bg-linear-to-b from-teal-700/20 via-[#ffffff] to-[#f2836f]/10">
      <div className="max-w-6xl mx-auto py-10 px-6 md:px-10 2xl:px-0">
        <div className="relative h-[60vh] rounded-3xl w-full duration-1000 bg-gray-100">
          <Image
            src="/assets/hero/bg-burj-khalifa.jpg"
            alt=""
            fill
            className="object-cover rounded-3xl"
          />
          <div className="absolute inset-0 bg-white/15 hover:bg-black/15 rounded-3xl duration-500" />
        </div>

        <div className="max-w-4xl mx-4 md:ml-20 -mt-20 bg-white p-6.5 md:p-10 hover:scale-105 duration-1000 shadow-xl border-2 border-gray-100 rounded-3xl flex flex-col items-center text-center md:items-start md:text-start justify-center gap-4 md:gap-6 relative z-[5]">
          <div className="flex flex-col gap-2">
            <label className="text-sm md:text-lg font-extrabold text-teal-600">
              A MELTING POT OF CULTURES & TRADITIONS
            </label>

            <h2 className="text-2xl md:text-3xl font-extrabold text-[#f2836f]">
              A Wonderous UAE
            </h2>
          </div>

          <p className="text-xs md:text-base text-gray-600">
            The United Arab Emirates (UAE) is a melting pot of cultures and
            traditions, with a rich history and heritage while it is the home to
            a variety of landscapes, including beaches, deserts, mountains, and
            cityscapes.
          </p>

          <div className="flex items-center gap-4 mt-2">
            <Link href="/explore-uae" className="select-none btn-orange-base btn-dynamic">
              Explore UAE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Background;

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Background = () => {
  return (
    <div className="bg-gradient-to-b from-[#f2836f]/10 via-[#ffffff] to-[#ffffff]">
      <div className="max-w-7xl mx-auto py-20 px-6 md:px-10 2xl:px-0">
        <div className="relative h-[60vh] rounded-3xl w-full duration-1000 bg-gray-100">
          <Image
            src="/assets/hero/bg-burj-khalifa.jpg"
            alt=""
            fill
            className="object-cover rounded-3xl"
          />
          <div className="absolute inset-0 bg-white/15 hover:bg-black/15 rounded-3xl duration-500" />
        </div>

        <div className="max-w-4xl mx-5 md:ml-20 -mt-20 bg-white p-8 md:p-10 shadow-xl border-2 border-gray-100 rounded-3xl flex flex-col items-center text-center md:items-start md:text-start justify-center gap-3 md:gap-4 relative z-[5]">
          <label className="text-sm md:text-lg font-extrabold text-teal-600">
            A MELTING POT OF CULTURES & TRADITIONS
          </label>

          <h2 className="text-2xl md:text-3xl font-extrabold text-[#f2836f]">
            A Wonderous UAE
          </h2>

          <p className="text-xs md:text-base text-gray-600">
            The United Arab Emirates (UAE) is a melting pot of cultures and
            traditions, with a rich history and heritage while it is the home to
            a variety of landscapes, including beaches, deserts, mountains, and
            cityscapes.
          </p>

          <div className="flex items-center gap-4 text-sm mt-2 md:mt-4">
            <Link href="/" className="select-none btn-green-base btn-dynamic">
              Explore UAE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Background;

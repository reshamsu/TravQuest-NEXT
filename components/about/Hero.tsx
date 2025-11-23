"use client";

import Image from "next/image";
import { TbSend2 } from "react-icons/tb";

const Hero = () => {
  return (
    <>
      <div className="">
        {/* Carousel */}
        <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden flex items-center justify-center text-center">
          <div className="absolute inset-0 w-full transition-opacity duration-1000 bg-gray-100">
            <Image
              src="/assets/hero/about.jpg"
              alt="Contact"
              fill
              className="object-cover"
            />
          <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="max-w-6xl mx-auto absolute inset-0 flex flex-col justify-center items-center text-center gap-4 text-white/70 z-10 px-8 md:px-10 2xl:px-0">
            <h1 className="text-3xl 2xl:text-5xl font-extrabold">
              WE STRIVE TO OFFER YOU A MEMORABLE EXPERIENCE
            </h1>
            <p className="text-sm md:text-lg font-semibold text-gray-100 max-w-3xl">
              Discover a New World of Travel and New destinations
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;

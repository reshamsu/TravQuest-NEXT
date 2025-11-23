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
              src="/assets/hero/burj-al-arab.jpg"
              alt="Contact"
              fill
              className="object-cover"
            />
           <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="max-w-6xl mx-auto absolute inset-0 flex flex-col justify-center items-center text-center gap-4 text-white/70 z-10 px-8 md:px-10 2xl:px-0">
            <h1 className="text-4xl 2xl:text-6xl font-extrabold">
              GET IN TOUCH
            </h1>
            <p className="text-sm md:text-lg font-semibold text-gray-100 max-w-3xl">
              We're here to assist you with any inquires about our solutions
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto -mt-20 lg:-mt-30 bg-white px-8 p-12 lg:hover:scale-105 duration-1000 lg:shadow-xl border-2 border-gray-100 flex flex-col gap-12 rounded-3xl relative z-5">
        <div className="flex flex-col items-center text-center justify-center gap-4 md:gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm md:text-lg font-extrabold text-teal-600">
              CONNECT
            </label>

            <h2 className="text-xl md:text-2xl font-extrabold text-[#f2836f]">
              WE ARE HERE TO SUPPORT YOUR JOURNEY
            </h2>
          </div>

          <p className="text-xs md:text-sm text-gray-600">
            Let’s continue to weave the tapestry of travel experiences with,
            more inspiring examples from The TravQuest Travel & Tourism Team. We
            can guide you through, your worldwide Hotel Bookings, Flight ticket
            arrangements, Visa Requirements, Arrival & Departure Transfer
            arrangements, Tours & Excursion Bookings, Corporate Events, and
            Meeting venue recommendations.
          </p>
        </div>

        <form method="post" className="flex flex-col items-end gap-8 px-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-800 w-full">
            <div className="flex flex-col gap-3 w-full">
              <label className="text-teal-600 font-bold text-sm">
                Full name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Your Full name"
                className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-3"
                required
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label className="text-teal-600 font-bold text-sm">
                Email Address<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Your Email Address"
                className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-3"
                required
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label className="text-teal-600 font-bold text-sm">
                Phone Number<span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="Your Phone Number"
                className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-3"
                required
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label className="text-teal-600 font-bold text-sm">
                Description that fits you<span className="text-red-500">*</span>
              </label>
              <select className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-3">
                <option value="" disabled>
                  Select one
                </option>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
              </select>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label className="text-teal-600 font-bold text-sm">
                Inquiry Subject<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Your Purpose"
                className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-3"
                required
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label className="text-teal-600 font-bold text-sm">
                Inquiry Message<span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Enter your message here"
                className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-3"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="select-none btn-orange-base btn-dynamic"
          >
            Submit Message <TbSend2 size={24} />
          </button>
        </form>
      </div>
    </>
  );
};

export default Hero;

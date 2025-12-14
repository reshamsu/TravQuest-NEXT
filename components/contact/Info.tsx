import React from "react";
import Link from "next/link";
import { TbPhone, TbMail, TbMapPin } from "react-icons/tb";

const Info = () => {
  return (
    <div className="bg-linear-to-b from-[#ffffff] via-[#ffffff] to-teal-700/20 text-gray-700">
      <div className="max-w-6xl mx-auto py-14 md:py-20 px-8 md:px-10 2xl:px-0">
        <div className="flex flex-col justify-center gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl 2xl:text-3xl font-bold text-teal-600">Reach out to Us</h2>
            <p className="text-xs md:text-sm font-normal text-justify text-gray-600 max-w-3xl">
              Reach out to us for bookings, tours, flights, visa support, or
              anything else.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-[15px]">
            {/* PHONE */}
            <div className="bg-[#f2836f]/5 border-4 border-[#f2836f]/60 hover:bg-teal-600/20 hover:border-teal-600/60 p-7 flex flex-col items-start justify-center gap-4 rounded-4xl hover:scale-105 duration-1000 group shadow-lg">
              <div className="p-3 bg-[#f2836f]/10 group-hover:bg-white/40 duration-700 rounded-2xl shadow-sm w-fit">
                <TbPhone size={30} className="text-3xl text-[#f2836f] group-hover:text-teal-600 transition-all" />
              </div>
              <label
                htmlFor="
              "
                className="flex flex-col gap-0.5 text-lg font-bold"
              >
                Call Us
                <Link
                  href="https://wa.me/971529991223"
                  className="text-sm md:text-base font-semibold hover:underline"
                >
                  +971 52 999 1223
                </Link>
              </label>
            </div>

            {/* EMAIL */}
            <div className="bg-[#f2836f]/5 border-4 border-[#f2836f]/60 hover:bg-teal-600/20 hover:border-teal-600/60 p-7 flex flex-col items-start justify-center gap-4 rounded-4xl hover:scale-105 duration-1000 group shadow-lg">
              <div className="p-3 bg-[#f2836f]/10 group-hover:bg-white/40 duration-700 rounded-2xl shadow-sm w-fit">
                <TbMail size={30} className="text-3xl text-[#f2836f] group-hover:text-teal-600 transition-all" />
              </div>
              <label
                htmlFor="
              "
                className="flex flex-col gap-0.5 text-lg font-bold"
              >
                Email Us
                <Link
                  href="mailto:shihan.suhood@thetravquest.com"
                  className="text-sm md:text-base font-medium hover:underline break-all"
                >
                  shihan.suhood@thetravquest.com
                </Link>
              </label>
            </div>

            {/* ADDRESS */}
            <div className="bg-[#f2836f]/5 border-4 border-[#f2836f]/60 hover:bg-teal-600/20 hover:border-teal-600/60 p-7 flex flex-col items-start justify-center gap-4 rounded-4xl hover:scale-105 duration-1000 group shadow-lg">
              <div className="p-3 bg-[#f2836f]/10 group-hover:bg-white/40 duration-700 rounded-2xl shadow-sm w-fit">
                <TbMapPin
                  size={30}
                  className="text-3xl text-[#f2836f] group-hover:text-teal-600 transition-all"
                />
              </div>
              <h3 className="text-sm md:text-base font-medium">
                PO Box 35195, Meydan Business Center,
                <br />
                Meydan Hotel, Dubai, U.A.E
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;

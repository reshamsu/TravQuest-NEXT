import React from "react";
import Link from "next/link";
import {
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { TbPhone, TbMail, TbMapPin } from "react-icons/tb";

const Info = () => {
  return (
    <div className="bg-linear-to-b from-[@ffffff] via-[#ffffff] to-teal-700/20">
      <div className="max-w-6xl mx-auto py-14 md:py-20 px-8 md:px-10 2xl:px-0">
        <div className="flex flex-col justify-center gap-8">
          {/* Heading */}
          <div className="flex flex-col gap-2">
            <label className="text-base md:text-lg font-extrabold text-[#f2836f]">
              CONTACT
            </label>
            <h2 className="text-2xl 2xl:text-3xl font-extrabold text-gray-700">
              REACH OUT TO US
            </h2>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[15px] text-white">
            {/* PHONE */}
            <div className="flex flex-col justify-center gap-6 rounded-3xl p-8 bg-teal-600 border border-[#f2836f]/30 hover:bg-[#f2836f] transition-all hover:scale-105 duration-700">
              <div className="bg-white/25 w-fit p-3 rounded-full">
                <TbPhone size={30} />
              </div>
              <label
                htmlFor="
              "
                className="flex flex-col gap-1.5 text-xl font-extrabold"
              >
                Call Us
                <Link
                  href="tel:+971529991223"
                  className="text-base md:text-base font-semibold hover:underline"
                >
                  +971 52 999 1223
                </Link>
              </label>
            </div>

            {/* EMAIL */}
            <div className="flex flex-col justify-center gap-6 rounded-3xl p-8 bg-teal-600 border border-[#f2836f]/30 hover:bg-[#f2836f] transition-all hover:scale-105 duration-700">
              <div className="bg-white/25 w-fit p-3 rounded-full">
                <TbMail size={30} />
              </div>
              <label
                htmlFor="
              "
                className="flex flex-col gap-1.5 text-xl font-extrabold"
              >
                Email Us
                <Link
                  href="mailto:shihan.suhood@thetravquest.com"
                  className="text-base md:text-base font-semibold hover:underline break-all"
                >
                  shihan.suhood@thetravquest.com
                </Link>
              </label>
            </div>

            {/* ADDRESS */}
            <div className="flex flex-col justify-center gap-3 rounded-3xl p-8 bg-teal-600 border border-[#f2836f]/30 hover:bg-[#f2836f] transition-all hover:scale-105 duration-700">
              <div className="bg-white/25 w-fit p-3 rounded-full">
                <TbMapPin size={30} />
              </div>
              <h3 className="text-base md:text-lg font-bold">
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

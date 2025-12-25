import React from "react";
import Image from "next/image";
import Link from "next/link";

const Corporate = () => {
  return (
    <div className="bg-linear-to-b from-[#ffffff] via-[#ffffff] to-[#f2836f]/10">
      <div className="max-w-6xl mx-auto py-10 md:py-20 px-8 md:px-10 2xl:px-0 grid lg:grid-cols-2">
        {/* IMAGE */}
        <div className="relative h-[44vh] lg:h-[64vh] rounded-t-full md:rounded-full md:rounded-tr-none w-full transition-all duration-1000 bg-gray-100">
          <Image
            src="/assets/poster/corporate_travels1.webp"
            alt="Corporate Travel Services in UAE"
            fill
            className="object-cover rounded-t-full md:rounded-full md:rounded-tr-none"
            priority
          />
          <div className="absolute inset-0 bg-white/15 hover:bg-black/15 rounded-t-full md:rounded-full md:rounded-tr-none transition-all duration-700" />
        </div>

        {/* CONTENT */}
        <div className="max-w-4xl lg:my-8 lg:-ml-30 bg-white p-7 md:px-14 shadow-xl border-2 border-gray-100 rounded-b-4xl md:rounded-4xl flex flex-col justify-center gap-4 relative">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl lg:text-2xl 2xl:text-3xl font-bold uppercase text-[#f2836f]">
              Corporate Travel Solutions
            </h2>
            <label className="text-base lg:text-lg font-bold text-teal-600">
              Seamless Business Travel. Executed with Precision.
            </label>
          </div>

          <p className="text-xs lg:text-sm font-normal text-justify text-gray-600">
            We specialize in end-to-end corporate travel management across the UAE,
            delivering reliable, time-efficient, and cost-controlled solutions
            for executives, teams, and business delegations. From flight and hotel
            coordination to visa assistance, airport transfers, and MICE travel,
            we ensure every journey aligns with your business objectives —
            without friction or delays.
          </p>

          <ul className="text-xs lg:text-sm text-gray-600 list-disc pl-4 space-y-1">
            <li>Executive & team travel planning</li>
            <li>Meetings, Incentives, Conferences & Exhibitions (MICE)</li>
            <li>Priority hotel, transport & visa coordination</li>
            <li>Dedicated corporate support & itinerary control</li>
          </ul>

          <div className="flex items-center mt-3">
            <Link
              href="/more/corporate-travels"
              className="select-none btn-green-base btn-dynamic"
            >
              Explore Corporate Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Corporate;

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Corporate = () => {
  return (
    <div className="bg-linear-to-b from-[#ffffff] via-[#ffffff] to-[#f2836f]/10">
      <div className="max-w-6xl mx-auto py-10 md:py-20 px-8 md:px-10 2xl:px-0 grid lg:grid-cols-2">
        {/* IMAGE */}
        <div className="relative h-[44vh] lg:h-[64vh] rounded-t-full lg:rounded-l-full w-full transition-all duration-1000 bg-gray-100">
          <Image
            src="/assets/poster/transfers.jpg"
            alt="Airport transfer services across UAE"
            fill
            className="object-cover rounded-t-full lg:rounded-l-full"
            priority
          />
          <div className="absolute inset-0 bg-white/15 hover:bg-black/15 rounded-t-full lg:rounded-l-full transition-all duration-700" />
        </div>

        {/* CONTENT */}
        <div className="max-w-4xl lg:my-10 lg:-ml-30 bg-white p-6.5 md:px-14 shadow-xl border-2 border-gray-100 rounded-b-4xl md:rounded-4xl flex flex-col justify-center gap-4 relative">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl lg:text-2xl 2xl:text-3xl font-bold uppercase text-[#f2836f]">
              Airport Transfers
            </h2>
            <label className="text-base lg:text-lg font-bold text-teal-600">
              Reliable, Punctual & Hassle-Free Ground Transportation
            </label>
          </div>

          <p className="text-xs lg:text-sm font-normal text-justify text-gray-600">
            Our airport transfer services ensure smooth arrivals and departures
            across the UAE for individuals, families, and corporate travelers.
            From executive pickups to group transfers, we provide professionally
            managed transportation that prioritizes punctuality, comfort, and
            safety — so your journey starts and ends without stress.
          </p>

          <ul className="text-xs lg:text-sm text-gray-600 list-disc pl-4 space-y-1">
            <li>Airport pickup & drop-off across all UAE airports</li>
            <li>Executive cars, SUVs, vans & group transport</li>
            <li>Meet & greet services on arrival</li>
            <li>24/7 coordination with flight tracking</li>
          </ul>

          <div className="flex items-center mt-3">
            <Link
              href="/more/airport-transfers"
              className="select-none btn-green-base btn-dynamic"
            >
              Explore Transfer Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Corporate;

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Corporate = () => {
  return (
    <div className="bg-linear-to-b from-[#f2836f]/10 via-[#ffffff] to-[#ffffff]">
      <div className="max-w-6xl mx-auto py-4 md:p-10 px-8 md:px-10 2xl:px-0 flex flex-col-reverse lg:grid grid-cols-1 lg:grid-cols-2">
        {/* CONTENT */}
        <div className="max-w-4xl lg:my-10 lg:-mr-30 bg-white p-6.5 md:px-14 shadow-xl border-2 border-gray-100 rounded-b-4xl md:rounded-4xl flex flex-col justify-center gap-4 relative z-30">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl lg:text-2xl 2xl:text-3xl font-bold uppercase text-[#f2836f]">
              Monthly & Long-Term Stays
            </h2>
            <label className="text-base lg:text-lg font-bold text-teal-600">
              Flexible Living Solutions for Extended Travel
            </label>
          </div>

          <p className="text-xs lg:text-sm font-normal text-justify text-gray-600">
            Designed for professionals, families, digital nomads, and project-based
            teams, our monthly and long-term stay solutions offer comfort,
            flexibility, and cost efficiency across the UAE. We curate serviced
            apartments, extended-stay hotels, and residential options that suit
            longer durations — without compromising convenience, location, or
            lifestyle.
          </p>

          <ul className="text-xs lg:text-sm text-gray-600 list-disc pl-4 space-y-1">
            <li>Serviced apartments & extended-stay hotels</li>
            <li>Ideal for relocations, consultants & remote work</li>
            <li>Flexible monthly pricing & tailored packages</li>
            <li>Prime locations with business & lifestyle access</li>
          </ul>

          <div className="flex items-center mt-2">
            <Link
              href="/more/monthly-long-stays"
              className="select-none btn-orange-base btn-dynamic"
            >
              Explore Long-Term Stays
            </Link>
          </div>
        </div>

        {/* IMAGE */}
        <div className="relative h-[44vh] lg:h-[64vh] rounded-t-full lg:rounded-r-full w-full transition-all duration-1000 bg-gray-100">
          <Image
            src="/assets/poster/monthly-stays.avif"
            alt="Monthly and long-term stays in UAE"
            fill
            className="object-cover rounded-t-full lg:rounded-r-full"
            priority
          />
          <div className="absolute inset-0 bg-white/15 hover:bg-black/15 rounded-t-full lg:rounded-r-full transition-all duration-700" />
        </div>
      </div>
    </div>
  );
};

export default Corporate;

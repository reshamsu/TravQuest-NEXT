import React from "react";
import {
  TbKey,
  TbShieldCheck,
  TbCompass,
  TbPlaneDeparture,
} from "react-icons/tb";

const Values = () => {
  const valueData = [
    {
      title: "Seamless Unlock",
      description:
        "Unlock travel opportunities effortlessly with tools designed to simplify every step of your journey.",
      icon: <TbKey size={32} className="text-teal-600" />,
    },
    {
      title: "Transparent Trust",
      description:
        "Your trust matters most — clear pricing, secure bookings, and no hidden surprises, ever.",
      icon: <TbShieldCheck size={32} className="text-teal-600" />,
    },
    {
      title: "Smart Travel",
      description:
        "Plan smarter with personalized insights, curated itineraries, and guidance tailored to your style.",
      icon: <TbCompass size={32} className="text-teal-600" />,
    },
    {
      title: "Adventure Ready",
      description:
        "From weekend getaways to bucket-list escapes, we equip you to explore the world with confidence.",
      icon: <TbPlaneDeparture size={32} className="text-teal-600" />,
    },
  ];

  return (
    <div className="bg-gray-50 text-gray-700 relative">
      <div className="max-w-6xl mx-auto py-20 px-8 2xl:px-0 flex flex-col gap-10">
        <div className="flex flex-col items-start text-start gap-3">
          <h1 className="text-2xl 2xl:text-3xl font-extrabold">
            WHAT <span className="text-[#f2836f]">WE DO</span>
          </h1>
          <p className="text-sm 2xl:text-base max-w-3xl">
            The principles that guide how we make travel simple, safe, and
            extraordinary for you.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueData.map((val) => (
            <div
              key={val.title}
              className="bg-white p-7 flex flex-col items-start gap-6 rounded-3xl hover:scale-105 duration-1000 group shadow-lg"
            >
              <div className="p-3 bg-gray-100 rounded-2xl shadow-sm w-fit">
                {val.icon}
              </div>
              <div className="flex flex-col gap-2.5">
                <h3 className="text-lg font-extrabold">{val.title}</h3>
                <p className="text-sm md:text-xs text-gray-500">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Values;

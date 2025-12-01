import React from "react";
import {
  FaHandshake,
  FaStar,
  FaFire,
  FaLightbulb,
  FaUserTie,
  FaLeaf,
  FaGlobeAsia,
  FaSuitcaseRolling,
  FaBuilding,
} from "react-icons/fa";

const Values = () => {
  const items = [
    {
      icon: <FaHandshake className="text-3xl text-[#f2836f]" />,
      title: "Integrity",
      description: "Authenticity and transparency in every journey.",
    },
    {
      icon: <FaStar className="text-3xl text-[#f2836f]" />,
      title: "Service Excellence",
      description: "Going beyond expectations with precision and care.",
    },
    {
      icon: <FaFire className="text-3xl text-[#f2836f]" />,
      title: "Passion",
      description: "Driven by a genuine love for travel and expertise.",
    },
    {
      icon: <FaLightbulb className="text-3xl text-[#f2836f]" />,
      title: "Innovation",
      description: "Tech-driven solutions keeping you ahead.",
    },
    {
      icon: <FaUserTie className="text-3xl text-[#f2836f]" />,
      title: "Professionalism",
      description: "Guided by experts with 25+ years of industry experience.",
    },
    {
      icon: <FaLeaf className="text-3xl text-[#f2836f]" />,
      title: "Sustainability",
      description: "Committed to responsible travel and community impact.",
    },
    {
      icon: <FaGlobeAsia className="text-3xl text-[#f2836f]" />,
      title: "Personalized Travel",
      description: "Handpicked destinations and tailored itineraries.",
    },
    {
      icon: <FaSuitcaseRolling className="text-3xl text-[#f2836f]" />,
      title: "Seamless Services",
      description:
        "Meet & greet, transfers, hotels, tours, attractions, visas.",
    },
    {
      icon: <FaBuilding className="text-3xl text-[#f2836f]" />,
      title: "Corporate Events",
      description: "Professional handling of launches, events, and functions.",
    },
  ];

  return (
    <div className="bg-gray-100 text-gray-700 relative">
      <div className="max-w-6xl mx-auto py-20 px-8 2xl:px-0 flex flex-col gap-10">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-start gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor=""
              className="text-base md:text-lg font-bold text-teal-600"
            >
              OUR VALUES
            </label>
            <h1 className="text-3xl 2xl:text-4xl font-bold">
              What <span className="text-[#f2836f]">We Do</span>
            </h1>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm 2xl:text-base font-normal text-gray-600">
              At <strong>The TravQuest Travel & Tourism</strong>, we specialize
              in curating unforgettable journeys. Our mission is to turn your
              travel dreams into reality.
            </p>
            <p className="text-sm 2xl:text-base font-normal text-gray-600">
              Explore our handpicked destinations, expertly crafted itineraries,
              and personalized experiences. Whether you seek adventure,
              relaxation, or cultural immersion, we're here to create your
              perfect getaway.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 flex flex-col items-start gap-6 rounded-3xl hover:scale-105 duration-1000 group shadow-lg"
            >
              <div className="p-3 bg-[#f2836f]/10 rounded-2xl shadow-sm w-fit">
                {item.icon}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold capitalize text-teal-600">
                  {item.title}
                </h3>
                <p className="text-sm font-normal text-gray-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Values;

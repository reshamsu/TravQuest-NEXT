import React from "react";
import Image from "next/image";

const images = [
  "/assets/hero/burj-khalifa.jpg",
  "/assets/hero/burj-khalifa.jpg",
  "/assets/hero/burj-khalifa.jpg",
  "/assets/hero/burj-khalifa.jpg",
];

const Welcome = () => {
  return (
    <div className="max-w-7xl mx-auto py-16 grid grid-cols-1 md:grid-cols-2 gap-16 px-6 md:px-10 2xl:px-0">
      <div className="grid grid-cols-2 gap-6">
        {images.map((src, i) => (
          <div
            key={i}
            className="relative h-[200px] w-full duration-1000 bg-gray-100"
          >
            <Image src={src} alt={`Media ${i + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>

      <div className="text-3xl font-semibold">Welcome</div>
    </div>
  );
};

export default Welcome;

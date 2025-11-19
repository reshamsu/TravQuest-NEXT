"use client";

import Link from "next/link";
import {
  FaWhatsapp,
  FaRegCopyright,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { TbMail } from "react-icons/tb";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();

  const handleNavClick = (path: string) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    router.push(path);
  };

  return (
    <footer className="bg-gray-900 text-gray-500 border-t border-white/10">
      <div className="max-w-7xl mx-auto py-14 2xl:pt-20 pb-10 px-8 2xl:px-0 flex flex-col items-center gap-10">
        <div className="flex flex-col lg:flex-row gap-10 w-full pb-10 border-b border-gray-800">
          <div className="flex flex-col items-center text-center gap-6 w-full md:w-xs">
            {/* <Link href="/" className="flex items-center gap-1">
              <Image
                src="/favicon.ico"
                alt="TQ"
                width={70}
                height={70}
                className="object-contain"/>
              <h1 className={`${kaushan.className} flex text-2xl 2xl:text-3xl font-extrabold text-teal-500`}>
                Trav<span className="text-[#f2836f]">Quest</span>
              </h1>
            </Link> */}
            <Link href="/" className="flex items-center gap-1">
              <Image
                src="/tq-logo.png"
                alt="TQ"
                width={220}
                height={220}
                className="object-contain"
              />
            </Link>

            <p className="text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>

            <ul className="flex gap-2 text-xl 2xl:text-2xl">
              <li>
                <Link
                  href="https://wa.me/971529991223"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex border rounded-2xl border-gray-800 p-2 hover:text-[#f2836f] hover:border-gray-800"
                >
                  <FaWhatsapp />
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.facebook.com/The-TravQuest-Travel-and-Tourism-LLC-61575280895213"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex border rounded-2xl border-gray-800 p-2 hover:text-[#f2836f] hover:border-gray-800"
                >
                  <FaFacebook />
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.instagram.com/trav.quest/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex border rounded-2xl border-gray-800 p-2 hover:text-[#f2836f] hover:border-gray-800"
                >
                  <FaInstagram />
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex border rounded-2xl border-gray-800 p-2 hover:text-[#f2836f] hover:border-gray-800"
                >
                  <FaLinkedin />
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:info@travelquest.com"
                  className="flex border rounded-2xl border-gray-800 p-2 hover:text-[#f2836f] hover:border-gray-800"
                >
                  <TbMail />
                </Link>
              </li>
            </ul>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full text-xs 2xl:text-sm">
            {/* Explore */}
            <div className="ml-0 xl:ml-10">
              <h6 className="text-sm 2xl:text-base font-semibold mb-3 text-white">
                Explore
              </h6>
              <ul className="flex flex-col gap-3">
                {[
                  "Write a Review",
                  "Community Forum",
                  "Travel Guides",
                  "Travelers' Choice",
                  "Blogs",
                ].map((item, i) => (
                  <li key={i}>
                    <Link
                      href="/explore"
                      className="hover:text-[#f2836f] hover:underline"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="ml-0 xl:ml-4">
              <h6 className="text-sm 2xl:text-base font-semibold mb-3 text-white">
                Support
              </h6>
              <ul className="flex flex-col gap-3">
                {[
                  "Help Center",
                  "Safety Regulations",
                  "Disability Support",
                  "Help with Booking",
                  "Emergency Contacts",
                ].map((item, i) => (
                  <li key={i}>
                    <Link
                      href="/blogs"
                      className="hover:text-[#f2836f] hover:underline"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div className="ml-0 xl:ml-4">
              <h6 className="text-sm 2xl:text-base font-semibold mb-3 text-white">
                Services
              </h6>
              <ul className="flex flex-col gap-3">
                {[
                  "Flights",
                  "Hotels",
                  "Rides",
                  "Cruise Tours",
                  "Holiday Packages",
                ].map((item, i) => (
                  <li key={i}>
                    <Link
                      href="/services"
                      className="hover:text-[#f2836f] hover:underline text-left"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h6 className="text-sm 2xl:text-base font-semibold mb-3 text-white">
                TravQuest
              </h6>
              <ul className="flex flex-col gap-3">
                {[
                  "About Us",
                  "Resource and Policy",
                  "Careers",
                  "Trust and Safety",
                  "Contact Us",
                ].map((item, i) => (
                  <li key={i}>
                    <Link
                      href="/about"
                      className="hover:text-[#f2836f] hover:underline"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 pb-10 border-b border-gray-800">
          <div className="flex flex-col gap-3 text-center md:text-left">
            <h6 className="text-white text-sm 2xl:text-base font-semibold">
              Stay in the loop
            </h6>
            <p className="text-xs text-gray-400">
              Subscribe for travel deals, updates, and exclusive offers.
            </p>
            <div className="flex gap-2.5 mt-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-3 rounded-3xl text-sm bg-white/20 text-white"
              />
              <button className="btn-orange-sm">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="w-full flex flex-col items-center gap-3">
          <p className="text-sm flex items-center text-center gap-1">
            <FaRegCopyright /> 2025 TravQuest. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

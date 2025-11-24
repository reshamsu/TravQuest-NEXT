"use client";

import Link from "next/link";
import {
  FaRegCopyright,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();

  return (
    <footer className="bg-gray-200 text-gray-800 py-6 border-t border-black/5">
      {/* Bottom Line */}
      <div className="w-full flex flex-col items-center gap-3">
        <p className="text-sm flex items-center text-center gap-1">
          <FaRegCopyright /> 2025 TravQuest. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

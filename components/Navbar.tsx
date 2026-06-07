"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-black/50 backdrop-blur-xl border-b border-white/10 py-4"
          : "bg-transparent py-6"
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
        {/* Branding */}
        <div className="flex items-center space-x-3 cursor-pointer">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-orange-500"
          >
            <path
              d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
              fill="url(#banana-lightning)"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient
                id="banana-lightning"
                x1="12"
                y1="2"
                x2="12"
                y2="22"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#f97316" />
                <stop offset="1" stopColor="#eab308" />
              </linearGradient>
            </defs>
          </svg>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-500 tracking-wide">
            Juicery
          </span>
        </div>

        {/* Action Button */}
        <div>
          <button className="relative group overflow-hidden rounded-full bg-white/10 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]">
            <span className="relative z-10">Order Now</span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-orange-500 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"></div>
            <span className="relative z-10 group-hover:text-white mix-blend-overlay">Order Now</span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

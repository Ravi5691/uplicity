"use client";

import { Anton } from "next/font/google";
import { Inter } from "next/font/google";
import Link from "next/link";
import { FaArrowRightLong, FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { MdOutlinePhone } from "react-icons/md";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400"] });
const anton = Anton({ subsets: ["latin"], weight: ["400"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

export default function Footer() {
  return (
    <div className="w-screen max-w-8xl flex flex-col transition-all duration-800 ease-out bg-[#acd3ff] text-white relative z-10">
      <div className="w-full bg-blue-500 md:rounded-t-[80px] rounded-t-[40px] p-5">

        {/* Brand text — full width on all breakpoints */}
        <div className="relative w-full overflow-hidden border-b-2 border-white/70">
          <h1
            className={`${anton.className} 
    absolute inset-0 
    flex items-center justify-center 
    text-white/40 
    leading-none 
    whitespace-nowrap scale-y-[0.50] `}
            style={{
              fontSize: "clamp(3rem, 28vw, 22rem)",
            }}
          >
            uplicity <span className="md:block hidden">.in</span>
          </h1>

          {/* spacer to give height */}
          <div className="h-[20vw] md:h-[16vw]" />
        </div>

        {/* ——— DESKTOP GRID (md+) ——— */}
        <div className="hidden md:grid md:grid-cols-2 md:h-100 w-full px-7 py-10 overflow-hidden">
          {/* Left col */}
          <div className="flex items-start justify-start px-2 border-r-2 border-white/70">
            <div className="text-white flex flex-col text-base">
              <div className="flex flex-col space-y-5 text-justify">
                <div className="w-full">
                  <h3 className="font-light uppercase text-5xl text-white leading-tight">Get in Touch</h3>
                  <div className="flex items-center w-full">
                    <input
                      type="text"
                      placeholder="enter your email"
                      className="border-b-2 border-white/70 w-xs p-2 text-white outline-none bg-transparent"
                    />
                    <div className="text-white/70 p-3"><FaArrowRightLong /></div>
                  </div>
                </div>
                <span className="font-light w-xl">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae nam hic libero quod in, fugit error dolorem provident ea.
                </span>
                <span className="font-light">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis unde hic voluptates.
                </span>
                <div className="flex items-center gap-2 text-white">
                  <MdOutlinePhone />
                  <span>+91 9311259066 , +91 78268735286</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right col */}
          <div className="relative flex flex-col items-end h-full">
            <h3 className="font-light w-xl text-justify text-base text-white tracking-wide">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla laborum temporibus sunt a deleniti iure ut cupiditate debitis sequi consequatur quo.
            </h3>
            <div className="flex items-center gap-5 text-xl text-white text-2xl mt-5">
              <Link href="/"><FaInstagram /></Link>
              <Link href="/"><FaXTwitter /></Link>
            </div>
            <div className="font-light text-7xl text-white mt-6 absolute -bottom-5 text-left leading-tight">
              BEYOND NEXT GEN
            </div>
          </div>
        </div>

        {/* ——— MOBILE / TABLET LAYOUT ——— */}
        <div className="md:hidden flex flex-col w-full px-3 pt-8 pb-6 gap-8">

          {/* Get in touch */}
          <div className="flex flex-col gap-4">
            <h3 className="font-light uppercase text-4xl text-white leading-tight">Get in Touch</h3>
            <div className="flex items-center border-b-2 border-white/70 pb-1">
              <input
                type="text"
                placeholder="enter your email"
                className="flex-1 p-2 text-white outline-none bg-transparent text-sm placeholder-white/60"
              />
              <div className="text-white/70 p-2 text-sm"><FaArrowRightLong /></div>
            </div>
            <p className="font-light text-sm text-white/90 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae nam hic libero quod in, fugit error dolorem provident ea.
            </p>
            <div className="flex items-center gap-2 text-white text-sm">
              <MdOutlinePhone />
              <span>+91 9311259066</span>
            </div>
            <div className="flex items-center gap-2 text-white text-sm">
              <MdOutlinePhone />
              <span>+91 78268735286</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t-2 border-white/30" />

          {/* About + socials */}
          <div className="flex flex-col gap-4">
            <p className="font-light text-sm text-white/90 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla laborum temporibus sunt a deleniti iure ut cupiditate debitis.
            </p>
            <div className="flex items-center gap-5 text-2xl text-white">
              <Link href="/"><FaInstagram /></Link>
              <Link href="/"><FaXTwitter /></Link>
            </div>
          </div>

          {/* Big tagline */}
          <div className="border-t-2 border-white/30 pt-6">
            <div
              className="font-light text-white leading-tight"
              style={{ fontSize: "clamp(2rem, 8vw, 3.5rem)" }}
            >
              BEYOND NEXT GEN
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="font-light py-4 flex md:flex-row flex-col md:gap-0 gap-2 justify-between md:text-xl md:px-7 px-5 items-center text-white border-t-2 border-white/70 text-sm">
          <div className="flex gap-6 md:gap-10">
            <Link href="/">Privacy Policy</Link>
            <Link href="/">Term &amp; Conditions</Link>
          </div>
          <div className="text-white/50">
            Copyright 2025 <span className="text-white">UPLICITY</span>
          </div>
        </div>
      </div>
    </div>
  );
}
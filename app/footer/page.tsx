"use client";

import { useEffect, useRef, useState } from "react";
import { Anton } from "next/font/google";
import { Inter } from "next/font/google";
import Link from "next/link";
import { FaArrowRight, FaInstagram, FaLongArrowAltRight } from "react-icons/fa";
import { FaArrowRightLong, FaPhone, FaXTwitter } from "react-icons/fa6";
import { MdOutlinePhone } from "react-icons/md";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "400"] });
const anton = Anton({ subsets: ["latin"], weight: ["400", "400"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });


export default function Footer() {
  return (
    <div
      // ref={footerRef}
      className={`
    w-screen max-w-8xl flex flex-col p-5
    transition-all duration-800 ease-out
    bg-[#e1e1e1] dark:bg-[#0c0c0c] text-black dark:text-white  relative z-10
  `}//${active ? "lightgreen-noise" : "bg-noise"}
    >
      <div className="w-full overflow-hidden">
        <div className={`relative flex justify-center overflow-hidden items-center border-b-2 dark:border-white/20 border-black/20 w-full`}>
          <span className={`${anton.className} text-center z-10 text-[clamp(3rem,24vw,24rem)] w-full dark:text-white/10 text-black/20 leading-60 scale-y-[0.50]`}>uplicity.in</span>
        </div>
      </div>
      <div className=" md:h-100 h-110 w-full grid grid-cols-1 md:grid-cols-2 px-5 md:px-7 py-6 md:py-10 overflow-hidden">
        <div className={`flex items-start justify-start px-2 mt-4 md:mt-0 border-r-2 dark:border-white/20 border-black/20`}>
          <div className={` dark:text-[#ffffff9b] text-[#0000009b]  flex flex-col md:text-base text-sm order-1 md:order-2`}>
            <div className="flex flex-col space-y-5 text-justify">

              <div className="w-full">
                <h3 className={`font-light uppercase text-5xl dark:text-white text-black leading-tight `} >Get in Touch</h3>
                <div
                  className="flex items-center w-full"
                >
                  <input
                    type="text"
                    placeholder="enter your email"
                    className={` border-b-2 border-black/50 dark:border-white/50 w-full md:w-xs p-2 dark:text-[#ffffff9b] text-[#0000009b] outline-none`}
                  />
                  <div className={`dark:text-white/50 text-black/50 md:p-3 p-[11px]`}>
                    <FaArrowRightLong />
                  </div>
                </div>
              </div>

              <span className={`font-light w-full md:w-xl `}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae nam hic libero quod in, fugit error dolorem provident ea, eum illo vel sed explicabo voluptatibus placeat quas suscipit alias ut.
              </span>

              <span className={`font-light`}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis unde hic voluptates.
              </span>

              <div className="flex items-center gap-2 dark:text-white text-black">
                <MdOutlinePhone />
                <span>+91 9311259066 , +91 78268735286</span>
              </div>

            </div>
          </div>
        </div>

        <div className={`relative flex flex-col items-center md:items-end h-full `}>

          <h3 className={` font-light w-full md:w-xl text-justify text-sm md:text-base dark:text-[#ffffff9b] text-[#0000009b] tracking-wide`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla laborum temporibus sunt a deleniti iure ut cupiditate debitis sequi consequatur quo, atque, veritatis facere blanditiis ex impedit necessitatibus velit. Laudantium.
          </h3>

          <div className="flex items-center gap-5 text-xl dark:text-white text-black md:text-2xl mt-5">
            <Link href="/"><FaInstagram /></Link>
            <Link href="/"><FaXTwitter /></Link>
          </div>

          {/* BIG TEXT */}
          <div className={`font-light text-5xl md:text-7xl dark:text-white text-black md:mt-6 mt-3 md:absolute md:-bottom-5 text-center md:text-left leading-tight `}>
            BEYOND NEXT GEN
          </div>
        </div>
      </div>


      <div className={`font-light py-4 flex md:flex-row flex-col md:gap-0 gap-2 justify-between md:text-xl md:px-7 items-center dark:text-[#ffffff9b] text-[#0000009b] border-t-2 dark:border-white/20 border-black/20`}>
        <div className="flex gap-10">
          <Link href="/">Privacy Policy</Link>
          <Link href="/">Term & Conditions</Link>
        </div>
        <div className={`dark:text-white/20 text-black/20`}> Copyright 2025 <span className={`dark:text-[#ffffff9b] text-[#0000009b]`} >UPLICITY</span></div>
      </div>
    </div>
  );
}

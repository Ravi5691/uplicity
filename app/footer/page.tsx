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
  // const footerRef = useRef<HTMLDivElement | null>(null);
  // const triggerY = useRef<number | null>(null);
  // const lastScrollY = useRef(0);

  // const [active, setActive] = useState(false);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       const currentY = window.scrollY;
  //       const scrollingDown = currentY > lastScrollY.current;
  //       lastScrollY.current = currentY;

  //       if (
  //         scrollingDown &&
  //         entry.intersectionRatio >= 0.4 &&
  //         triggerY.current === null
  //       ) {
  //         triggerY.current = currentY;
  //         setActive(true);
  //       }
  //     },
  //     { threshold: [0.4] }
  //   );

  //   if (footerRef.current) observer.observe(footerRef.current);
  //   return () => observer.disconnect();
  // }, []);

  // useEffect(() => {
  //   const onScroll = () => {
  //     if (
  //       triggerY.current !== null &&
  //       window.scrollY < triggerY.current
  //     ) {
  //       setActive(false);
  //       triggerY.current = null;
  //     }
  //   };

  //   window.addEventListener("scroll", onScroll, { passive: true });
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);

  return (
    <div
      // ref={footerRef}
      className={`
    w-screen max-w-8xl flex flex-col p-5
    transition-all duration-800 ease-out
    bg-noise
  `}//${active ? "lightgreen-noise" : "bg-noise"}
    >
      <div className="w-full overflow-hidden">
        <div className={`relative flex justify-center overflow-hidden items-center border-b-2 border-white/20 w-full`}>
          <span className={`${anton.className} text-center z-10 text-[clamp(3rem,24vw,24rem)] w-full text-white/10 leading-60 scale-y-[0.50]`}>uplicity.in</span>
        </div>
      </div>



      <div className=" md:h-100 h-110 w-full grid grid-cols-1 md:grid-cols-2 px-5 md:px-7 py-6 md:py-10 overflow-hidden">
        <div className={`flex items-start justify-start px-2 mt-4 md:mt-0 border-r-2 border-white/20`}>
          <div className={` text-[#ffffff9b] flex flex-col md:text-base text-sm order-1 md:order-2`}>
            <div className="flex flex-col space-y-5 text-justify">

              <div className="w-full">
                <h3 className={`${anton.className} uppercase text-5xl text-white leading-tight `} >Get in Touch</h3>
                <div
                  className="flex items-center w-full"
                >
                  <input
                    type="text"
                    placeholder="enter your email"
                    className={`${inter.className} border-b-2 w-full md:w-xs p-2 text-[#ffffffe0] outline-none`}
                  />
                  <div className={`text-white/50 md:p-3 p-[11px]`}>
                    <FaArrowRightLong />
                  </div>
                </div>
              </div>

              <span className={`${inter.className} w-full md:w-xl `}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae nam hic libero quod in, fugit error dolorem provident ea, eum illo vel sed explicabo voluptatibus placeat quas suscipit alias ut.
              </span>

              <span className={`${inter.className}`}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis unde hic voluptates.
              </span>

              <div className="flex items-center gap-2">
                <MdOutlinePhone />
                <span>+91 1234567997 , +91 78268735286</span>
              </div>

            </div>
          </div>
        </div>

        <div className={`relative flex flex-col items-center md:items-end h-full `}>

          <h3 className={`${inter.className} w-full md:w-xl text-justify text-sm md:text-base text-[#ffffff9b] tracking-wide`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla laborum temporibus sunt a deleniti iure ut cupiditate debitis sequi consequatur quo, atque, veritatis facere blanditiis ex impedit necessitatibus velit. Laudantium.
          </h3>

          <div className="flex items-center gap-5 text-xl text-white md:text-2xl mt-5">
            <Link href="/"><FaInstagram /></Link>
            <Link href="/"><FaXTwitter /></Link>
          </div>

          {/* BIG TEXT */}
          <div className={`${anton.className} text-5xl md:text-8xl text-white md:mt-6 mt-3 md:absolute md:-bottom-5 text-center md:text-left leading-tight `}>
            BEYOND NEXT GEN
          </div>
        </div>
      </div>


      <div className={` ${anton.className} py-4 flex md:flex-row flex-col md:gap-0 gap-2 justify-between md:text-xl md:px-7 items-center text-[#ffffffcd] border-t-2 border-white/20`}>
        <div className="flex gap-10">
          <Link href="/">Privacy Policy</Link>
          <Link href="/">Term & Conditions</Link>
        </div>
        <div className={`text-white/20`}> Copyright 2025 <span className={`text-[#ffffff]`} >UPLICITY</span></div>
      </div>
    </div>
  );
}

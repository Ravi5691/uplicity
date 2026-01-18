"use client";

import { useEffect, useRef, useState } from "react";
import { Anton } from "next/font/google";
import VideoGrid from "./videoGrid";

const anton = Anton({ subsets: ["latin"], weight: ["400"] });

export default function Service1() {
  // const sectionRef = useRef<HTMLDivElement | null>(null);

  // const [isNear, setIsNear] = useState(false);
  // const triggerY = useRef<number | null>(null);
  // const lastScrollY = useRef(0);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       const currentY = window.scrollY;
  //       const scrollingDown = currentY > lastScrollY.current;
  //       lastScrollY.current = currentY;

  //       // 🔽 DOWN: store trigger point
  //       if (
  //         scrollingDown &&
  //         entry.intersectionRatio >= 0.4 &&
  //         triggerY.current === null
  //       ) {
  //         triggerY.current = currentY;
  //         setIsNear(true);
  //       }
  //     },
  //     { threshold: [0.7] }
  //   );

  //   if (sectionRef.current) observer.observe(sectionRef.current);
  //   return () => observer.disconnect();
  // }, []);

  // 🔼 UP: reverse at SAME scroll position
  // useEffect(() => {
  //   const onScroll = () => {
  //     if (
  //       triggerY.current !== null &&
  //       window.scrollY < triggerY.current
  //     ) {
  //       setIsNear(false);
  //       triggerY.current = null; // reset for next cycle
  //     }
  //   };

  //   window.addEventListener("scroll", onScroll, { passive: true });
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);

  return (
    <div
      // ref={sectionRef}
      className={`
        flex flex-col transition-all duration-700 ease-out
        bg-noise
      `}
    >
      {/* HERO */}
      <div className="relative flex flex-col items-center w-screen max-w-8xl overflow-hidden p-10">
        <div className="relative flex justify-between items-center ">
          <span
            className={`
              ${anton.className}
              text-center z-10 text-[clamp(5rem,13vw,13rem)] w-full leading-none scale-y-[0.80] text-white/20
            `}
          >
            video
          </span>
          <div className="h-50 w-full overflow-hidden">
            <video src="/uiVideo/1.mp4" muted autoPlay loop  className="object-cover"></video>
          </div>
          <span
            className={`
              ${anton.className}
              text-center z-10 text-[clamp(5rem,13vw,13rem)] w-full leading-none scale-y-[0.80] text-white/20
            `}
          >
            editing
          </span>
        </div>
        <h2
          className={`${anton.className} text-[clamp(2.8rem,1vw,1rem)] leading-none scale-y-[0.50] pb-10 border-b-2 border-white/20 text-[#ffffffe9]`}
        >
          Custom web development services to build responsive and dynamic websites.
        </h2>
      </div>

      <div className={`text-white/80`}>
        <VideoGrid />
      </div>
    </div>
  );
}

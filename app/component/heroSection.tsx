"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const boxesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleLines = gsap.utils.toArray<HTMLElement>(".line");

      if (titleLines.length) {
        gsap.fromTo(
          titleLines,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 1.2,
            ease: "power1.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      // optional: keep your boxes animation
      gsap.fromTo(
        boxesRef.current,
        {
          opacity: 0,
          rotateX: 15,
          y: 40,
        },
        {
          opacity: 1,
          rotateX: 0,
          y: 0,
          duration: 1.8,
          ease: "power1.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 75%",
          },
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="font-extralight relative pointer-events-none text-white flex flex-col gap-5 justify-center items-center h-screen w-screen bg-blue-500 p-10 pb-0 overflow-hidden"
    >
      {/* Description block — repositioned for mobile */}
      <div className="z-20 absolute md:top-20 md:bottom-auto md:left-11 md:right-auto bottom-4 right-4 md:max-w-xs max-w-[160px] uppercase tracking-wider text-white/80 md:text-xs text-[8px]">
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nesciunt at ad cupiditate</span>
        <div className="grid grid-cols-5 max-w-35 mt-2">
          <div className="h-10 w-10 bg-white/20 rounded-full"></div>
          <div className="h-10 w-10 bg-white/20 rounded-full"></div>
          <div className="h-10 w-10 bg-white/20 rounded-full"></div>
          <div className="h-10 w-10 bg-white/20 rounded-full"></div>
          <div className="h-10 w-10 bg-white/20 rounded-full"></div>
        </div>
      </div>

      {/* Service tag bar */}
      <div className="text-white w-full md:text-xs text-[6px] flex justify-between md:px-10 px-2 absolute md:top-1/3 top-2/5 uppercase tracking-wider -translate-y-1/2 border-2 border-white/10 z-10">
        <div>Service Agency</div>
        <div>// Smoothness</div>
      </div>

      {/* Blur orb — scaled for mobile */}
      <div className="absolute md:-top-[130px] top-20 md:h-[100vw] h-[60vh] w-[60vh] md:w-screen rounded-full bg-white bg-backdrop blur-3xl inset-0 pointer-events-none"></div>

      {/* Hero image — always pinned to bottom, full height on all breakpoints */}
      <div className="absolute
        md:h-screen h-[75vh]
        md:left-1/2 left-1/2
        md:-translate-x-1/2 -translate-x-1/2
        bottom-0
        w-auto
        flex items-end justify-center z-10
      ">
        <img
          src="image2.png"
          alt=""
          className="object-contain object-bottom h-full w-auto -scale-x-100 max-w-none"
        />
      </div>

      {/* Headline text — left-aligned, responsive sizing */}
      <div className="md:w-full w-screen h-full flex md:items-end items-start z-20 relative md:px-0 px-4 md:mt-0 mt-5">
        <h1 className="
          md:text-[10.5vw] text-[13vw]
          text-black/80
          bg-clip-text mix-blend-difference
          text-left md:leading-none leading-tight
          overflow-hidden uppercase
        ">
          <span className="block overflow-hidden">
            <span className="block line">
              Social <span className="text-blue-600">Media</span>
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="block line">
              Content <span className="text-blue-600">Agency</span>
            </span>
          </span>
        </h1>
      </div>
    </div>
  );
}
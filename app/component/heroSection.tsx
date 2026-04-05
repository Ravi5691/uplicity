"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const boxesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray(".line");
      const subtitle = ".subtitle-line";

      gsap.set(boxesRef.current, {
        opacity: 0,
        rotateX: 15,
        y: 40,
        transformOrigin: "center center",
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.8,
      });

      tl.from(lines, {
        yPercent: 120,
        opacity: 0,
        duration: 1.8,
        stagger: 0.15,
      })
        .from(
          subtitle,
          {
            yPercent: 120,
            opacity: 0,
            duration: 1,
          },
          "-=0.6"
        )
        .to(
          boxesRef.current,
          {
            opacity: 1,
            rotateX: 0,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "+=0.2" // waits until text animation fully ends
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className={` font-extralight relative pointer-events-none text-white flex flex-col gap-5 justify-center items-center h-screen w-screen dark:bg-black bg-white p-10 pb-0`}
    >
      <div className="absolute z-10 top-16 right-10 h-[45%] w-[20%] bg-white/20 flex shadow-inner shadow-black sahdow-lg">
        <img src="image.png" alt="" className=" object-center object-cover h-full w-full" />
      </div>
      <div className="absolute top-14 left-0 h-[1px] w-[80%] bg-gradient-to-l dark:from-black dark:to-white/50 from-white to-black/50"></div>
      <div className="absolute top-0 left-7 h-[60%] w-[1px] bg-gradient-to-t dark:from-black dark:to-white/50 from-white to-black/50"></div>
      <div className="absolute top-16 left-9 max-w-md text-black/50 dark:text-white/50 text-xs">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nesciunt at ad cupiditate corporis rem sapiente saepe? Doloribus ducimus distinctio velit est impedit voluptate ut, corrupti placeat dignissimos quod. Enim?
      </div>
      <div className="absolute -top-100 -right-50 h-[80%] w-[90%] rotate-45 rounded-4xl bg-black/3 dark:bg-white/2"></div>
      <div className="absolute -top-120 -right-40 h-[80%] w-[90%] rotate-55 rounded-4xl bg-black/4 dark:bg-white/3"></div>
      <div className="absolute -top-160 -right-10 h-[80%] w-[90%] rotate-70 rounded-4xl bg-black/3 dark:bg-white/2"></div>
      <div className="w-full h-full flex items-end z-10 relative">
        <h1 className="md:text-[10.5vw] text-[52px] dark:text-white text-black text-left md:leading-none leading-13 overflow-hidden uppercase">
          <span className="block line">
            Social <span className="text-red-500">Media</span>
          </span>
          <span className="block line">Content Agency</span>
        </h1>
      </div>

    </div>
  );
}

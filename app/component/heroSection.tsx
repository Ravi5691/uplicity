// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { Anton, Noto_Sans_Devanagari , } from "next/font/google";
// import { Khand } from "next/font/google";
// import HeroLoopBoxes from "./heroUI";

// const anton = Anton({ subsets: ["latin"], weight: ["400"] });
// const hindiFont = Noto_Sans_Devanagari({
//   subsets: ["devanagari"],
//   weight: ["700"],
// });
// const khand = Khand({ subsets: ["devanagari"], weight: ["400", "700"] });

// export default function HeroSection() {
//   const subtitleRef = useRef<HTMLHeadingElement>(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const lines = gsap.utils.toArray(".line");

//       // -------------------------
//       // MAIN HERO TEXT REVEAL
//       // -------------------------
//       const tl = gsap.timeline({
//         defaults: { ease: "power2.out" },
//         delay: 0.8,
//       });

//       tl.from(lines, {
//         yPercent: 120,
//         opacity: 0,
//         duration: 1.5,
//         stagger: 0.15,
//       }).from(
//         subtitleRef.current,
//         {
//           opacity: 0,
//           y: 30,
//           duration: 1,
//         },
//         "-=0.4"
//       );

//       // -------------------------
//       // MEDIA ⇄ मीडिया INITIAL STATE
//       // -------------------------
//       gsap.set(".media-en", { y: "0%" });
//       gsap.set(".media-hi", { y: "100%" });

//       // -------------------------
//       // MEDIA ⇄ मीडिया SCROLL LOOP
//       // -------------------------
//       const mediaTl = gsap.timeline({
//         repeat: -1,
//         delay: 2,
//       });

//       mediaTl
//         // English out, Hindi in
//         .to(".media-en", {
//           y: "-100%",
//           duration: 0.6,
//           ease: "power2.inOut",
//         })
//         .to(
//           ".media-hi",
//           {
//             y: "0%",
//             duration: 0.6,
//             ease: "power2.inOut",
//           },
//           "<"
//         )

//         // Pause on Hindi
//         .to({}, { duration: 2 })

//         // Hindi out, English in
//         .to(".media-hi", {
//           y: "-100%",
//           duration: 0.6,
//           ease: "power2.inOut",
//         })
//         .set(".media-en", { y: "100%" })
//         .to(
//           ".media-en",
//           {
//             y: "0%",
//             duration: 0.6,
//             ease: "power2.inOut",
//           },
//           "<"
//         )

//         // Pause on English
//         .to({}, { duration: 2 });
//     });

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div
//       id="hero"
//       data-nav="dark"
//       className={`${anton.className} relative pointer-events-none text-white flex flex-col justify-center items-center min-h-screen w-screen bg-noise pb-10`}
//     >
//       <div className="absolute md:top-55 top-50 flex flex-col justify-center items-center">
//         {/* TITLE */}
//         <h1 className="md:text-8xl text-[52px] text-center md:leading-none leading-13 overflow-hidden">
//           <span className="line flex justify-center items-center gap-4">
//             <span>Social</span>

//             {/* SCROLL SLOT */}
//             <span className="relative inline-flex items-center justify-center overflow-hidden h-[1em]">
//               {/* WIDTH SIZER (invisible) */}
//               <span className="opacity-0 pointer-events-none select-none">
//                 Media
//               </span>

//               {/* ENGLISH */}
//               <span
//                 className="absolute inset-0 flex items-center justify-center media-en text-red-500 leading-none will-change-transform"
//                 aria-hidden="false"
//               >
//                 Media
//               </span>

//               {/* HINDI */}
//               <span
//                 className={`absolute top-6 inset-0 flex items-center justify-center media-hi text-red-500 leading-none will-change-transform ${khand.className} font-bold`}
//                 aria-hidden="true"
//               >
//                 मीडिया
//               </span>
//             </span>

//           </span>

//           <span className="block line">Content Agency</span>
//         </h1>

//         {/* SUBTITLE */}
//         <h2
//           ref={subtitleRef}
//           className="md:text-xl md:w-auto w-[95%] text-sm text-center mt-2 tracking-wide overflow-hidden"
//         >
//           <span className="block">
//             We create engaging content and sites for your social media platforms.
//           </span>
//         </h2>
//       </div>

//       <div className="md:mt-85 mt-50 w-full hide-scrollbar">
//         <HeroLoopBoxes />
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Lora, Anton, Bebas_Neue } from "next/font/google";
import HeroLoopBoxes from "./heroUI";

const lora = Lora({ subsets: ["latin"], weight: ["400", "700"] });
const anton = Anton({ subsets: ["latin"], weight: ["400"] });
const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

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
      id="hero"
      data-nav="dark"
      className={`${anton.className} relative pointer-events-none text-white flex flex-col gap-5 justify-center items-center min-h-screen w-screen bg-noise pb-10`}
    >
      <div className="absolute md:top-55 top-50 flex flex-col justify-center items-center">
        <h1 className="md:text-8xl text-[52px] text-center md:leading-none leading-13 overflow-hidden">
          <span className="block line">
            Social <span className="text-red-500">Media</span>
          </span>
          <span className="block line">Content Agency</span>
        </h1>

        <h2 className="md:text-xl md:w-auto w-[95%] text-sm text-center mt-2 tracking-wide overflow-hidden">
          <span className="block subtitle-line">
            We create engaging content and sites for your social media platforms.
          </span>
        </h2>
      </div>

      <div
        ref={boxesRef}
        className="md:mt-75 mt-50 w-full hide-scrollbar will-change-transform"
      >
        <HeroLoopBoxes />
      </div>
    </div>
  );
}

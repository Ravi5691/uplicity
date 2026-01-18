"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["200" ,"400", "700"] });
gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    logo: "IG",
    title: "Instagram Reels",
    description: "Scroll-stopping reels edited for max engagement.",
    bgClass: "bg-[#F5BF45]",
    angle: -6,
  },
  {
    id: 2,
    logo: "YT",
    title: "YouTube Edits",
    description: "Clean cuts, pacing & story to keep viewers watching.",
    bgClass: "bg-[#4B3BFF]",
    angle: 6,
  },
  {
    id: 3,
    logo: "AD",
    title: "Ad Creatives",
    description: "High-converting visuals for paid campaigns.",
    bgClass: "bg-[#00C9A7]",
    angle: -4,
  },
  {
    id: 4,
    logo: "BR",
    title: "Brand Films",
    description: "Premium storytelling for brands.",
    bgClass: "bg-[#7C3AED]",
    angle: 8,
  },
];

export default function ServiceStack() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const leftEaseIn = useRef<HTMLDivElement | null>(null);
  const rightEaseIn = useRef<HTMLDivElement | null>(null);

  // LEFT HEADING ANIMATION
  useLayoutEffect(() => {
    if (!leftEaseIn.current) return;

    gsap.from(leftEaseIn.current, {
      x: -500,
      opacity: 0,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: leftEaseIn.current,
        start: "top 80%",
        toggleActions: "play none none none",
        once: true,
      },
    });
  }, []);

  // RIGHT HEADING ANIMATION
  useLayoutEffect(() => {
    if (!rightEaseIn.current) return;

    gsap.from(rightEaseIn.current, {
      x: 600,
      opacity: 0,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: rightEaseIn.current,
        start: "top 80%",
        toggleActions: "play none none none",
        once: true,
      },
    });
  }, []);


  // CARD STACK ANIMATION (DESKTOP ONLY)
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          const cards = gsap.utils.toArray<HTMLDivElement>(".service-card");

          gsap.fromTo(
            cards,
            { x: 0, y: (i) => i },
            {
              x: (i) => (i - (cards.length - 1) / 2) * 350,
              y: (i) => i,
              stagger: 0.06,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: () => `+=${Math.max(900, cards.length * 260)}`,
                scrub: true,
                pin: true,
                pinSpacing: true,
              },
            }
          );
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // CARD ANIMATION (MOBILE ONLY)
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(max-width: 767px)": () => {
          const cards = gsap.utils.toArray<HTMLDivElement>(".service-card");

          cards.forEach((card, index) => {
            gsap.from(card, {
              x: index % 2 === 0 ? -120 : 120, // left-right pattern
              opacity: 0,
              duration: 1.5,
              delay: 0.75,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
                once: true,
              },
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-screen flex items-center justify-center bg-noise text-white overflow-hidden"
    >
      {/* HEADINGS */}
      <div className={` ${inter.className} absolute md:top-10 top-0 text-center px-4 md:px-0 z-20`}>
        <div
          ref={leftEaseIn}
          className="text-5xl sm:text-5xl md:text-8xl font-light"
        >
          Services Built{" "}
          <span className="text-red-500 italic">to</span> Amplify
        </div>

        <div
          ref={rightEaseIn}
          className="text-5xl sm:text-5xl md:text-8xl font-light"
        >
          <span className="text-red-500 italic">your</span> Identity
        </div>
      </div>

      {/* VERTICAL LINES (DESKTOP ONLY) */}
      <div className="absolute inset-0 hidden md:flex mt-25 justify-around items-center">
        <div className="vertical-noise-line h-[550px]" />
        <div className="vertical-noise-line h-[550px]" />
        <div className="vertical-noise-line h-[550px]" />
        <div className="vertical-noise-line h-[550px]" />
      </div>

      <div className="absolute inset-0 md:hidden flex mt-25 justify-center gap-20 items-center">
        <div className="vertical-noise-line h-[850px]" />
        <div className="vertical-noise-line h-[850px]" />
      </div>



      {/* CARD STACK */}
      <div className="relative z-10 w-full flex justify-center md:h-[300px] items-end pb-10 mt-40 md:mt-0">
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`
                service-card
                ${service.bgClass}
                w-[90%] h-[230px]
                md:w-[300px] md:h-[320px]
                md:p-6 p-4
                relative md:absolute
              `}
              style={{
                transformOrigin: "center center",
                rotate: `${service.angle}deg`,
                zIndex: services.length - index,
              }}
            >
              {/* LOGO */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-black/20 flex items-center justify-center text-sm font-semibold uppercase">
                  {service.logo}
                </div>
                <span className="opacity-70 uppercase tracking-widest md:text-xs text-[10px]">
                  Service
                </span>
              </div>

              {/* CONTENT */}
              <div className="mt-10 space-y-3">
                <h3 className="text-xl md:text-2xl font-semibold">
                  {service.title}
                </h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* FOOTER */}
              <div className="md:mt-8 mt-4 text-xs opacity-80">
                Scroll to expand →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

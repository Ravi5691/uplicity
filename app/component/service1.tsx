"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_PROJECTS = [
  {
    num: "01",
    title: "Brand Manifesto",
    client: "Nike Studio",
    category: "Commercial",
    duration: "2:30",
    year: "2024",
    thumb: "/videoService/1.png",
    tags: ["Color Grading", "Motion Graphics"],
    desc: "A cinematic deep-dive into the brand's ethos — raw energy, fearless movement, and the relentless pursuit of greatness.",
  },
  {
    num: "02",
    title: "Product Launch",
    client: "Apple Inc.",
    category: "Corporate",
    duration: "1:45",
    year: "2024",
    thumb: "/videoService/4.png",
    tags: ["VFX", "3D Integration"],
    desc: "Precision meets poetry. A product reveal that strips everything back to reveal the beauty in the detail.",
  },
  {
    num: "03",
    title: "Short Film",
    client: "Indie Director",
    category: "Narrative",
    duration: "12:00",
    year: "2023",
    thumb: "/videoService/2.png",
    tags: ["Colour", "Sound Design"],
    desc: "A slow-burn narrative between memory and imagination — every frame hand-graded to breathe with the story.",
  },
  {
    num: "04",
    title: "Event Recap",
    client: "TED Talks",
    category: "Documentary",
    duration: "5:20",
    year: "2024",
    thumb: "/videoService/3.png",
    tags: ["Multi-cam", "Graphics"],
    desc: "Capturing the electricity of ideas in a room — multi-camera precision edited into a seamless, kinetic recap.",
  },
  {
    num: "05",
    title: "Music Video",
    client: "Warner Music",
    category: "Entertainment",
    duration: "3:15",
    year: "2023",
    thumb: "/videoService/4.png",
    tags: ["VFX", "Color"],
    desc: "Visual storytelling that moves with the beat — chromatic explosions, frame-perfect cuts, and a world built from light.",
  },
  {
    num: "06",
    title: "Social Reels",
    client: "Meta",
    category: "Social Media",
    duration: "0:30",
    year: "2024",
    thumb: "/videoService/1.png",
    tags: ["Fast Cut", "Motion"],
    desc: "Six seconds to stop the scroll. Each reel engineered for impact — hooks, rhythm, and a single unforgettable moment.",
  },
];

export default function Service1() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineInnerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Title line-reveal ──────────────────────────────────────────
      const titleLines = headingRef.current?.querySelectorAll<HTMLElement>(".title-line");
      if (titleLines) {
        gsap.fromTo(
          titleLines,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      // Badge + subtitle
      gsap.fromTo(
        headingRef.current?.querySelectorAll<HTMLElement>(".fade-up") ?? [],
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.25,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );

      // ── Vertical progress line grow ────────────────────────────────
      if (lineInnerRef.current && lineRef.current) {
        gsap.fromTo(
          lineInnerRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 1,
            },
          }
        );
      }

      // ── Per-project card animations ────────────────────────────────
      itemRefs.current.forEach((item, i) => {
        if (!item) return;
        const isEven = i % 2 === 0; // even = video left, odd = video right

        const imgWrap = item.querySelector<HTMLElement>(".proj-img");
        const infoWrap = item.querySelector<HTMLElement>(".proj-info");
        const dot = item.querySelector<HTMLElement>(".proj-dot");
        const numLabel = item.querySelector<HTMLElement>(".proj-num");

        // dot pulse in
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: item,
                start: "top 65%",
                once: true,
              },
            }
          );
        }

        // number label
        if (numLabel) {
          gsap.fromTo(
            numLabel,
            { opacity: 0, y: 10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 65%",
                once: true,
              },
            }
          );
        }

        // image slides in from the correct side
        if (imgWrap) {
          gsap.fromTo(
            imgWrap,
            { x: isEven ? -80 : 80, opacity: 0, scale: 0.96 },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 1.05,
              ease: "expo.out",
              scrollTrigger: {
                trigger: item,
                start: "top 68%",
                once: true,
              },
            }
          );
        }

        // info slides in opposite side, slightly delayed
        if (infoWrap) {
          gsap.fromTo(
            infoWrap,
            { x: isEven ? 60 : -60, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: "expo.out",
              delay: 0.18,
              scrollTrigger: {
                trigger: item,
                start: "top 68%",
                once: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      id="project"
      className="flex flex-col w-screen bg-[#acd3ff] text-black relative z-10 overflow-x-hidden"
    >

      {/* ── Hero Heading ─────────────────────────────────────────────── */}
      <div
        ref={headingRef}
        className="relative z-10 flex flex-col items-center w-full px-4 pt-16 pb-10 sm:pt-24 sm:pb-14 text-center"
      >
        <div className="fade-up inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 text-blue-900 text-[11px] uppercase tracking-[.15em] px-4 py-1.5 rounded-full mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          Service 01 — Video Editing
        </div>

        {/* Line-reveal heading — each word wrapped in clip container */}
        <div className="overflow-hidden mb-1">
          <span className="title-line block font-light uppercase text-[clamp(2.8rem,7vw,11rem)] leading-[.92] tracking-tighter text-black/80">
            Video
          </span>
        </div>
        <div className="overflow-hidden mb-1">
          <span className="title-line block font-light uppercase text-[clamp(2.8rem,7vw,11rem)] leading-[.92] tracking-tighter text-black/80">
            <em className="not-italic text-blue-600">Editing</em> &amp;
          </span>
        </div>
        <div className="overflow-hidden">
          <span className="title-line block font-light uppercase text-[clamp(2.8rem,7vw,11rem)] leading-[.92] tracking-tighter text-black/80">
            Production
          </span>
        </div>

        <p className="fade-up mt-6 text-[11px] sm:text-sm text-black/40 max-w-sm mx-auto leading-relaxed">
          Frame-perfect cuts, cinematic colour, motion graphics that keep eyes glued to the screen.
        </p>
      </div>

      <div className="absolute md:-left-30 -left-10 top-10 md:h-[90%] h-[95%] md:w-50 w-25 rounded-full bg-white bg-backdrop blur-3xl  pointer-events-none"></div>

      <div className="absolute md:-right-30 -right-10 top-10 md:h-[90%] h-[95%] md:w-50 w-25 rounded-full bg-white bg-backdrop blur-3xl  pointer-events-none"></div>


      {/* ── Timeline Section ─────────────────────────────────────────── */}
      <div ref={lineRef} className="relative w-full max-w-6xl mx-auto px-4 sm:px-8 md:pb-32 pb-0">

        {/* Vertical centre line */}
        <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-black/10 hidden md:block">
          <div
            ref={lineInnerRef}
            className="w-full h-full bg-blue-500/60 origin-top"
            style={{ transform: "scaleY(0)" }}
          />
        </div>

        {/* Projects */}
        {VIDEO_PROJECTS.map((p, i) => {
          const isEven = i % 2 === 0;
          return (
            <div
              key={p.num}
              ref={(el) => { if (el) itemRefs.current[i] = el; }}
              className="relative grid grid-cols-1 md:grid-cols-[1fr_56px_1fr] items-center gap-0 mb-20 sm:mb-28"
            >

              {/* ── Image column (left on even, right on odd) ────────── */}
              <div className={`${isEven ? "md:col-start-1" : "md:col-start-3"} row-start-1`}>
                <div
                  className="proj-img relative rounded-2xl overflow-hidden"
                  style={{
                    boxShadow: isEven
                      ? "16px 20px 60px -8px rgba(59,130,246,0.35), 4px 4px 24px rgba(255,255,255,0.5)"
                      : "-16px 20px 60px -8px rgba(59,130,246,0.35), -4px 4px 24px rgba(255,255,255,0.5)",
                  }}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={p.thumb}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                    {/* scanline overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.025) 2px,rgba(0,0,0,0.025) 4px)",
                      }}
                    />
                    {/* gradient vignette */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 55%)",
                      }}
                    />
                    {/* play btn */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full border border-white/50 bg-white/15 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 cursor-pointer">
                        <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 ml-0.5" opacity={0.9}>
                          <polygon points="5,3 19,12 5,21" />
                        </svg>
                      </div>
                    </div>
                    {/* meta badges */}
                    <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest px-2 py-1 bg-black/50 backdrop-blur-sm text-white/80 border border-white/15 rounded">
                      {p.duration}
                    </span>
                    <span className="absolute top-3 right-3 text-[9px] uppercase tracking-widest px-2 py-1 bg-blue-500/70 backdrop-blur-sm text-white border border-white/20 rounded">
                      {p.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Centre checkpoint ────────────────────────────────── */}
              <div className="hidden md:flex flex-col items-center justify-center relative z-10 row-start-1 md:col-start-2">
                <div
                  className="proj-dot w-4 h-4 rounded-full bg-blue-500 border-4 border-[#acd3ff] shadow-[0_0_0_2px_rgba(59,130,246,0.5)]"
                  style={{ transform: "scale(0)" }}
                />
                <div
                  className="proj-num absolute -bottom-7 text-[10px] uppercase tracking-[.2em] text-black/35 font-medium"
                  style={{ opacity: 0 }}
                >
                  {p.num}
                </div>
              </div>

              {/* ── Info column (right on even, left on odd) ─────────── */}
              <div
                className={`${isEven ? "md:col-start-3" : "md:col-start-1"} row-start-2 md:row-start-1 mt-5 md:mt-0`}
              >
                <div
                  className="proj-info flex flex-col justify-center px-0 md:px-6"
                  style={{ ...(isEven ? {} : { textAlign: "right" }) }}
                >
                  {/* year */}
                  <span className="text-[10px] uppercase tracking-[.3em] text-black/30 mb-3">
                    {p.year}
                  </span>

                  {/* title */}
                  <h3 className="font-light text-[clamp(1.8rem,3.5vw,3rem)] leading-[1] tracking-tighter text-black/85 mb-1">
                    {p.title}
                  </h3>

                  {/* client */}
                  <p className="text-[11px] uppercase tracking-[.25em] text-blue-600/70 mb-4">
                    {p.client}
                  </p>

                  {/* description */}
                  <p className="text-sm text-black/50 leading-relaxed max-w-[300px] mb-5"
                    style={{ ...(isEven ? {} : { marginLeft: "auto" }) }}
                  >
                    {p.desc}
                  </p>

                  {/* tags */}
                  <div
                    className={`flex flex-wrap gap-2 mb-6 ${isEven ? "" : "justify-end"}`}
                  >
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] uppercase tracking-[.2em] px-2.5 py-1 border border-blue-500/30 text-blue-700 bg-blue-500/8 rounded-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className={isEven ? "" : "flex justify-end"}>
                    <button className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[.25em] group text-black">
                      <span className="border-b border-black/25 group-hover:border-blue-500 group-hover:text-blue-600 transition-colors duration-200">
                        View Project
                      </span>
                      <svg
                        viewBox="0 0 24 24"
                        className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* End cap */}
        <div className="hidden md:flex flex-col items-center relative z-10">
          <div className="w-3 h-3 rounded-full bg-blue-400/60 border-4 border-[#acd3ff]" />
          <p className="mt-4 text-[10px] uppercase tracking-[.3em] text-black/25">End of reel</p>
        </div>
      </div>
    </div>
  );
}
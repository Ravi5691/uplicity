"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Anton } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const anton = Anton({ subsets: ["latin"], weight: ["400"] });

gsap.registerPlugin(ScrollTrigger);

// ─── data ─────────────────────────────────────────────────────────────────────
const VIDEO_PROJECTS = [
  {
    num: "01",
    title: "Brand Manifesto",
    client: "Nike Studio",
    category: "Commercial",
    duration: "2:30",
    year: "2024",
    thumb: "/webService/3.webp",
    tags: ["Color Grading", "Motion Graphics"],
  },
  {
    num: "02",
    title: "Product Launch",
    client: "Apple Inc.",
    category: "Corporate",
    duration: "1:45",
    year: "2024",
    thumb: "/webService/3.webp",
    tags: ["VFX", "3D Integration"],
  },
  {
    num: "03",
    title: "Short Film",
    client: "Indie Director",
    category: "Narrative",
    duration: "12:00",
    year: "2023",
    thumb: "/webService/3.webp",
    tags: ["Colour", "Sound Design"],
  },
  {
    num: "04",
    title: "Event Recap",
    client: "TED Talks",
    category: "Documentary",
    duration: "5:20",
    year: "2024",
    thumb: "/webService/3.webp",
    tags: ["Multi-cam", "Graphics"],
  },
  {
    num: "05",
    title: "Music Video",
    client: "Warner Music",
    category: "Entertainment",
    duration: "3:15",
    year: "2023",
    thumb: "/webService/3.webp",
    tags: ["VFX", "Color"],
  },
  {
    num: "06",
    title: "Social Reels",
    client: "Meta",
    category: "Social Media",
    duration: "0:30",
    year: "2024",
    thumb: "/webService/3.webp",
    tags: ["Fast Cut", "Motion"],
  },
];

const TICKER_ITEMS = [
  "COLOR GRADING",
  "MOTION GRAPHICS",
  "VFX",
  "SOUND DESIGN",
  "3D INTEGRATION",
  "MULTI-CAM EDIT",
  "REEL CUTS",
  "NARRATIVE EDIT",
];

const STATS = [
  { label: "Projects", value: 120 },
  { label: "Clients", value: 48 },
  { label: "Awards", value: 9 },
  { label: "Years", value: 6 },
];

// ─── inner carousel ───────────────────────────────────────────────────────────
function VideoCarousel() {
  const [cur, setCur] = useState(0);
  const [animating, setAnimating] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const total = VIDEO_PROJECTS.length;

  const go = useCallback(
    (next: number) => {
      if (animating) return;
      const n = ((next % total) + total) % total;
      setAnimating(true);
      gsap.to(trackRef.current, {
        x: `-${n * 100}%`,
        duration: 0.72,
        ease: "expo.inOut",
        onComplete: () => {
          setCur(n);
          setAnimating(false);
        },
      });
    },
    [animating, total]
  );

  const startAuto = useCallback(() => {
    autoRef.current = setInterval(() => {
      setCur((c) => {
        const next = (c + 1) % total;
        gsap.to(trackRef.current, {
          x: `-${next * 100}%`,
          duration: 0.72,
          ease: "expo.inOut",
        });
        return next;
      });
    }, 4500);
  }, [total]);

  const stopAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
  }, []);

  useEffect(() => {
    startAuto();
    return () => stopAuto();
  }, [startAuto, stopAuto]);

  // subtle zoom on active image
  useEffect(() => {
    const imgs = trackRef.current?.querySelectorAll<HTMLElement>(".v-thumb");
    imgs?.forEach((img, i) => {
      gsap.to(img, {
        scale: i === cur ? 1.05 : 1,
        duration: 0.9,
        ease: "power2.out",
      });
    });
  }, [cur]);

  return (
    <section
      className="w-full"
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
    >
      {/* ── slide track ─────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden w-full flex justify-center border-t border-b border-black/10 dark:border-white/10"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? cur + 1 : cur - 1);
        }}
      >
        <div
          ref={trackRef}
          className="flex will-change-transform w-full"
          style={{ transform: "translateX(0%)" }}
        >
          {VIDEO_PROJECTS.map((p) => (
            <div
              key={p.num}
              className="flex-none w-full grid grid-cols-1 sm:grid-cols-2 min-h-[300px] sm:min-h-[460px]"
            >
              {/* image */}
              <div className="relative overflow-hidden bg-black/5 dark:bg-white/5 h-[220px] sm:h-auto order-2 sm:order-1">
                <img
                  src={p.thumb}
                  alt={p.title}
                  className="v-thumb w-full h-full object-cover"
                  loading="lazy"
                />
                {/* scanline */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px)",
                  }}
                />
                {/* gradient fade */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 55%)",
                  }}
                />
                {/* play */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="white"
                      className="w-5 h-5 ml-0.5"
                      opacity={0.9}
                    >
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
                </div>
                {/* duration */}
                <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest px-2 py-1 bg-black/50 backdrop-blur-sm text-white/80 border border-white/15">
                  {p.duration}
                </span>
                {/* category */}
                <span className="absolute top-3 right-3 text-[9px] uppercase tracking-widest px-2 py-1 bg-black/40 backdrop-blur-sm text-white/70 border border-white/20">
                  {p.category}
                </span>
              </div>

              {/* info */}
              <div className="flex flex-col justify-between px-6 py-8 sm:px-10 sm:py-12 order-1 sm:order-2 border-b sm:border-b-0 sm:border-l border-black/10 dark:border-white/10">
                <div>
                  <div className="flex items-center gap-3 mb-6 sm:mb-10">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-black/40 dark:text-white/40">
                      {p.num}
                    </span>
                    <span className="flex-1 h-px bg-black/10 dark:bg-white/10" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-black/30 dark:text-white/30">
                      {p.year}
                    </span>
                  </div>

                  <h3 className="font-light text-3xl sm:text-4xl md:text-[3.2rem] leading-none mb-3 sm:mb-4 text-black dark:text-white">
                    {p.title}
                  </h3>

                  <p className="text-[11px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mb-6 sm:mb-8">
                    {p.client}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 border border-black/15 dark:border-white/15 text-black/50 dark:text-white/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="mt-8 self-start flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] group text-black dark:text-white">
                  <span className="border-b border-black/30 dark:border-white/30 group-hover:border-black dark:group-hover:border-white transition-colors duration-200">
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
          ))}
        </div>
      </div>

      {/* progress bar */}
      <div className="w-full h-px bg-black/8 dark:bg-white/8 overflow-hidden">
        <div
          className="h-full bg-black dark:bg-white transition-all duration-700 ease-[cubic-bezier(0.77,0,0.18,1)]"
          style={{ width: `${((cur + 1) / total) * 100}%` }}
        />
      </div>

      {/* controls */}
      <div className="flex items-center justify-between px-4 sm:px-8 md:px-12 py-4">
        {/* dots */}
        <div className="flex items-center gap-2">
          {VIDEO_PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="h-px bg-black dark:bg-white transition-all duration-300"
              style={{ width: i === cur ? 32 : 16, opacity: i === cur ? 1 : 0.2 }}
            />
          ))}
        </div>

        {/* counter */}
        <span className="text-[10px] uppercase tracking-[0.25em] text-black/35 dark:text-white/35">
          {String(cur + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>

        {/* arrows */}
        <div className="flex gap-2">
          {(["left", "right"] as const).map((dir) => (
            <button
              key={dir}
              onClick={() => go(dir === "left" ? cur - 1 : cur + 1)}
              aria-label={dir === "left" ? "Previous" : "Next"}
              className="w-9 h-9 border border-black/15 dark:border-white/15 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                {dir === "left" ? (
                  <polyline points="15 18 9 12 15 6" />
                ) : (
                  <polyline points="9 18 15 12 9 6" />
                )}
              </svg>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── main export ──────────────────────────────────────────────────────────────
export default function Service1() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const tickerInnerRef = useRef<HTMLDivElement>(null);

  // stats counter on scroll
  useEffect(() => {
    if (!statsRef.current) return;
    const nums = statsRef.current.querySelectorAll<HTMLElement>(".stat-num");
    nums.forEach((el) => {
      const target = parseInt(el.getAttribute("data-target") || "0", 10);
      gsap.fromTo(
        { val: 0 },
        { val: target },
        {
          duration: 2,
          ease: "power2.out",
          onUpdate: function () {
            el.textContent = Math.round(this.targets()[0].val).toString();
          },
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    });
  }, []);

  // infinite ticker
  useEffect(() => {
    if (!tickerInnerRef.current) return;
    gsap.to(tickerInnerRef.current, {
      xPercent: -50,
      duration: 20,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <div
      ref={sectionRef}
      id="project"
      className="flex flex-col w-screen transition-all duration-700 ease-out bg-white dark:bg-black text-black dark:text-white relative z-10 overflow-x-hidden"
    >

      <div className="absolute top-50 -right-60 h-[50%] w-[25%] rotate-45 rounded-4xl bg-black/3 dark:bg-white/3"></div>
      <div className="absolute top-40 -left-80 h-[50%] w-[40%] rotate-55 rounded-4xl bg-black/4 dark:bg-white/3"></div>
      {/* <div className="absolute top-80 -left-80 h-[30%] w-[40%] rotate-70 rounded-4xl bg-black/4 dark:bg-white/2"></div> */}

      {/* ── HERO — DO NOT TOUCH ──────────────────────────────────────────────── */}
      <div className="relative flex flex-col items-center w-full overflow-hidden p-10">
        <div className="relative z-10 px-4 py-10 text-center dark:text-white/80 text-black/80">
          <h1 className="font-light uppercase text-center z-10 text-[clamp(5rem,8vw,13rem)] w-full">
            1. Video Editing
          </h1>
          <h2 className="absolute top-10 font-light text-[8px] max-w-xs text-left dark:text-[#ffffff42] text-[#00000042]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero nam
            consequuntur eaque officia velit incidunt esse molestiae deleniti
          </h2>
          <h2 className="absolute bottom-5 right-5 font-light text-[8px] max-w-xs text-left dark:text-[#ffffff42] text-[#00000042]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero nam
            consequuntur eaque officia velit incidunt esse molestiae deleniti
            similique, eum asperiores autem? Dolorum, porro expedita tenetur vel
            quam pariatur voluptate?
          </h2>
        </div>
      </div>

      {/* ── MAIN CONTENT CONTAINER (80vw) ─────────────────────────────────── */}
      <div className="flex flex-col w-[80vw] mx-auto gap-0">
        {/* ── TICKER ──────────────────────────────────────────────────────────── */}
        {/* <div className="w-full overflow-hidden border-t border-b border-black/10 dark:border-white/10 py-3 mb-10">
          <div
            ref={tickerInnerRef}
            className="flex whitespace-nowrap will-change-transform"
          >
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span
                key={i}
                className="mx-8 text-[11px] uppercase tracking-[0.3em] dark:text-white/30 text-black/30 font-light"
              >
                {item}
                <span className="mx-8 dark:text-white/15 text-black/15">·</span>
              </span>
            ))}
          </div>
        </div> */}

        {/* ── STATS BAR ───────────────────────────────────────────────────────── */}
        {/* <div
          ref={statsRef}
          className="w-full grid grid-cols-2 sm:grid-cols-4 border-t border-b border-black/10 dark:border-white/10 mb-12"
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col items-center py-6 px-4 ${
                i < STATS.length - 1
                  ? "border-r border-black/10 dark:border-white/10"
                  : ""
              }`}
            >
              <span
                className="stat-num text-4xl sm:text-5xl font-extralight tabular-nums dark:text-white text-black"
                data-target={s.value}
              >
                0
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] dark:text-white/40 text-black/40 mt-1">
                {s.label}
              </span>
            </div>
          ))}
        </div> */}

        {/* ── VIDEO CAROUSEL ──────────────────────────────────────────────────── */}
        <VideoCarousel />

        {/* ── BOTTOM CTA ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-12 py-10 gap-6 sm:gap-0 border-t border-black/10 dark:border-white/10">
          <p className="text-[11px] uppercase tracking-[0.3em] dark:text-white/30 text-black/30">
            All Projects →
          </p>
          <button className="group flex items-center gap-3 px-6 py-3 border border-black/20 dark:border-white/20 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 text-sm uppercase tracking-widest">
            View Full Reel
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
  );
}

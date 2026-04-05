"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Anton } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const anton = Anton({ subsets: ["latin"], weight: ["400"] });

gsap.registerPlugin(ScrollTrigger);

// ─── data ─────────────────────────────────────────────────────────────────────
const GRAPHIC_PROJECTS = [
  { id: 1, img: "/graphicService/1.jpg", title: "Brand Identity", client: "Zara Studio", tags: ["Branding", "Logo"] },
  { id: 2, img: "/graphicService/2.jpg", title: "Editorial Layout", client: "Vogue India", tags: ["Print", "Typography"] },
  { id: 3, img: "/graphicService/3.jpg", title: "Packaging Design", client: "Nykaa", tags: ["Packaging", "Illustration"] },
  { id: 4, img: "/graphicService/4.jpg", title: "Campaign Poster", client: "Red Bull", tags: ["Poster", "Digital"] },
  { id: 5, img: "/graphicService/5.jpg", title: "Social Kit", client: "Startupland", tags: ["Social Media", "UI"] },
  { id: 6, img: "/graphicService/6.jpg", title: "Motion Identity", client: "Netflix India", tags: ["Motion", "Brand"] },
  { id: 7, img: "/graphicService/7.jpg", title: "Annual Report", client: "TATA Group", tags: ["Print", "Layout"] },
  { id: 8, img: "/graphicService/8.jpg", title: "Icon System", client: "Swiggy", tags: ["Icons", "UI"] },
  { id: 9, img: "/graphicService/9.jpg", title: "Visual Identity", client: "Ola Electric", tags: ["Branding", "Web"] },
  { id: 10, img: "/graphicService/10.jpg", title: "Type Specimen", client: "Self", tags: ["Typography", "Art"] },
  { id: 11, img: "/graphicService/11.jpg", title: "Mural Concept", client: "Urban Arts", tags: ["Illustration", "Large Format"] },
];

const MARQUEE_ITEMS = [
  "BRAND IDENTITY", "EDITORIAL", "PACKAGING", "POSTER ART",
  "TYPOGRAPHY", "ICON SYSTEM", "SOCIAL KITS", "ILLUSTRATION",
];

// ─── simple image carousel ───────────────────────────────────────────────────
function ImageCarousel() {
  const [cur, setCur] = useState(0);
  const [animating, setAnimating] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const total = GRAPHIC_PROJECTS.length;

  const go = useCallback(
    (next: number) => {
      if (animating) return;
      const n = ((next % total) + total) % total;
      setAnimating(true);
      gsap.to(trackRef.current, {
        x: `-${n * 100}%`,
        duration: 0.7,
        ease: "expo.inOut",
        onComplete: () => { setCur(n); setAnimating(false); },
      });
    },
    [animating, total]
  );

  const startAuto = useCallback(() => {
    autoRef.current = setInterval(() => {
      setCur((c) => {
        const next = (c + 1) % total;
        gsap.to(trackRef.current, { x: `-${next * 100}%`, duration: 0.7, ease: "expo.inOut" });
        return next;
      });
    }, 3800);
  }, [total]);

  const stopAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
  }, []);

  useEffect(() => { startAuto(); return () => stopAuto(); }, [startAuto, stopAuto]);

  // zoom active image
  useEffect(() => {
    const imgs = trackRef.current?.querySelectorAll<HTMLElement>(".g-thumb");
    imgs?.forEach((img, i) => {
      gsap.to(img, { scale: i === cur ? 1.05 : 1, duration: 0.9, ease: "power2.out" });
    });
  }, [cur]);

  const active = GRAPHIC_PROJECTS[cur];

  return (
    <section
      className="w-full"
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
    >
      {/* ── image track ─────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden w-full border-t border-b border-black/10 dark:border-white/10"
        style={{ aspectRatio: "16/9", maxHeight: "70vh" }}
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? cur + 1 : cur - 1);
        }}
      >
        <div
          ref={trackRef}
          className="flex h-full will-change-transform"
          style={{ transform: "translateX(0%)" }}
        >
          {GRAPHIC_PROJECTS.map((p) => (
            <div key={p.id} className="flex-none w-full h-full relative overflow-hidden">
              <img
                src={p.img}
                alt={p.title}
                className="g-thumb w-full h-full object-cover object-center"
                loading="lazy"
              />
              {/* bottom fade */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top,rgba(0,0,0,0.55) 0%,transparent 45%)",
                }}
              />
            </div>
          ))}
        </div>

        {/* floating project label — bottom-left */}
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 pointer-events-none">
          <p className="text-[9px] uppercase tracking-[0.25em] text-white/50 mb-1">
            {active.client}
          </p>
          <h3 className="text-white font-light text-lg sm:text-2xl leading-tight">
            {active.title}
          </h3>
          <div className="flex gap-2 mt-1.5 flex-wrap">
            {active.tags.map((t) => (
              <span
                key={t}
                className="text-[8px] uppercase tracking-widest text-white/50 border border-white/20 px-2 py-0.5"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* slide counter — top-right */}
        <span className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.25em] text-white/50 bg-black/30 backdrop-blur-sm px-2 py-1">
          {String(cur + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>

        {/* left / right click zones */}
        <button
          onClick={() => go(cur - 1)}
          className="absolute left-0 top-0 h-full w-1/4 flex items-center justify-start pl-4 opacity-0 hover:opacity-100 transition-opacity duration-200 group"
          aria-label="Previous"
        >
          <div className="w-9 h-9 border border-white/30 bg-black/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-black/50 transition-colors duration-200">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="white" strokeWidth={1.5}>
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </div>
        </button>
        <button
          onClick={() => go(cur + 1)}
          className="absolute right-0 top-0 h-full w-1/4 flex items-center justify-end pr-4 opacity-0 hover:opacity-100 transition-opacity duration-200 group"
          aria-label="Next"
        >
          <div className="w-9 h-9 border border-white/30 bg-black/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-black/50 transition-colors duration-200">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="white" strokeWidth={1.5}>
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </button>
      </div>

      {/* ── thin progress bar ───────────────────────────────────────────────── */}
      <div className="w-full h-px bg-black/8 dark:bg-white/8 overflow-hidden">
        <div
          className="h-full bg-black dark:bg-white transition-all duration-700 ease-[cubic-bezier(0.77,0,0.18,1)]"
          style={{ width: `${((cur + 1) / total) * 100}%` }}
        />
      </div>

      {/* ── dot strip + mobile arrows ────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 sm:px-8 md:px-12 py-4">
        {/* dots */}
        <div className="flex items-center gap-2">
          {GRAPHIC_PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="h-px bg-black dark:bg-white transition-all duration-300"
              style={{ width: i === cur ? 28 : 12, opacity: i === cur ? 1 : 0.2 }}
            />
          ))}
        </div>

        {/* mobile arrows (always visible on small screens) */}
        <div className="flex gap-2 sm:hidden">
          {(["left", "right"] as const).map((dir) => (
            <button
              key={dir}
              onClick={() => go(dir === "left" ? cur - 1 : cur + 1)}
              aria-label={dir === "left" ? "Previous" : "Next"}
              className="w-9 h-9 border border-black/15 dark:border-white/15 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5}>
                {dir === "left"
                  ? <polyline points="15 18 9 12 15 6" />
                  : <polyline points="9 18 15 12 9 6" />}
              </svg>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── main export ──────────────────────────────────────────────────────────────
export default function GraphicSection() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  // marquee
  useEffect(() => {
    if (!marqueeRef.current) return;
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      duration: 24,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <div className="bg-white dark:bg-black flex flex-col w-screen items-center max-w-8xl relative z-10 overflow-hidden py-20">
      <div className="absolute top-50 -right-80 h-[70%] w-[40%] rotate-45 rounded-4xl bg-black/3 dark:bg-white/3"></div>
      <div className="absolute top-50 -left-60 h-[50%] w-[25%] rotate-45 rounded-4xl bg-black/3 dark:bg-white/3"></div>
      {/* ── HERO — DO NOT TOUCH ─────────────────────────────────────────────── */}
      <div className="p-10 w-full">
        <div className="relative z-10 px-4 py-10 text-center dark:text-white/80 text-black/80">
          <h1 className="font-light uppercase text-center z-10 text-[clamp(5rem,8vw,13rem)] w-full">
            2. Graphic Design
          </h1>
          <h2 className="absolute top-12 left-30 font-light text-[8px] max-w-xs text-left dark:text-[#ffffff42] text-[#00000042]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero nam
            consequuntur eaque officia velit incidunt esse molestiae deleniti
          </h2>
          <h2 className="absolute bottom-8 right-30 font-light text-[8px] max-w-xs text-left dark:text-[#ffffff42] text-[#00000042]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero nam
            consequuntur eaque officia velit incidunt esse molestiae deleniti
            similique, eum asperiores autem? Dolorum, porro expedita tenetur vel
            quam pariatur voluptate?
          </h2>
        </div>
      </div>

      {/* ── MARQUEE ─────────────────────────────────────────────────────────── */}
      {/* <div className="w-full overflow-hidden border-t border-b border-black/10 dark:border-white/10 py-3 mb-8">
        <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="mx-8 text-[11px] uppercase tracking-[0.3em] dark:text-white/30 text-black/30 font-light"
            >
              {item}
              <span className="mx-6 dark:text-white/15 text-black/15">×</span>
            </span>
          ))}
        </div>
      </div> */}

      {/* ── IMAGE CAROUSEL ──────────────────────────────────────────────────── */}
      <div className="w-[80%]">
        <ImageCarousel />
      </div>

      {/* ── BOTTOM QUOTE + CTA ──────────────────────────────────────────────── */}
      {/* <div className="w-full px-4 sm:px-12 pb-16 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 sm:gap-0 border-t border-black/10 dark:border-white/10 pt-8">
        <p className="dark:text-white/30 text-black/30 font-light text-sm max-w-sm leading-relaxed">
          <span className="dark:text-white/60 text-black/60 text-base">"</span>
          Design is intelligence made visible.
          <span className="dark:text-white/60 text-black/60 text-base">"</span>
        </p>
        <button className="group flex items-center gap-3 px-6 py-3 border border-black/20 dark:border-white/20 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 text-sm uppercase tracking-widest self-start sm:self-auto">
          Full Portfolio
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
      </div> */}
    </div>
  );
}
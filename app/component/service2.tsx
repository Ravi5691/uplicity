"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GRAPHIC_PROJECTS = [
  { id: 1, img: "/graphicService/1.jpg", title: "Brand Identity", client: "Zara Studio", tags: ["Branding", "Logo"] },
  { id: 2, img: "/graphicService/2.jpg", title: "Editorial Layout", client: "Vogue India", tags: ["Print", "Typography"] },
  { id: 3, img: "/graphicService/3.jpg", title: "Packaging Design", client: "Nykaa", tags: ["Packaging", "Illustration"] },
  { id: 4, img: "/graphicService/4.jpg", title: "Campaign Poster", client: "Red Bull", tags: ["Poster", "Digital"] },
  { id: 5, img: "/graphicService/5.jpg", title: "Social Kit", client: "Startupland", tags: ["Social Media", "UI"] },
  { id: 6, img: "/graphicService/6.jpg", title: "Motion Identity", client: "Netflix India", tags: ["Motion", "Brand"] },
];

function ImageCarousel() {
  const [cur, setCur] = useState(0);
  const [animating, setAnimating] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const total = GRAPHIC_PROJECTS.length;

  const go = useCallback((next: number) => {
    if (animating) return;
    const n = ((next % total) + total) % total;
    setAnimating(true);
    gsap.to(trackRef.current, {
      x: `-${n * 100}%`, duration: 0.7, ease: "expo.inOut",
      onComplete: () => { setCur(n); setAnimating(false); },
    });
  }, [animating, total]);

  const startAuto = useCallback(() => {
    autoRef.current = setInterval(() => {
      setCur((c) => {
        const next = (c + 1) % total;
        gsap.to(trackRef.current, { x: `-${next * 100}%`, duration: 0.7, ease: "expo.inOut" });
        return next;
      });
    }, 3800);
  }, [total]);

  const stopAuto = useCallback(() => { if (autoRef.current) clearInterval(autoRef.current); }, []);

  useEffect(() => { startAuto(); return () => stopAuto(); }, [startAuto, stopAuto]);

  useEffect(() => {
    const imgs = trackRef.current?.querySelectorAll<HTMLElement>(".g-thumb");
    imgs?.forEach((img, i) => gsap.to(img, { scale: i === cur ? 1.06 : 1, duration: 1, ease: "power2.out" }));
  }, [cur]);

  const active = GRAPHIC_PROJECTS[cur];

  return (
    <section className="w-full" onMouseEnter={stopAuto} onMouseLeave={startAuto}>
      <div
        className="relative overflow-hidden w-full border-t border-b border-black/10"
        style={{ aspectRatio: "16/9", maxHeight: "68vh" }}
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - touchStartX.current; if (Math.abs(dx) > 40) go(dx < 0 ? cur + 1 : cur - 1); }}
      >
        <div ref={trackRef} className="flex h-full will-change-transform" style={{ transform: "translateX(0%)" }}>
          {GRAPHIC_PROJECTS.map((p) => (
            <div key={p.id} className="flex-none w-full h-full relative overflow-hidden">
              <img src={p.img} alt={p.title} className="g-thumb w-full h-full object-cover object-center" loading="lazy" />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.6) 0%,transparent 50%)" }} />
            </div>
          ))}
        </div>

        {/* floating info */}
        <div className="absolute bottom-4 left-4 sm:bottom-7 sm:left-7 pointer-events-none">
          <p className="text-[9px] uppercase tracking-[.25em] text-white/50 mb-1">{active.client}</p>
          <h3 className="text-white font-light text-lg sm:text-2xl leading-tight">{active.title}</h3>
          <div className="flex gap-2 mt-2 flex-wrap">
            {active.tags.map((t) => (
              <span key={t} className="text-[8px] uppercase tracking-widest text-white/60 border border-white/20 px-2 py-0.5 bg-blue-500/20 backdrop-blur-sm">{t}</span>
            ))}
          </div>
        </div>

        <span className="absolute top-4 right-4 text-[10px] uppercase tracking-[.25em] text-white/50 bg-black/30 backdrop-blur-sm px-2 py-1">
          {String(cur + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>

        {/* hover zone arrows */}
        <button onClick={() => go(cur - 1)} className="absolute left-0 top-0 h-full w-1/5 flex items-center justify-start pl-4 opacity-0 hover:opacity-100 transition-opacity duration-200 group" aria-label="Previous">
          <div className="w-9 h-9 border border-white/30 bg-black/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-blue-500/70 transition-colors duration-200">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="white" strokeWidth={1.5}><polyline points="15 18 9 12 15 6" /></svg>
          </div>
        </button>
        <button onClick={() => go(cur + 1)} className="absolute right-0 top-0 h-full w-1/5 flex items-center justify-end pr-4 opacity-0 hover:opacity-100 transition-opacity duration-200 group" aria-label="Next">
          <div className="w-9 h-9 border border-white/30 bg-black/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-blue-500/70 transition-colors duration-200">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="white" strokeWidth={1.5}><polyline points="9 18 15 12 9 6" /></svg>
          </div>
        </button>
      </div>

      {/* progress bar */}
      <div className="w-full h-0.5 bg-black/8 overflow-hidden">
        <div className="h-full bg-blue-500 transition-all duration-700 ease-[cubic-bezier(0.77,0,0.18,1)]" style={{ width: `${((cur + 1) / total) * 100}%` }} />
      </div>

      {/* dots + mobile arrows */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-4">
        <div className="flex items-center gap-2">
          {GRAPHIC_PROJECTS.map((_, i) => (
            <button key={i} onClick={() => go(i)} aria-label={`Slide ${i + 1}`}
              className="h-px bg-black transition-all duration-300"
              style={{ width: i === cur ? 28 : 12, opacity: i === cur ? 1 : 0.2 }} />
          ))}
        </div>
        <div className="flex gap-2">
          {(["left", "right"] as const).map((dir) => (
            <button key={dir} onClick={() => go(dir === "left" ? cur - 1 : cur + 1)}
              className="w-9 h-9 border border-black/15 flex items-center justify-center hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-200">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5}>
                {dir === "left" ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
              </svg>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function GraphicSection() {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;
    gsap.fromTo(headingRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true } }
    );
  }, []);

  return (
    <div className="bg-blue-200 flex flex-col w-screen items-center relative z-10 overflow-hidden py-12 sm:py-20">
      {/* blobs */}
      <div className="absolute top-50 -right-100 h-[55%] w-[35%] rotate-45 rounded-[3rem] bg-blue-400/40 pointer-events-none" />
      <div className="absolute bottom-0 -left-105 h-[65%] w-[25%] rotate-45 rounded-[3rem] bg-blue-400/50 pointer-events-none" />

      {/* heading */}
      <div ref={headingRef} className="w-full px-4 pb-8 sm:pb-12">
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 text-blue-900 text-[11px] uppercase tracking-[.15em] px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Service 02
          </div>
          <h1 className="font-light uppercase text-[clamp(2.8rem,7vw,11rem)] leading-[.92] tracking-tighter text-black/80 w-full">
            Graphic Design
          </h1>
          <p className="mt-4 text-[11px] sm:text-sm text-black/40 max-w-sm mx-auto leading-relaxed">
            Visual systems that make brands impossible to ignore — print, digital, identity.
          </p>
        </div>
      </div>

      {/* carousel */}
      <div className="w-[90%] sm:w-[82%]">
        <ImageCarousel />
      </div>

      <div className="grid grid-cols-3 w-[90%] sm:w-[82%] h-100 gap-5">
        <div className="bg-black/20 rounded-xl">

        </div>
        <div className="bg-black/20 rounded-xl">

        </div>
        <div className="bg-black/20 rounded-xl">

        </div>
      </div>
      {/* bottom CTA */}
      <div className="flex justify-center mt-8 sm:mt-10">
        <button className="group flex items-center gap-3 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 text-xs uppercase tracking-widest rounded-full">
          Full Portfolio
          <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

    </div>
  );
}
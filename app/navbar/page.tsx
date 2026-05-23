"use client";

import { Oswald } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import gsap from "gsap";
// import ThemeToggle from "../component/themetoggle";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import Link from "next/link";

gsap.registerPlugin(ScrambleTextPlugin, TextPlugin);
const oswald = Oswald({ subsets: ["latin"], weight: ["400", "700"] });

const handleHover = (el: HTMLElement, text: string) => {
  gsap.killTweensOf(el);
  gsap.to(el, {
    duration: 0.6,
    scrambleText: { text, chars: "upperCase", speed: 0.3 },
    ease: "power1.out",
  });
};

const handleLeave = (el: HTMLElement, text: string) => {
  gsap.killTweensOf(el);
  el.innerText = text;
};

export default function NewNavbar() {
  const [dateTime, setDateTime] = useState("");
  const [shortTime, setShortTime] = useState("");
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLSpanElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const marqueeInnerRef = useRef<HTMLSpanElement | null>(null);

  // Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      const time = new Intl.DateTimeFormat("en-IN", options).format(now);
      setDateTime("NEW DELHI, INDIA | " + time);
      setShortTime(time);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Logo scramble on mount
  useEffect(() => {
    if (!logoRef.current) return;
    gsap.from(logoRef.current, {
      delay: 0.3,
      duration: 1,
      scrambleText: { text: "UPLICITY", chars: "upperCase", speed: 0.4 },
      ease: "power2.out",
    });
  }, []);

  // Marquee loop
  useEffect(() => {
    const el = marqueeInnerRef.current;
    if (!el) return;
    const totalWidth = el.offsetWidth / 2;
    gsap.to(el, {
      x: -totalWidth,
      duration: 18,
      ease: "none",
      repeat: -1,
      modifiers: { x: (x) => `${parseFloat(x) % totalWidth}px` },
    });
  }, []);

  // Menu open/close animation
  useEffect(() => {
    const menu = menuRef.current;
    const links = linksRef.current;
    const overlay = overlayRef.current;
    if (!menu || !links || !overlay) return;

    if (open) {
      // Show overlay backdrop first
      gsap.set(overlay, { display: "block" });
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });

      // Slide panel in
      gsap.set(menu, { x: "100%" });
      gsap.to(menu, { x: "0%", duration: 0.7, ease: "power4.out" });

      // Stagger nav links up
      const items = links.querySelectorAll(".nav-item");
      gsap.fromTo(
        items,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out", delay: 0.25 }
      );
    } else {
      gsap.to(menu, { x: "100%", duration: 0.55, ease: "power3.inOut" });
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => { gsap.set(overlay, { display: "none" }); },
      });
    }
  }, [open]);

  const navLinks = [
    { label: "ABOUT", number: "01", href: "#about" },
    { label: "PROJECTS", number: "02", href: "/#project" },
    { label: "CONTACT", number: "03", href: "#contact" },
  ];

  const marqueeText = "CREATIVE AGENCY · VIDEO · WEB · DESIGN · NEW DELHI · UPLICITY · MOTION · BRANDING · ";

  return (
    <>
      {/* ── NAVBAR ── */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center w-screen px-4 md:px-11 h-14 md:h-16 ">
        {/* Logo */}
        <div className={` text-xl md:text-2xl font-light flex items-start text-white gap-1`}>
          <span className="uppercase tracking-widest">UPLICITY</span>
          <sup className="text-[9px] mt-[10px] opacity-60">™</sup>
        </div>

        {/* Right side */}
        <div className="flex items-center text-white gap-4">
          <span className="hidden md:block text-[11px] font-light opacity-80 tracking-widest">{dateTime}</span>
          <span className="block md:hidden text-[11px] font-light opacity-80">{shortTime}</span>

          {/* Menu button */}
          <button
            onClick={() => setOpen(true)}
            onMouseEnter={(e) => {
              const el = e.currentTarget.querySelector(".anim-text") as HTMLElement;
              if (el) handleHover(el, "MENU");
            }}
            className="group relative flex items-center gap-2 border border-white/30 rounded-full px-4 py-1.5 text-[10px] tracking-[0.2em] font-light text-white overflow-hidden hover:border-white/70 transition-colors duration-300"
          >
            {/* Hover fill */}
            <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out rounded-full" />
            <span className="anim-text relative z-10 group-hover:text-black transition-colors duration-300">MENU</span>
            {/* Animated hamburger lines */}
            <span className="relative z-10 flex flex-col gap-[3px] group-hover:[&>span]:bg-black">
              <span className="block w-3 h-[1px] bg-white transition-colors duration-300" />
              <span className="block w-2 h-[1px] bg-white transition-colors duration-300" />
            </span>
          </button>
        </div>
      </div>

      {/* ── BACKDROP OVERLAY ── */}
      <div
        ref={overlayRef}
        onClick={() => setOpen(false)}
        className="hidden fixed inset-0 z-[998] bg-black/10 backdrop-blur-xs"
      />

      {/* ── SLIDE MENU (slides in from RIGHT) ── */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 h-screen w-full md:w-[480px] z-[999] translate-x-full"
        style={{ willChange: "transform" }}
      >
        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "256px 256px",
          }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 w-full h-full bg-blue-500 flex flex-col border-l border-white/25">

          {/* Top bar */}
          <div className="flex justify-between items-center px-6 md:px-10 py-5 border-b border-white/25">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-pulse" />
              <span className="text-[10px] font-light text-white tracking-[0.25em] uppercase">
                Navigation
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              onMouseEnter={(e) => {
                const el = e.currentTarget.querySelector(".anim-close") as HTMLElement;
                if (el) handleHover(el, "CLOSE");
              }}
              className="group flex items-center gap-2 border border-white/25 rounded-full px-3 py-1.5 text-[10px] tracking-[0.2em] text-white hover:border-white/60 hover:text-white transition-colors duration-200"
            >
              <span className="anim-close">CLOSE</span>
              <X size={10} />
            </button>
          </div>

          {/* Nav links */}
          <div ref={linksRef} className="flex flex-col flex-1 justify-center px-6 md:px-10">
            {navLinks.map(({ label, number, href }, i) => (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="nav-item group flex items-center justify-between py-6 md:py-8 border-b border-white/25 last:border-b-0"
              >
                <div className="flex items-end gap-5">
                  <span className="text-[10px] font-light opacity-80 text-white tracking-widest mb-1.5 font-mono">
                    /{number}
                  </span>
                  <span
                    onMouseEnter={(e) => handleHover(e.currentTarget, label)}
                    onMouseLeave={(e) => handleLeave(e.currentTarget, label)}
                    className={`${oswald.className} text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-white group-hover:translate-x-2 transition-transform duration-300`}
                  >
                    {label}
                  </span>
                </div>

                {/* Arrow with circle */}
                <div className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:border-white/50 transition-all duration-300">
                  <span className="text-white text-sm">↗</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/25">
            {/* Marquee */}
            <div className="overflow-hidden border-b border-white/25 py-2">
              <span ref={marqueeInnerRef} className="inline-block text-[9px] tracking-[0.2em] text-white/80 uppercase whitespace-nowrap will-change-transform">
                {marqueeText}{marqueeText}
              </span>
            </div>

            <div className="flex items-end justify-between px-6 md:px-10 py-5">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] tracking-[0.2em] uppercase text-white">Local time</span>
                <span className="text-xs font-light text-white tracking-wider font-mono">{dateTime}</span>
              </div>
              {/* <ThemeToggle /> */}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
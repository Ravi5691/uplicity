"use client";

import { Oswald } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import ThemeToggle from "../component/themetoggle";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import Link from "next/link";

gsap.registerPlugin(ScrambleTextPlugin, TextPlugin);
const oswald = Oswald({ subsets: ["latin"], weight: ["400", "700"] });
const handleHover = (el: HTMLElement, text: string) => {
  gsap.killTweensOf(el);

  gsap.to(el, {
    duration: 0.8,
    scrambleText: {
      text,
      chars: "upperCase",
      speed: 0.1,
    },
    ease: "power1.out",
  });
};

const handleLeave = (el: HTMLElement, text: string) => {
  gsap.killTweensOf(el);
  el.innerText = text; // ✅ instant clean reset
};


export default function NewNavbar() {
  const [dateTime, setDateTime] = useState("");
  const [shortTime, setShortTime] = useState("");
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    if (!menuRef.current) return;
    if (open) {
      gsap.to(menuRef.current, { x: 0, duration: 0.6, ease: "power3.out" });
    } else {
      gsap.to(menuRef.current, { x: "-100%", duration: 0.6, ease: "power3.inOut" });
    }
  }, [open]);

  const navLinks = [
    { label: "ABOUT", number: "01", href: "#about" },
    { label: "PROJECTS", number: "02", href: "/#project" },
    { label: "CONTACT", number: "03", href: "#contact" },
  ];

  useEffect(() => {
    let lastScrollY = 0;
    let isHidden = false;
    let gsapInstance: any = null;

    import("gsap").then(({ gsap }) => {
      gsapInstance = gsap;
    });

    const handleScroll = () => {
      const currentY = window.scrollY;

      if (!gsapInstance || !navRef.current) {
        lastScrollY = currentY;
        return;
      }

      if (Math.abs(currentY - lastScrollY) < 5) return;

      if (currentY > lastScrollY && currentY > 80) {
        if (!isHidden) {
          gsapInstance.to(navRef.current, {
            y: -120,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          });
          isHidden = true;
        }
      } else {
        if (isHidden) {
          gsapInstance.to(navRef.current, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          });
          isHidden = false;
        }
      }

      lastScrollY = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ── NAVBAR ── */}
      <div ref={navRef} className="flex justify-between items-center w-screen px-3 md:px-10 h-14 md:h-16 ">
        {/* Logo */}
        <div className="text-xl md:text-2xl font-light flex items-start dark:text-white text-black gap-1">
          <span className="uppercase">UPLICITY</span>
          <sup className="text-[10px] mt-[10px]">™</sup>
        </div>

        {/* Right side */}
        <div className="flex items-center dark:text-white text-black font-light gap-4">
          <span className=" hidden md:block text-sm font-light opacity-70 tracking-wider">{dateTime}</span>
          <span className="block md:hidden text-xs font-light opacity-70">{shortTime}</span>
          <button
            onClick={() => setOpen(true)}
            onMouseEnter={(e) => {
              const el = e.currentTarget.querySelector(".anim-text");
              if (el) handleHover(el as HTMLElement, "MENU");
            }}
            className="flex items-center gap-2 border border-black/20 dark:border-white/20 rounded-full px-3 py-1.5 text-xs tracking-widest font-light hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
          >
            <span className="anim-text">MENU</span>
            <Menu size={12} />
          </button>
        </div>
      </div>

      {/* ── SLIDE MENU ── */}
      <div
        ref={menuRef}
        className="fixed inset-0 top-0 left-0 w-full h-screen z-9999 translate-x-[-100%] p-2 md:p-4 bg-white dark:bg-black"
      >
        <div className="relative w-full h-full dark:bg-[#000000] bg-white border dark:border-white/10 border-black/10 rounded-2xl overflow-hidden flex flex-col">

          {/* ── Top bar inside menu ── */}
          <div className="flex justify-between items-center px-4 md:px-10 py-5 border-b dark:border-white/10 border-black/10">
            <div className="text-sm md:text-base font-light dark:text-white text-black opacity-50 tracking-widest uppercase">
              Navigation
            </div>
            <button
              onClick={() => setOpen(false)}
              onMouseEnter={(e) => {
                const el = e.currentTarget.querySelector(".anim-text");
                if (el) handleHover(el as HTMLElement, "CLOSE");
              }}
              className=" flex items-center gap-2 border border-black/20 dark:border-white/20 rounded-full px-3 py-1.5 text-xs tracking-widest font-light dark:text-white text-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
            >
              <span className="anim-text"> CLOSE </span>  <X size={12} />
            </button>
          </div>

          {/* ── Nav links — outlet style ── */}
          <div className="flex flex-col flex-1 justify-center px-6 md:px-10">
            {navLinks.map(({ label, number, href }, i) => (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between py-5 md:py-7 border-b dark:border-white/10 border-black/10 last:border-b-0">
                {/* Number + Label */}
                <div className="flex items-end gap-4">
                  <span className="text-[10px] md:text-xs font-light opacity-30 dark:text-white text-black tracking-widest mb-1">
                    /{number}
                  </span>
                  <span
                    onMouseEnter={(e) =>
                      handleHover(e.currentTarget, e.currentTarget.innerText)
                    }
                    onMouseLeave={(e) =>
                      handleLeave(e.currentTarget, label)
                    }
                    className=" anim-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight dark:text-white text-black group-hover:translate-x-3 transition-transform duration-300">
                    {label}
                  </span>
                </div>

                {/* Arrow */}
                <span className="text-xl md:text-2xl font-light opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 dark:text-white text-black">
                  ↗
                </span>
              </Link>
            ))}
          </div>

          {/* ── Bottom bar ── */}
          <div className="flex items-end justify-between px-4 md:px-10 py-5 md:py-7 border-t dark:border-white/10 border-black/10">
            {/* Left: time + location */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px] tracking-widest uppercase opacity-40 dark:text-white text-black">
                Local time
              </span>
              <span className="text-xs md:text-sm font-light opacity-60 dark:text-white text-black tracking-wider">
                {dateTime}
              </span>
            </div>

            {/* Right: theme toggle */}
            <ThemeToggle />
          </div>

        </div>
      </div>
    </>
  );
}
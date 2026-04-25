"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const media = [
  { src: "/media/ui-2.jpg", type: "img", label: "UI Design" },
  { src: "/media/ui-3.jpg", type: "img", label: "Branding" },
  { src: "/media/uiVideo1.mp4", type: "video", label: "Motion" },
  { src: "/media/ui-5.jpg", type: "img", label: "Web" },
  { src: "/media/ui-6.jpg", type: "img", label: "Social" },
  { src: "/media/uiVideo2.mp4", type: "video", label: "Ad Creative" },
];

const loopMedia = [...media, ...media, ...media, ...media];

export default function HeroLoopBoxes() {
  const planeRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Pause videos when tab hidden
  useEffect(() => {
    const handleVisibility = () => {
      document.querySelectorAll("video").forEach((v) => {
        document.hidden ? v.pause() : v.play();
      });
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Main 3D loop animation
  useEffect(() => {
    const plane = planeRef.current;
    const track = trackRef.current;
    if (!plane || !track || track.children.length === 0) return;

    const cards = Array.from(track.children) as HTMLElement[];
    const boxWidth = cards[0].offsetWidth;
    const gap = 16; // gap-4 on mobile / gap-6 on desktop (use 16 as base)
    const totalWidth = (boxWidth + gap) * (cards.length / 2);

    // Camera perspective
    gsap.set(plane.parentElement, { perspective: 1800 });

    // Initial 3D tilt
    gsap.set(plane, {
      transformStyle: "preserve-3d",
      rotateX: 38,
      rotateY: 5,
    });

    // Entrance animation — fade + slide up
    gsap.from(plane, {
      y: 80,
      opacity: 0,
      duration: 1.4,
      ease: "power3.out",
      delay: 0.2,
    });

    // Infinite scroll loop
    tweenRef.current = gsap.to(track, {
      x: -totalWidth,
      duration: 30,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => `${parseFloat(x) % totalWidth}px`,
      },
    });
  }, []);

  // Mouse parallax tilt
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const xRatio = e.clientX / window.innerWidth - 0.5;
      const yRatio = e.clientY / window.innerHeight - 0.5;
      gsap.to(planeRef.current, {
        rotateY: 5 + xRatio * 18,
        rotateX: 38 + yRatio * -8,
        duration: 1.2,
        ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Hover to slow / resume scroll
  const handleTrackEnter = () => {
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 0.2, duration: 0.6, ease: "power2.out" });
  };
  const handleTrackLeave = () => {
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 1, duration: 0.6, ease: "power2.out" });
  };

  return (
    <section ref={sectionRef} className="relative h-screen md:block hidden overflow-hidden bg-blue-500">

      {/* ── Grain texture ── */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      {/* ── Vignette ── */}
      <div className="absolute inset-0 z-[2] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%)]" />

      {/* ── Top + bottom fade bars ── */}
      <div className="absolute top-0 left-0 right-0 h-40 z-[3] bg-gradient-to-b from-blue-500 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-48 z-[3] bg-gradient-to-t from-blue-500 to-transparent pointer-events-none" />

      <div className="absolute top-0 right-0 md:h-[40%] md:w-[30%] h-[20%] w-[20%] rounded-bl-[4rem] bg-blue-400/20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 md:h-[35%] md:w-[25%] h-[20%] w-[20%] rounded-tr-[4rem] bg-blue-500/10 pointer-events-none" />
      <div className="absolute md:-top-50 -top-20 md:-left-50 -left-10 md:h-150 md:w-150 h-[40%] w-[40%] rounded-full bg-blue-100/20 pointer-events-none" />
      <div className="absolute md:-bottom-20 -bottom-5 -right-10 md:-right-30 md:h-100 md:w-100 h-70 w-60 rounded-full bg-blue-100/20 pointer-events-none" />


      {/* ── Hero text overlay ── */}
      <div className="absolute inset-0 z-[10] flex flex-col items-center justify-center pointer-events-none px-4 text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-5">
          Our Work
        </p>
        <h1 className="text-white font-light text-[clamp(3rem,9vw,9rem)] leading-[0.9] tracking-tighter mix-blend-difference">
          WE CREATE
          <br />
          <em className="not-italic text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.5)" }}>
            MOTION
          </em>
        </h1>
        <p className="text-white/65 text-xs sm:text-sm mt-6 max-w-xs leading-relaxed tracking-wide">
          Video · Design · Web — built to make people stop scrolling.
        </p>
      </div>

      {/* ── Scroll hint ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[10] flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-[9px] tracking-[0.3em] uppercase text-white/50">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
      </div>

      {/* ── 3D Plane container ── */}
      <div className="absolute inset-0 flex items-center z-[4]">
        <div className="w-full">
          <div ref={planeRef} className="-rotate-6 md:-rotate-4">
            <div
              ref={trackRef}
              onMouseEnter={handleTrackEnter}
              onMouseLeave={handleTrackLeave}
              className="flex gap-4 md:gap-6 will-change-transform"
            >
              {loopMedia.map((item, i) => (
                <div
                  key={i}
                  className="relative md:h-[420px] h-[55vw] md:w-[300px] w-[65vw] shrink-0 rounded-xl overflow-hidden transform-gpu group"
                >
                  {/* Label badge */}
                  <div className="absolute top-3 left-3 z-10 text-[9px] tracking-[0.15em] uppercase bg-white/10 backdrop-blur-md text-white/80 px-2.5 py-1 rounded-full border border-white/10">
                    {item.label}
                  </div>

                  {item.type === "video" ? (
                    <video
                      src={item.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={item.label}
                      draggable={false}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}

                  {/* Subtle inner vignette per card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
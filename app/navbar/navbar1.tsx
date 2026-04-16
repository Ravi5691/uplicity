"use client";

import { Dancing_Script, Anton } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] });
const anton = Anton({ subsets: ["latin"], weight: ["400"] });

/* ---- SERVICE DATA ---- */
const services = [
  { title: "Video Editing", img: "/services/1.jpg" },
  { title: "Graphic Design", img: "/services/2.jpg" },
  { title: "Web Development", img: "/services/3.jpg" },
];

/* ---- ANIMATED NAV LINK ---- */
function AnimatedNavLink({
  label,
  onMouseEnter,
  className = "",
}: {
  label: string;
  onMouseEnter?: () => void;
  className?: string;
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`relative cursor-pointer select-none overflow-hidden group ${className}`}
      onMouseEnter={() => {
        setHover(true);
        onMouseEnter?.();
      }}
      onMouseLeave={() => setHover(false)}
    >
      {/* Original text */}
      <span
        className={`${anton.className} block transition-transform duration-300 ease-in-out ${hover ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
          }`}
      >
        {label}
      </span>
      {/* Clone slides up from below */}
      <span
        className={`${anton.className} absolute inset-0 flex items-center justify-start text-blue-200 transition-transform duration-300 ease-in-out ${hover ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
      >
        {label}
      </span>
      {/* Underline */}
      <span
        className={`absolute bottom-0 left-0 h-[1px] bg-blue-200 transition-all duration-300 ease-in-out ${hover ? "w-full" : "w-0"
          }`}
      />
    </div>
  );
}

/* ========================================================= */
/* ================= DESKTOP NAV ================= */
/* ========================================================= */
function DesktopNavbar() {
  const navRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const [activePreview, setActivePreview] = useState<"services" | "projects" | "portfolio" | null>(null);
  const [hoverService, setHoverService] = useState(0);
  const [navTheme, setNavTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    let gsapInstance: any;
    import("gsap").then((mod) => {
      gsapInstance = mod.gsap;
      gsapInstance.from(navRef.current, { opacity: 0, duration: 5, delay: 1, ease: "power1.out" });
      gsapInstance.set(panelRef.current, { height: 0, opacity: 0 });
    });

    const sections = document.querySelectorAll<HTMLElement>("section[data-nav]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setNavTheme(entry.target.getAttribute("data-nav") === "dark" ? "dark" : "light");
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const openPanel = () => {
    import("gsap").then(({ gsap }) => {
      gsap.to(panelRef.current, { height: 370, opacity: 1, duration: 0.4, ease: "power2.out" });
    });
  };

  const closePanel = () => {
    import("gsap").then(({ gsap }) => {
      gsap.to(panelRef.current, { height: 0, opacity: 0, duration: 0.35, ease: "power2.inOut" });
    });
  };

  const showPreview = (type: "services" | "projects" | "portfolio") => {
    setActivePreview(type);
    openPanel();
  };

  return (
    <div
      ref={navRef}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
      onMouseLeave={closePanel}
    >
      {/* Outer glow ring */}
      <div className="relative rounded-3xl">
        {/* Subtle animated border gradient */}
        <div
          className="absolute -inset-[1px] rounded-3xl pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.05) 50%, rgba(147,197,253,0.3) 100%)",
          }}
        />

        {/* Main pill */}
        <div
          className="relative rounded-3xl px-10 py-5 min-w-7xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.10)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: "0 8px 32px rgba(30,64,175,0.18), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Dot matrix pattern overlay */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="nav-dots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#nav-dots)" />
          </svg>

          {/* Nav links */}
          <div
            className={`relative flex items-center justify-between text-[17px] ${navTheme === "dark" ? "text-black/80" : "text-white"}`}
          >
            <div className="flex gap-10">
              <AnimatedNavLink label="Services" onMouseEnter={() => showPreview("services")} />
              <AnimatedNavLink label="Projects" onMouseEnter={() => showPreview("projects")} />
            </div>

            {/* Logo */}
            <div className={`${dancingScript.className} absolute left-1/2 -translate-x-1/2 text-4xl tracking-wide`}>
              <span className="relative">
                uplicity
                {/* Shimmer underline on logo */}
                <span
                  className="absolute bottom-0 left-0 h-[1px] w-full"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)" }}
                />
              </span>
            </div>

            <AnimatedNavLink label="About Us" onMouseEnter={() => showPreview("portfolio")} />
          </div>

          {/* Preview panel */}
          <div ref={panelRef} className="overflow-hidden">
            {activePreview === "services" && (
              <div className="grid grid-cols-2 gap-6 mt-5">
                <div className="flex flex-col gap-4">
                  {services.map((s, i) => (
                    <div
                      key={i}
                      className={`${anton.className} cursor-pointer transition-all duration-200`}
                      style={{ opacity: hoverService === i ? 1 : 0.15 }}
                      onMouseEnter={() => setHoverService(i)}
                    >
                      <div className="text-5xl text-white">{s.title}</div>
                    </div>
                  ))}
                </div>
                <div className="relative min-h-[350px] rounded-xl overflow-hidden border border-white/20">
                  <Image src={services[hoverService].img} alt="preview" fill className="object-cover" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================= */
/* ================= MOBILE NAV ================= */
/* ========================================================= */
function MobileNavbar() {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);

  useEffect(() => {
    if (!panelRef.current) return;
    import("gsap").then(({ gsap }) => {
      open
        ? gsap.fromTo(panelRef.current, { x: "100%" }, { x: "0%", duration: 0.5, ease: "power3.out" })
        : gsap.to(panelRef.current, { x: "100%", duration: 0.45, ease: "power3.inOut" });
    });
  }, [open]);

  const navLinks = ["Services", "Projects", "About Us"];

  return (
    <div>
      {/* Top bar */}
      <div
        className="md:hidden fixed top-4 left-4 right-4 z-50 flex justify-between items-center px-5 py-4 rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.10)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 4px 24px rgba(30,64,175,0.15), inset 0 1px 0 rgba(255,255,255,0.2)",
          border: "0.5px solid rgba(255,255,255,0.25)",
        }}
      >
        <div className={`${dancingScript.className} text-3xl text-white`}>uplicity</div>

        <button className="relative w-7 h-6 mr-3" onClick={() => setOpen((p) => !p)}>
          <span className={`absolute h-[1px] w-full bg-white transition-all duration-300 ${open ? "rotate-45 top-3.5" : "top-1"}`} />
          <span className={`absolute h-[1px] w-full bg-white transition-all duration-300 ${open ? "opacity-0" : "top-3.5"}`} />
          <span className={`absolute h-[1px] w-full bg-white transition-all duration-300 ${open ? "-rotate-45 top-3.5" : "top-6"}`} />
        </button>
      </div>

      {/* Slide panel */}
      <div
        ref={panelRef}
        className="md:hidden fixed top-5 right-0 h-screen w-screen translate-x-full z-40 overflow-hidden"
        style={{
          background: "rgba(10,20,60,0.85)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
        }}
      >
        {/* Dot pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="mob-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mob-dots)" />
        </svg>

        {/* Decorative circle accent */}
        <div
          className="absolute -top-32 -right-32 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-20 -left-20 w-60 h-60 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(147,197,253,0.12) 0%, transparent 70%)" }}
        />

        <div className={`${anton.className} flex flex-col uppercase gap-0 p-10 pt-28 text-white text-4xl tracking-wide relative z-10`}>
          {navLinks.map((link, i) => (
            <div
              key={i}
              className="relative py-5 border-b border-white/15 overflow-hidden cursor-pointer"
              onTouchStart={() => setHoveredLink(i)}
              onTouchEnd={() => setHoveredLink(null)}
            >
              {/* Hover fill */}
              <div
                className="absolute inset-0 bg-blue-500/10 transition-transform duration-200 origin-left"
                style={{ transform: hoveredLink === i ? "scaleX(1)" : "scaleX(0)" }}
              />
              <div className="flex items-center justify-between relative z-10">
                <span>{link}</span>
                <span className="text-white/30 text-2xl">↗</span>
              </div>
            </div>
          ))}

          {/* Logo at bottom of panel */}
          <div className={`${dancingScript.className} mt-12 text-5xl text-white/20 font-normal normal-case`}>
            uplicity
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================= */
/* ================= EXPORT ================= */
/* ========================================================= */
export default function Navbar() {
  return (
    <>
      <div className="hidden md:block">
        <DesktopNavbar />
      </div>
      <MobileNavbar />
    </>
  );
}
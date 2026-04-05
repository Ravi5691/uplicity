"use client";

import { Dancing_Script, Lora, Anton } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ================= FONTS ================= */
const lora = Lora({ subsets: ["latin"], weight: ["400", "700"] });
const anton = Anton({ subsets: ["latin"], weight: ["400"] });
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
});

/* ================= DATA ================= */
const services = [
  { title: "Video Editing", img: "/services/1.jpg" },
  { title: "Graphic Design", img: "/services/2.jpg" },
  { title: "Web Development", img: "/services/3.jpg" },
];

/* ========================================================= */
/* ================= DESKTOP NAV (100% ORIGINAL LOGIC) ================= */
/* ========================================================= */
function DesktopNavbar() {
  const navRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const [activePreview, setActivePreview] =
    useState<"services" | "projects" | "portfolio" | null>(null);
  const [hoverService, setHoverService] = useState(0);
  const [navTheme, setNavTheme] = useState<"light" | "dark">("light");

  /* ---------- INTRO + THEME ---------- */
  useEffect(() => {
    let gsapInstance: any;
 
    import("gsap").then((mod) => {
      gsapInstance = mod.gsap;
      gsapInstance.from(navRef.current, {
        opacity: 0,
        duration: 5,
        delay: 1,
        ease: "power1.out",
      });
      gsapInstance.set(panelRef.current, { height: 0, opacity: 0 });
    });

    const sections = document.querySelectorAll<HTMLElement>("section[data-nav]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setNavTheme(
              entry.target.getAttribute("data-nav") === "dark"
                ? "dark"
                : "light"
            );
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  /* ---------- AUTO HIDE / SHOW ON SCROLL (RESTORED) ---------- */
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

  /* ---------- PANEL CONTROL ---------- */
  const openPanel = () => {
    import("gsap").then(({ gsap }) => {
      gsap.to(panelRef.current, {
        height: 370,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    });
  };

  const closePanel = () => {
    import("gsap").then(({ gsap }) => {
      gsap.to(panelRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power2.inOut",
      });
    });
  };

  const showPreview = (
    type: "services" | "projects" | "portfolio"
  ) => {
    setActivePreview(type);
    openPanel();
  };

  
  return (
    <div
      ref={navRef}
      className="
        fixed top-8 left-1/2 -translate-x-1/2 z-50
        rounded-3xl p-6 px-10
        border border-white/40
        bg-white/15 backdrop-blur-xl
        shadow-[0_0_20px_rgba(183,189,223,0.20)]
      "
      onMouseLeave={closePanel}
    >
      {/* NAV CONTENT */}
      <div
        className={`relative flex items-center justify-between min-w-7xl text-[17px] ${
          navTheme === "dark" ? "text-black/80" : "text-white"
        }`}
      >
        <div className={`${anton.className} flex gap-10`}>
          <div onMouseEnter={() => showPreview("services")}>Services</div>
          <div onMouseEnter={() => showPreview("projects")}>Projects</div>
        </div>

        <div
          className={`${dancingScript.className} absolute left-1/2 -translate-x-1/2 text-4xl`}
        >
          uplicity
        </div>

        <div
          className={`${anton.className}`}
          onMouseEnter={() => showPreview("portfolio")}
        >
          About Us
        </div>
      </div>

      {/* PREVIEW PANEL */}
      <div ref={panelRef} className="overflow-hidden">
        {activePreview === "services" && (
          <div className="grid grid-cols-2 gap-6 mt-5">
            <div className="flex flex-col gap-4">
              {services.map((s, i) => (
                <div
                  key={i}
                  className={`${anton.className}`}
                  style={{ opacity: hoverService === i ? 1 : 0.1 }}
                  onMouseEnter={() => setHoverService(i)}
                >
                  <div className="text-5xl">{s.title}</div>
                </div>
              ))}
            </div>
            <div className="relative min-h-[350px] border">
              <Image
                src={services[hoverService].img}
                alt="preview"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ========================================================= */
/* ================= MOBILE NAV (SEPARATE) ================= */
/* ========================================================= */
function MobileNavbar() {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!panelRef.current) return;

    import("gsap").then(({ gsap }) => {
      open
        ? gsap.fromTo(
            panelRef.current,
            { x: "100%" },
            { x: "0%", duration: 0.5, ease: "power3.out" }
          )
        : gsap.to(panelRef.current, {
            x: "100%",
            duration: 0.45,
            ease: "power3.inOut",
          });
    });
  }, [open]);

  return (
    <div>
      {/* TOP BAR */}
      <div className="md:hidden fixed top-4 left-4 right-4 z-50 flex justify-between items-center px-5 py-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/15">
        <div className={`${dancingScript.className} text-3xl text-white`}>
          uplicity
        </div>

        <button
          className="relative w-7 h-6 mr-3"
          onClick={() => setOpen((p) => !p)}
        >
          <span className={`absolute h-[1px] w-full bg-white transition ${open ? "rotate-45 top-3.5" : "top-1"}`} />
          <span className={`absolute h-[1px] w-full bg-white transition ${open ? "opacity-0" : "top-3.5"}`} />
          <span className={`absolute h-[1px] w-full bg-white transition ${open ? "-rotate-45 top-3.5" : "top-6"}`} />
        </button>
      </div>

      {/* SLIDE PANEL */}
      <div
        ref={panelRef}
        className="md:hidden fixed top-5 right-0 h-screen w-screen bg-black/70 backdrop-blur-xl translate-x-full z-40"
      >
        <div className={`${anton.className} flex flex-col uppercase gap-8 p-10 pt-24 text-white text-4xl tracking-wide`}>
          <div className="border-b border-white/50 ">
            <h1>Services</h1>
          </div>
          <div className="border-b border-white/50 ">
            <h1>Projects</h1>
          </div>
          <div className="border-b border-white/50 ">
            <h1>About Us</h1>
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

"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    title: "ModePro",
    description:
      "A fashion-forward digital experience with editorial layouts and immersive product storytelling.",

    desktopSrc: "/webService/1.png",
    mobileSrc: "/webService/mob1.png",

    url: "https://modepro.vercel.app/",
    color: "#1a1a2e",
    tag: "Fashion · E-commerce",
    year: "2024",
  },
  {
    title: "Krivisio",
    description:
      "A bold creative studio portfolio with fluid transitions, custom cursor interactions, and a dark cinematic aesthetic.",
    desktopSrc: "/webService/2.png",
    mobileSrc: "/webService/mob2.png",
    url: "https://www.krivisio.com/",
    color: "#0f1b12",
    tag: "Portfolio · Studio",
    year: "2024",
  },
  // {
  //   title: "Ravinder Portfolio",
  //   description:
  //     "A personal brand portfolio designed to convert — clean motion, strategic layout, and a sharp first impression that lasts.",
  //   src: "/webService/3.webp",
  //   url: "https://ravinder-portfolio.vercel.app/",
  //   color: "#1c1410",
  //   tag: "Personal · Brand",
  //   year: "2023",
  // },
];

function Card({
  i,
  title,
  description,
  desktopSrc,
  mobileSrc,
  url,
  color,
  tag,
  year,
  progress,
  range,
  targetScale,
}: any) {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky"
      style={{ top: `${i * 25}px` }}
    >
      {/* Entire card is a link */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-[90%] max-w-[1250px]"
        style={{ textDecoration: "none" }}
      >
        <motion.div
          style={{ backgroundColor: color, scale }}
          className="relative flex flex-col w-full md:h-[680px] h-[70vh] md:rounded-4xl rounded-2xl origin-top overflow-hidden shadow-2xl group cursor-pointer"
        >

          {/* ── Desktop top bar ── */}
          <div className="hidden md:flex items-center justify-between absolute top-7 left-8 right-8 z-20 mix-blend-difference">
            <div className="flex items-center gap-3">
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/40">0{i + 1}</span>
              <span className="w-px h-3 bg-white/20" />
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/40">{tag}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/30 font-mono">{year}</span>
              {/* Arrow circle — brightens on hover */}
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center opacity-60 group-hover:opacity-100 group-hover:border-white/60 group-hover:scale-110 transition-all duration-300">
                <span className="text-white text-xs">↗</span>
              </div>
            </div>
          </div>

          {/* ── Desktop title (bottom left) ── */}
          <div className="hidden md:block absolute bottom-7 left-8 z-20">
            <h2 className="text-3xl tracking-tight text-white group-hover:translate-x-1 transition-transform duration-300">
              {title}
            </h2>
            <p className="text-xs text-white mt-1 max-w-sm leading-relaxed">{description}</p>
          </div>

          {/* ── Desktop "View Project" label bottom right ── */}
          <div className="hidden md:flex absolute bottom-7 bg-black rounded-full p-3 border border-white right-8 z-20 items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-[10px] tracking-[0.2em] uppercase text-white">View Project</span>
          </div>

          {/* ── Image ── */}
          {/* ── Image ── */}
          <div className="w-full h-full overflow-hidden">
            <motion.div style={{ scale: imageScale }} className="w-full h-full">

              {/* Desktop Image */}
              <Image
                fill
                src={desktopSrc}
                alt={title}
                className="hidden md:block object-cover object-top  group-hover:scale-[1.02] transition-transform duration-700"
              />

              {/* Mobile Image */}
              <Image
                fill
                src={mobileSrc}
                alt={title}
                className="block md:hidden object-cover object-top group-hover:scale-[1.02] transition-transform duration-700"
              />

            </motion.div>
          </div>

          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100" />

          {/* ── Mobile bottom bar ── */}
          <div className="md:hidden absolute bottom-0 left-0 w-full px-5 py-5 z-20">
            <div className="flex items-end justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9px] tracking-[0.2em] uppercase text-white/40">0{i + 1}</span>
                  <span className="w-px h-2.5 bg-white/20" />
                  <span className="text-[9px] tracking-[0.15em] uppercase text-white/40">{tag}</span>
                </div>
                <h2 className="text-2xl font-light tracking-tight text-white leading-tight">{title}</h2>
                <p className="text-[11px] mt-1.5 leading-relaxed text-white line-clamp-2">
                  {description}
                </p>
              </div>
              {/* Tap arrow */}
              <div className="shrink-0 w-10 h-10 rounded-full border border-white/25 flex items-center justify-center">
                <span className="text-white text-sm">↗</span>
              </div>
            </div>
          </div>

        </motion.div>
      </a>
    </div>
  );
}

export default function Service3() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section id="project" className="relative flex flex-col items-center w-screen bg-[#acd3ff] text-black">

      {/* Section header */}
      <div className="relative z-10 flex flex-col items-center pt-14 pb-8 px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 text-blue-900 text-[11px] uppercase tracking-[.15em] px-4 py-1.5 rounded-full mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          Service 02 — Web Dev
        </div>
        <h1 className="font-light uppercase text-[clamp(2.6rem,6.5vw,10rem)] leading-[.92] tracking-tighter text-black/80 w-full">
          Projects that <span className="italic text-blue-600">speak</span>
        </h1>
        <p className="text-black/40 text-xs sm:text-sm max-w-sm leading-relaxed mt-5">
          Each site is crafted with intent — from interaction to animation, built to convert.
        </p>
      </div>

      <main
        ref={container}
        className="relative w-full"
        style={{ height: `${projects.length * 100}vh` }}
      >
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05;
          const rangeStart = i / projects.length;
          const rangeEnd = (i + 1) / projects.length;
          return (
            <Card
              key={i}
              i={i}
              {...project}
              progress={scrollYProgress}
              range={[rangeStart, rangeEnd]}
              targetScale={targetScale}
            />
          );
        })}
      </main>
    </section>
  );
}
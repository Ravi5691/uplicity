"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    title: "Matthias Leidinger",
    description:
      "Originally hailing from Austria, Berlin-based photographer Matthias Leindinger is a young creative brimming with talent and ideas.",
    src: "/webService/1.webp",
    url: "https://modepro.vercel.app/",
    color: "#ffffff40",
  },
  {
    title: "Clément Chapillon",
    description:
      "This is a story on the border between reality and imaginary, about the contradictory feelings that the insularity of a rocky territory provokes.",
    src: "/webService/2.webp",
    url: "https://www.krivisio.com/",
    color: "#ffffff40",
  },
  {
    title: "Zissou",
    description:
      "Though he views photography as a medium for storytelling, Zissou's images don't insist on a narrative.",
    src: "/webService/3.webp",
    url: "https://ravinder-portfolio.vercel.app/",
    color: "#ffffff40",
  },
];

function Card({
  i,
  title,
  description,
  src,
  url,
  color,
  progress,
  range,
  targetScale,
}: any) {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    // ✅ sticky top is on the outer container, offset by card index
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky"
      style={{ top: `${i * 25}px` }}   // ← moved here, progressive offset
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          // ✅ no top offset here — origin-top handles the stack anchor
        }}
        className="relative flex flex-col w-[90%] max-w-[1250px] md:h-[680px] h-[70vh] md:rounded-4xl  rounded-2xl origin-top overflow-hidden shadow-2xl"
      >
        <h2 className=" absolute md:top-10 top-5 uppercase w-full z-10 -translate-x-1/2 left-1/2 text-center md:text-2xl text-lg font-semibold">{title}</h2>
        {/* <div className="flex h-full mt-10 gap-10"> */}
        {/* <div className="w-[40%] relative top-[10%]">
            <p className="text-sm leading-relaxed">{description}</p>
            <span className="flex items-center gap-2 mt-3">
              <a href={url} target="_blank" className="text-xs underline">
                See more
              </a>
              <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
                <path
                  d="M21.53 6.53c.29-.29.29-.76 0-1.06L16.76.7a.75.75 0 0 0-1.06 1.06L19.94 6l-4.24 4.24a.75.75 0 1 0 1.06 1.06l4.77-4.77ZM0 6.75h21v-1.5H0v1.5Z"
                  fill="black"
                />
              </svg>
            </span>
          </div> */}
        {/* </div> */}
        <div className=" w-full h-[80vh] overflow-hidden">
          <motion.div style={{ scale: imageScale }} className="w-full h-full">
            <Image
              fill
              src={`${src}`}
              alt="image"
              className="object-cover"
            />
          </motion.div>
        </div>
        {/* Mobile Content (below image) */}
        <div className="md:hidden absolute bottom-0 left-0 w-full bg-black/40 backdrop-blur-md text-white p-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-xs mt-1 leading-relaxed line-clamp-3">
            {description}
          </p>
          <a
            href={url}
            target="_blank"
            className="text-[11px] underline mt-2 inline-block"
          >
            See more
          </a>
        </div>
      </motion.div>
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
    <section className="relative flex flex-col items-center w-screen bg-[#acd3ff] text-black">
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

      {/* ✅ No mt/mb offset — scroll height is purely driven by card count */}
      <main
        ref={container}
        className="relative w-full"
        style={{ height: `${projects.length * 100}vh` }}
      >
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05;
          // ✅ Evenly distributed ranges across [0, 1]
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
"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { Lora } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lora = Lora({ subsets: ["latin"], weight: ["400", "700"] });

export default function PhotoAnime() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Start all images from scale 0 in the center area
      gsap.set(".service2-img", {
        scale: 0,
        opacity: 0,
        transformOrigin: "50% 50%",
      });

      gsap.to(".service2-img", {
        scale: 1,
        opacity: 1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=800%", // 5x viewport height scroll
          scrub: true,
          pin: true,
          markers:true
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const images = [
    { src: "/graphicService/1.jpg", top:"10%", left: "35%" },
    { src: "/graphicService/2.jpg", top: "25%", left: "40%" },
    { src: "/graphicService/3.jpg", top: "40%", left: "45%" },
    { src: "/graphicService/4.jpg", top: "49%", left: "56%" },
    { src: "/graphicService/5.jpg", top: "35%", left: "65%" },
    { src: "/graphicService/6.jpg", top: "40%", left: "55%" },
  ];

  return (
    <section
      ref={sectionRef}
      className={`${lora.className} relative z-30 text-black/80 flex flex-col gap-5 justify-center items-center min-h-screen w-screen bg-linear-to-b from-[#9dc4ff] via-[#c6ddff] to-[#d7e6fd] overflow-hidden`}
    >

      {/* Text content */}
      <div className="relative z-10 flex flex-col gap-5 items-center px-4">
        <h1 className="text-4xl md:text-7xl lg:text-8xl text-center">
          Graphic Design
        </h1>
        <h2 className="max-w-2xl text-center text-base md:text-lg">
          Creative graphic design solutions that elevate your brand identity,
          boost your visual presence, and make your audience fall in love at
          first glance.
        </h2>
      </div>

      {/* Image cluster in the center */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative w-screen">
          {images.map((img, i) => (
            <div
              key={i}
              className="service2-img absolute"
              style={{
                top: img.top,
                left: img.left,
                translate: "-50% -50%",
              }}
            >
              <Image
                src={img.src}
                alt={`service image ${i + 1}`}
                width={400}
                height={400}
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

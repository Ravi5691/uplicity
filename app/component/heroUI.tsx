"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const media = [
  // { src: "/media/ui-1.jpg", type: "img" },
  { src: "/media/ui-2.jpg", type: "img" },
  { src: "/media/ui-3.jpg", type: "img" },
  { src: "/media/uiVideo1.mp4", type: "video" },
  { src: "/media/ui-5.jpg", type: "img" },
  { src: "/media/ui-6.jpg", type: "img" },
  { src: "/media/uiVideo2.mp4", type: "video" },
  // { src: "/media/ui-6.gif", type: "gif" },
];

// duplicate for seamless infinite loop
const loopMedia = [...media, ...media , ...media , ...media ];

export default function HeroLoopBoxes() {
  const planeRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleVisibility = () => {
      document.querySelectorAll("video").forEach((v) => {
        document.hidden ? v.pause() : v.play();
      });
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);


  useEffect(() => {
    const plane = planeRef.current;
    const track = trackRef.current;
    if (!plane || !track || track.children.length === 0) return;

    const cards = Array.from(track.children) as HTMLElement[];
    const boxWidth = cards[0].offsetWidth;
    const gap = 24; // tailwind gap-6
    const totalWidth = (boxWidth + gap) * (cards.length / 2);

    // CAMERA
    gsap.set(plane.parentElement, {
      perspective: 1800,
    });

    // 3D PLANE
    gsap.set(plane, {
      transformStyle: "preserve-3d",
      rotateY: 58 ,
      rotateX: 40,
    });

    // INFINITE LOOP
    gsap.to(track, {
      x: -totalWidth,
      duration: 32,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => `${parseFloat(x) % totalWidth}px`,
      },
      onUpdate: function () {
        const p = this.progress();
        gsap.set(plane, {
          rotateY: 5 + Math.sin(p * Math.PI * 2) * 10,
        });
      },
    });
  }, []);

  return (
    <section className="relative md:min-h-screen h-screen md:overflow-hidden">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full">
          {/* 3D PLANE */}
          <div ref={planeRef} className="md:-rotate-8 -rotate-12">
            <div
              ref={trackRef}
              className="flex md:gap-6 gap-3 will-change-transform"
            >
              {loopMedia.map((item, i) => (
                <div
                  key={i}
                  className="relative md:h-120 h-[60vh] md:w-90 w-[80vw] shrink-0
               rounded-xl overflow-hidden transform-gpu"
                >
                  {item.type === "video" ? (
                    <video
                      src={item.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt=""
                      draggable={false}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

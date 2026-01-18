"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type VideoItem = {
  src: string;
  label?: string;
  scale : number;
};

type VideoShowcaseProps = {
  videos: VideoItem[];
  className?: string; // so you can control size/position from parent
};

export default function VideoShowcase({
  videos,
  className = "",
}: VideoShowcaseProps) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isAnimatingRef = useRef(false);

  const currentVideo = videos[index];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const handleNext = () => {
    if (isAnimatingRef.current || videos.length <= 1) return;
    const videoEl = videoRef.current;
    if (!videoEl) return;

    isAnimatingRef.current = true;

    gsap.to(videoEl, {
      opacity: 0,
      y: 20,
      duration: 0.35,
      ease: "power2.inOut",
      onComplete: () => {
        const nextIndex = (index + 1) % videos.length;

        // change video src manually for smooth switch
        const nextVideo = videos[nextIndex];
        setIndex(nextIndex);
        videoEl.src = nextVideo.src;
        videoEl.load();
        videoEl.play().catch(() => {});

        gsap.fromTo(
          videoEl,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
            onComplete: () => {
              isAnimatingRef.current = false;
            },
          }
        );
      },
    });
  };

  if (!currentVideo) return null;

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden border-white/15 bg-black/60 backdrop-blur-md shadow-xl ${className}`}
    >
      {/* VIDEO */}
      <video
        ref={videoRef}
        src={currentVideo.src}
        loop
        muted
        playsInline
        autoPlay
        className="h-80vh w-full object-cover"
        style={{ transform: `scale(${currentVideo.scale})` }}
      />

      {/* TOP LABEL */}
      <div className="pointer-events-none absolute left-4 top-3 md:text-[10px] text-[2px] uppercase tracking-[0.25em] text-white/70">
        Auto loop • {currentVideo.label ?? `Video ${index + 1}`}
      </div>

      {/* SWITCH BUTTON (BOTTOM RIGHT) */}
      <button
        type="button"
        onClick={handleNext}
        className="absolute bottom-3 right-3 md:flex hidden h-10 w-10 items-center justify-center rounded-full bg-white/90 text-black shadow-lg hover:scale-105 active:scale-95 transition-transform"
      >
        <span className="translate-x-1px text-lg">➜</span>
      </button>
    </div>
  );
}

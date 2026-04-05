"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Carousel from "@/components/ui/carousel";
gsap.registerPlugin(ScrollTrigger);

export default function WebShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const projects = [
    { id: 1, img: "/webService/3.webp" },
    { id: 2, img: "/webService/3.webp" },
    { id: 3, img: "/webService/3.webp" },
  ];

  const slideData = [
    {
      title: "Mystic Mountains",
      button: "Explore Component",
      src: "https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=3534&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Urban Dreams",
      button: "Explore Component",
      src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Neon Nights",
      button: "Explore Component",
      src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Desert Whispers",
      button: "Explore Component",
      src: "https://images.unsplash.com/photo-1679420437432-80cfbf88986c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current;
      const totalCards = cards.length;

      // Initial setup
      cards.forEach((card, i) => {
        gsap.set(card, {
          y: i === 0 ? 0 : 120,
          scale: i === 0 ? 1 : 0.95,
          opacity: i === 0 ? 1 : 0,
          zIndex: totalCards - i,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalCards * 100}vh`, // 👈 THIS IS THE KEY
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;

        // Bring current card in
        tl.to(
          card,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "power3.out",
          },
          i
        );

        // Push previous cards back
        tl.to(
          cards.slice(0, i),
          {
            y: -20 * i,
            scale: 1 - i * 0.04,
            ease: "power3.out",
          },
          i
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
      <div className="relative overflow-hidden bg-white dark:bg-black w-full h-full py-20">
        <Carousel slides={slideData} />
      </div>
  );
}

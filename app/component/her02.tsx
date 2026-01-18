"use client";

import { useEffect, useRef } from "react";
import { Inter } from "next/font/google";
import { Anton } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const anton = Anton({ subsets: ["latin"], weight: ["400"] });
const inter = Inter({ subsets: ["latin"], weight: ["200", "400", "700"] });

// Keywords to highlight
const HIGHLIGHT_WORDS = [
    "Brands",
    "Video",
    "Design",
    "Web",
    "creativity",
    "growth",
];

// Helper function to highlight keywords
const highlightText = (text: string) => {
    const regex = new RegExp(`(${HIGHLIGHT_WORDS.join("|")})`, "gi");

    return text.split(regex).map((part, i) =>
        HIGHLIGHT_WORDS.some(
            (word) => word.toLowerCase() === part.toLowerCase()
        ) ? (
            <span key={i} className="text-red-500 font-normal">
                {part}
            </span>
        ) : (
            <span key={i}>{part}</span>
        )
    );
};

const QuoteIconBold = ({ className = "" }) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M10 60C10 35 25 20 45 15V25C30 30 25 40 25 55H45V60H10Z"
      fill="currentColor"
    />
    <path
      d="M55 60C55 35 70 20 90 15V25C75 30 70 40 70 55H90V60H55Z"
      fill="currentColor"
    />
  </svg>
);


export default function Hero2() {
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!textRef.current) return;

        const lines = textRef.current.querySelectorAll(".line");

        gsap.fromTo(
            lines,
            {
                y: 60,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                stagger: 0.15,
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    }, []);

    return (
        <div className="w-screen max-w-8xl p-5 bg-noise flex justify-center">

            <h2
                ref={textRef}
                className={`${inter.className} relative text-4xl font-light text-white text-center max-w-5xl tracking-wide leading-[3rem]`}
            >
                <QuoteIconBold className="w-50 h-50 p-15 text-white absolute -top-20 -left-35 rounded-full border border-dashed border-white/20" />
                <QuoteIconBold className="w-50 h-50 p-15 text-white absolute -top-20 -right-35 -rotate-y-180 rounded-full border border-dashed border-white/20" />
                {[
                    "The internet moves fast. Brands must move smarter.",
                    "We shape motion, color, and code into clear stories.",
                    "Stories that speak before a word is read.",
                    "Video edits that feel alive and intentional.",
                    "Design that balances beauty with clarity.",
                    "Web solutions that guide users without friction.",
                    "When creativity aligns with strategy, growth follows.",
                    "That is where we work.",
                ].map((line, i) => (
                    <span key={i} className="line block overflow-hidden">
                        <span className="block">{highlightText(line)}</span>
                    </span>
                ))}
            </h2>
        </div>
    );
}

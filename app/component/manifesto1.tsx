"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HIGHLIGHT_WORDS = ["Brands", "Video", "Design", "Web", "creativity", "growth"];

const highlightText = (text: string) => {
    const regex = new RegExp(`(${HIGHLIGHT_WORDS.join("|")})`, "gi");
    return text.split(regex).map((part, i) =>
        HIGHLIGHT_WORDS.some((word) => word.toLowerCase() === part.toLowerCase()) ? (
            <span key={i} className="text-blue-950 font-normal">{part}</span>
        ) : (
            <span key={i}>{part}</span>
        )
    );
};

const QuoteIconBold = ({ className = "" }) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M10 60C10 35 25 20 45 15V25C30 30 25 40 25 55H45V60H10Z" fill="currentColor" />
        <path d="M55 60C55 35 70 20 90 15V25C75 30 70 40 70 55H90V60H55Z" fill="currentColor" />
    </svg>
);

const lines = [
    "The internet moves fast. Brands must move smarter.",
    "We shape motion, color, and code into clear stories.",
    "Stories that speak before a word is read.",
    "Video edits that feel alive and intentional.",
    "Design that balances beauty with clarity.",
    "Web solutions that guide users without friction.",
    "When creativity aligns with strategy, growth follows.",
    "That is where we work.",
];

export default function Hero2() {
    const textRef = useRef<HTMLHeadingElement>(null);
    const bgTextRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!textRef.current) return;

        // Desktop: line-by-line reveal
        const lineEls = textRef.current.querySelectorAll(".line-desktop");
        if (lineEls.length) {
            gsap.fromTo(
                lineEls,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }

        // Mobile: paragraph reveal
        const paraEl = textRef.current.querySelector(".para-mobile");
        if (paraEl) {
            gsap.fromTo(
                paraEl,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }

        // BG text scroll reveal with clip-path wipe
        if (bgTextRef.current) {
            gsap.fromTo(
                bgTextRef.current,
                { clipPath: "inset(0 100% 0 0)", opacity: 0.04 },
                {
                    clipPath: "inset(0 0% 0 0)",
                    opacity: 0.08,
                    duration: 1.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: bgTextRef.current,
                        start: "top 90%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }
    }, []);

    return (
        <div className="relative w-screen flex flex-col justify-center items-center max-w-8xl p-5 bg-blue-500 relative z-10 overflow-hidden">
            {/* Quote icons — mobile only */}
            <QuoteIconBold className="md:hidden w-25 h-25 p-5 text-white/50 absolute top-0 -left-5 rounded-full border border-dashed border-white/50" />
            <QuoteIconBold className="md:hidden w-25 h-25 p-5 text-white/50 absolute top-0 -right-5 -rotate-y-180 rounded-full border border-dashed border-white/50" />

            <h2
                ref={textRef}
                className="relative md:text-4xl text-lg font-light text-white text-center max-w-5xl tracking-wide md:leading-12 md:mt-0 mt-10"
            >
                {/* Quote icons — desktop only */}
                <QuoteIconBold className="hidden md:block w-50 h-50 p-15 text-white/30 absolute -top-20 -left-35 rounded-full border border-dashed border-white/20" />
                <QuoteIconBold className="hidden md:block w-50 h-50 p-15 text-white/30 absolute -top-20 -right-35 -rotate-y-180 rounded-full border border-dashed border-white/20" />

                {/* DESKTOP: line-by-line */}
                <span className="hidden md:block">
                    {lines.map((line, i) => (
                        <span key={i} className="line-desktop block overflow-hidden font-light">
                            <span className="block">{highlightText(line)}</span>
                        </span>
                    ))}
                </span>

                {/* MOBILE / TABLET: paragraph */}
                <span className="md:hidden para-mobile block font-light text-center leading-relaxed text-lg px-2">
                    {lines.map((line, i) => (
                        <span key={i}>
                            {highlightText(line)}
                            {i < lines.length - 1 ? " " : ""}
                        </span>
                    ))}
                </span>
            </h2>

            {/* BG text — full width, scroll reveal */}
            <div
                ref={bgTextRef}
                className="absolute text-white opacity-10 md:text-[70vh] text-[50vh] font-bold md:-bottom-[33vh] -bottom-[20vh] left-0 w-full overflow-hidden pointer-events-none select-none"
            // style={{
            //     fontSize: "clamp(3rem, 80vw, 60vw)",
            //     lineHeight: 0.85,
            //     opacity: 0.08,
            //     whiteSpace: "nowrap",
            //     letterSpacing: "-0.02em",
            // }}
            >
                uplicity
            </div>

            <div className="w-screen bg-noise">
                <div className="md:h-40 h-20 w-screen bg-blue-500"></div>
            </div>
        </div>
    );
}
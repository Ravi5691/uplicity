"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export default function Intro() {
    const logoRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        // LOCK SCROLL
        document.body.style.overflow = "hidden";

        const tl = gsap.timeline({
            defaults: { ease: "power2.out" },
            onComplete: () => {
                // UNLOCK SCROLL when intro ends
                document.body.style.overflow = "auto";
            }
        });
        // STEP 1: big to normal scale (fade in center)
        tl.fromTo(
            logoRef.current,
            {
                opacity: 0,
                scale: 2,
            },
            {
                opacity: 1,
                scale: 1,
                duration: 1.5,
            }
        )
            // STEP 2: move to navbar
            .to(logoRef.current, {
                yPercent: -748,
                duration: 1.5,
            }, "-=0.1")

            // STEP 4: fade overlay away
            .to("#intro-overlay", {
                opacity: 0,
                duration: 1.5,
                pointerEvents: "none",
            });

        return () => {
            tl.kill();
            document.body.style.overflow = "auto"; // safety reset
        };
    }, []);


    return (
        <div
            id="intro-overlay"
            className="fixed inset-0 h-screen w-screen text-white z-100 flex items-center justify-center bg-noise"
        >
            <span
                ref={logoRef}
                className={`${dancingScript.className} absolute logo-start text-4xl font-semibold left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ml-[47px]`}
            >
                uplicity
            </span>



        </div>
    );
}

// "use client";

// import { useEffect, useState } from "react";
// import { Anton } from "next/font/google";

// const anton = Anton({ subsets: ["latin"], weight: ["400", "400"] });
// type Testimonial = {
//     id: number;
//     text: string;
//     name: string;
//     role: string;
//     avatar: string;
// };


// const testimonials = [
//     {
//         id: 1,
//         text:
//             "We hired them for video editing and the turnaround time was crazy fast. Clean cuts, perfect pacing, and the final video matched our brand exactly.",
//         name: "Amit Sharma",
//         role: "Content Creator",
//         avatar: "/avatars/1.png",
//     },
//     {
//         id: 2,
//         text:
//             "The graphic design work was on point. From thumbnails to social media creatives, everything looked professional and consistent.",
//         name: "Rohan Mehta",
//         role: "Marketing Manager",
//         avatar: "/avatars/2.png",
//     },
//     {
//         id: 3,
//         text:
//             "They built our website exactly the way we imagined. Smooth UI, fast load times, and very responsive on changes.",
//         name: "Ananya Singh",
//         role: "Founder, Startup Studio",
//         avatar: "/avatars/3.png",
//     },
//     {
//         id: 4,
//         text:
//             "Our promo videos look much more engaging now. The edits feel premium and we’ve seen better audience retention after posting.",
//         name: "Kunal Verma",
//         role: "Brand Manager",
//         avatar: "/avatars/4.png",
//     },
//     {
//         id: 5,
//         text:
//             "Great communication and reliable delivery. They handled both design and web updates without any confusion or delays.",
//         name: "Nandini Kapoor",
//         role: "Operations Lead",
//         avatar: "/avatars/5.png",
//     },
// ];


// export default function SampleTestimonials() {
//     const [index, setIndex] = useState(0);

//     useEffect(() => {
//         const i = setInterval(() => {
//             setIndex((prev) => (prev + 1) % testimonials.length);
//         }, 4000);
//         return () => clearInterval(i);
//     }, []);

//     const prev =
//         (index - 1 + testimonials.length) % testimonials.length;
//     const next = (index + 1) % testimonials.length;

//     return (
//         <div className="min-h-screen w-screen flex flex-col relative justify-center items-center bg-blue-200 lightgreen-noise py-20">

//             {/* <div className="w-full overflow-hidden">
//                 <div className={`relative flex justify-center overflow-hidden items-center w-full`}>
//                     <span className={`${anton.className} text-center z-10 text-[clamp(3rem,5vw,5rem)] w-full text-white leading-none mb-10`}>what client say's about our work</span>
//                 </div>
//             </div> */}

//             <div className="absolute h-full w-full inset-0 flex gap-5 justify-start ml-10">
//                 {/* <div className="h-full border border-white/40
//         bg-white/15 backdrop-blur-xl w-5"></div>
//                 <div className="h-full border border-white/40
//         bg-white/15 backdrop-blur-xl w-5"></div> */}
//                 {/* <div className="h-full border border-white/40
//         bg-white/15 backdrop-blur-xl w-35"></div>
//                 <div className="h-full border border-white/40
//         bg-white/15 backdrop-blur-xl w-35"></div>
//                 <div className="h-full border border-white/40
//         bg-white/15 backdrop-blur-xl w-35"></div>
//                 <div className="h-full border border-white/40
//         bg-white/15 backdrop-blur-xl w-35"></div>
//                 <div className="h-full border border-white/40
//         bg-white/15 backdrop-blur-xl w-35"></div> */}
//             </div>

//             <div className="absolute h-full w-full inset-0 flex flex-col gap-5 mt-10">
//                 {/* <div className="w-full border border-white/40
//         bg-white/15 backdrop-blur-xl h-5"></div>
//                 <div className="w-full border border-white/40
//         bg-white/15 backdrop-blur-xl h-5"></div> */}
//                 {/* <div className="h-full border border-white/40
//         bg-white/15 backdrop-blur-xl w-35"></div>
//                 <div className="h-full border border-white/40
//         bg-white/15 backdrop-blur-xl w-35"></div>
//                 <div className="h-full border border-white/40
//         bg-white/15 backdrop-blur-xl w-35"></div>
//                 <div className="h-full border border-white/40
//         bg-white/15 backdrop-blur-xl w-35"></div>
//                 <div className="h-full border border-white/40
//         bg-white/15 backdrop-blur-xl w-35"></div> */}
//             </div>

//             <div className="w-[60%] h-[60vh] bg-blue-500/50 p-1 flex items-center justify-center rounded-3xl">
//                 {/* TEXT */}

//                 <div className="w-full h-full relative bg-white p-20 flex flex-col items-center rounded-2xl">
//                     <div className="text-center max-w-2.5xl transition-opacity duration-500">
//                         <p className="text-[24px] font-medium text-gray-800">
//                             “{testimonials[index].text}”
//                         </p>
//                         <div className="mt-5">
//                             <p className="font-semibold text-gray-900">
//                                 {testimonials[index].name}
//                             </p>
//                             <p className="text-sm text-gray-500">
//                                 {testimonials[index].role}
//                             </p>
//                         </div>
//                     </div>

//                     {/* AVATAR RAIL */}
//                     {/* AVATAR RAIL */}
//                     <div className="absolute bottom-10">
//                         <AvatarRail
//                             testimonials={testimonials}
//                             activeIndex={index}
//                             visibleCount={5} // 👈 change to any odd number (3,5,7)
//                         />
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// }

// /* FIXED CIRCLE COMPONENT */
// function AvatarRail({
//     testimonials,
//     activeIndex,
//     visibleCount = 5,
// }: {
//     testimonials: Testimonial[];
//     activeIndex: number;
//     visibleCount: number;
// }) {
//     if (visibleCount % 2 === 0) {
//         throw new Error("visibleCount must be an odd number");
//     }

//     const half = Math.floor(visibleCount / 2);

//     return (
//         <div className="relative flex items-center justify-center gap-8 mt-12">
//             {Array.from({ length: visibleCount }).map((_, i) => {
//                 const offset = i - half; // -2 -1 0 +1 +2
//                 const idx =
//                     (activeIndex + offset + testimonials.length) %
//                     testimonials.length;

//                 const distance = Math.abs(offset);

//                 // decay values
//                 const scale = 1 - distance * 0.15;
//                 const opacity = 1 - distance * 0.25;
//                 const size = 90 * scale;

//                 return (
//                     <div
//                         key={i}
//                         className="flex items-center justify-center transition-all duration-500"
//                         style={{
//                             width: size,
//                             height: size,
//                             transform: `scale(${scale})`,
//                             opacity,
//                         }}
//                     >
//                         <div
//                             className={`overflow-hidden rounded-full
//                 ${offset === 0 ? "ring-4 ring-blue-500/50" : ""}
//               `}
//                             style={{ width: "100%", height: "100%" }}
//                         >
//                             <img
//                                 src={testimonials[idx].avatar}
//                                 alt=""
//                                 className="h-full w-full object-cover"
//                             />
//                         </div>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Testimonial = {
    id: number;
    text: string;
    name: string;
    role: string;
    avatar: string;
};

const testimonials: Testimonial[] = [
    {
        id: 1,
        text: "We hired them for video editing and the turnaround time was crazy fast. Clean cuts, perfect pacing, and the final video matched our brand exactly.",
        name: "Amit Sharma", role: "Content Creator", avatar: "/avatars/1.png",
    },
    {
        id: 2,
        text: "The graphic design work was on point. From thumbnails to social media creatives, everything looked professional and consistent.",
        name: "Rohan Mehta", role: "Marketing Manager", avatar: "/avatars/2.png",
    },
    {
        id: 3,
        text: "They built our website exactly the way we imagined. Smooth UI, fast load times, and very responsive on changes.",
        name: "Ananya Singh", role: "Founder, Startup Studio", avatar: "/avatars/3.png",
    },
    {
        id: 4,
        text: "Our promo videos look much more engaging now. The edits feel premium and we've seen better audience retention after posting.",
        name: "Kunal Verma", role: "Brand Manager", avatar: "/avatars/4.png",
    },
    {
        id: 5,
        text: "Great communication and reliable delivery. They handled both design and web updates without any confusion or delays.",
        name: "Nandini Kapoor", role: "Operations Lead", avatar: "/avatars/5.png",
    },
];

function AvatarRail({ testimonials, activeIndex, visibleCount = 5 }: { testimonials: Testimonial[]; activeIndex: number; visibleCount: number }) {
    if (visibleCount % 2 === 0) throw new Error("visibleCount must be odd");
    const half = Math.floor(visibleCount / 2);

    return (
        <div className="flex items-center justify-center gap-3 sm:gap-5">
            {Array.from({ length: visibleCount }).map((_, i) => {
                const offset = i - half;
                const idx = (activeIndex + offset + testimonials.length) % testimonials.length;
                const distance = Math.abs(offset);
                const scale = 1 - distance * 0.14;
                const opacity = 1 - distance * 0.28;
                const size = 64 * scale;

                return (
                    <div key={i} className="flex items-center justify-center transition-all duration-500"
                        style={{ width: size, height: size, transform: `scale(${scale})`, opacity }}>
                        <div className={`overflow-hidden rounded-full w-full h-full ${offset === 0 ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-white" : ""}`}>
                            <img src={testimonials[idx].avatar} alt="" className="h-full w-full object-cover" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default function SampleTestimonials() {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);

    // auto-rotate with fade transition
    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % testimonials.length);
                setFade(true);
            }, 250);
        }, 4500);
        return () => clearInterval(interval);
    }, []);

    const goTo = (i: number) => {
        setFade(false);
        setTimeout(() => { setIndex(i); setFade(true); }, 200);
    };

    // scroll reveal
    useEffect(() => {
        if (!headingRef.current || !cardRef.current) return;
        gsap.fromTo(headingRef.current, { y: 40, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1.1, ease: "power3.out",
            scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
        });
        gsap.fromTo(cardRef.current, { y: 60, opacity: 0, scale: 0.96 }, {
            y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.15,
            scrollTrigger: { trigger: cardRef.current, start: "top 85%", once: true },
        });
    }, []);

    const active = testimonials[index];

    return (
        <div ref={sectionRef} className="h-full w-screen flex flex-col items-center justify-center bg-noise py-16 sm:py-24 relative overflow-hidden px-4">
            {/* inner shadow — top */}
            <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-20"
                style={{ background: "linear-gradient(to bottom, #acd3ff 0%, transparent 100%)" }} />
            {/* inner shadow — bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-20"
                style={{ background: "linear-gradient(to top, #acd3ff 0%, transparent 100%)" }} />

            {/* blobs */}
            <div className="absolute top-0 right-0 h-[40%] w-[30%] rounded-bl-[4rem] bg-blue-400/30 pointer-events-none" />
            <div className="absolute bottom-0 left-0 h-[35%] w-[25%] rounded-tr-[4rem] bg-blue-500/20 pointer-events-none" />
            <div className="absolute -top-50 -left-50 h-150 w-150  rounded-full bg-blue-100/30 pointer-events-none" />
            <div className="absolute -bottom-20 -right-30 h-100 w-100  rounded-full bg-blue-100/30 pointer-events-none" />

            {/* heading */}
            <div ref={headingRef} className="text-center mb-10 sm:mb-14 relative z-10">
                <div className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 text-blue-900 text-[11px] uppercase tracking-[.15em] px-4 py-1.5 rounded-full mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    Client Love
                </div>
                <h2 className="font-light text-[clamp(2rem,5vw,5rem)] leading-[.95] tracking-tighter text-black/80">
                    What clients say
                </h2>
                <p className="text-black/40 text-sm mt-3 max-w-xs mx-auto leading-relaxed">
                    Real words from real people we've worked with.
                </p>
            </div>

            {/* testimonial card */}
            <div ref={cardRef} className="relative z-10 w-full max-w-3xl">
                {/* outer ring / glow */}
                <div className="absolute -inset-1 rounded-3xl bg-blue-500/20 blur-sm" />
                <div className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
                    {/* top blue accent bar */}
                    <div className="h-1 w-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600" />

                    <div className="px-6 py-10 sm:px-14 sm:py-14 flex flex-col items-center text-center">
                        {/* quote mark */}
                        <div className="text-blue-200 text-[3rem] sm:text-[7rem] leading-none font-serif mb-2 sm:mb-4 select-none" aria-hidden>
                            "
                        </div>

                        {/* text */}
                        <div style={{ opacity: fade ? 1 : 0, transition: "opacity 0.25s ease" }}>
                            <p className="text-base sm:text-xl font-light text-gray-700 leading-relaxed max-w-xl mx-auto">
                                {active.text}
                            </p>
                            <div className="mt-6 sm:mt-8">
                                <p className="font-semibold text-gray-900 text-sm sm:text-base">{active.name}</p>
                                <p className="text-xs sm:text-sm text-blue-500 mt-0.5 uppercase tracking-widest">{active.role}</p>
                            </div>
                        </div>

                        {/* avatar rail */}
                        <div className="mt-8 sm:mt-10 w-full">
                            <AvatarRail testimonials={testimonials} activeIndex={index} visibleCount={5} />
                        </div>

                        {/* manual dots */}
                        <div className="flex gap-2 mt-6">
                            {testimonials.map((_, i) => (
                                <button key={i} onClick={() => goTo(i)}
                                    className="h-1.5 rounded-full transition-all duration-300"
                                    style={{ width: i === index ? 24 : 8, background: i === index ? "#3b82f6" : "rgba(15,23,42,.15)" }}
                                    aria-label={`Testimonial ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* prev/next buttons */}
            <div className="flex gap-3 mt-8 relative z-10">
                {(["prev", "next"] as const).map((dir) => (
                    <button key={dir}
                        onClick={() => goTo(dir === "prev" ? (index - 1 + testimonials.length) % testimonials.length : (index + 1) % testimonials.length)}
                        className="w-10 h-10 border border-black/15 flex items-center justify-center hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-200 rounded-full">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5}>
                            {dir === "prev" ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
                        </svg>
                    </button>
                ))}
            </div>
        </div>
    );
}
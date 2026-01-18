"use client";

import { useEffect, useState } from "react";
import { Anton } from "next/font/google";

const anton = Anton({ subsets: ["latin"], weight: ["400", "400"] });
type Testimonial = {
    id: number;
    text: string;
    name: string;
    role: string;
    avatar: string;
};


const testimonials = [
    {
        id: 1,
        text:
            "We hired them for video editing and the turnaround time was crazy fast. Clean cuts, perfect pacing, and the final video matched our brand exactly.",
        name: "Amit Sharma",
        role: "Content Creator",
        avatar: "/avatars/1.png",
    },
    {
        id: 2,
        text:
            "The graphic design work was on point. From thumbnails to social media creatives, everything looked professional and consistent.",
        name: "Rohan Mehta",
        role: "Marketing Manager",
        avatar: "/avatars/2.png",
    },
    {
        id: 3,
        text:
            "They built our website exactly the way we imagined. Smooth UI, fast load times, and very responsive on changes.",
        name: "Ananya Singh",
        role: "Founder, Startup Studio",
        avatar: "/avatars/3.png",
    },
    {
        id: 4,
        text:
            "Our promo videos look much more engaging now. The edits feel premium and we’ve seen better audience retention after posting.",
        name: "Kunal Verma",
        role: "Brand Manager",
        avatar: "/avatars/4.png",
    },
    {
        id: 5,
        text:
            "Great communication and reliable delivery. They handled both design and web updates without any confusion or delays.",
        name: "Nandini Kapoor",
        role: "Operations Lead",
        avatar: "/avatars/5.png",
    },
];


export default function SampleTestimonials() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const i = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(i);
    }, []);

    const prev =
        (index - 1 + testimonials.length) % testimonials.length;
    const next = (index + 1) % testimonials.length;

    return (
        <div className="min-h-screen w-screen flex flex-col relative justify-center items-center lightgreen-noise py-20">

            {/* <div className="w-full overflow-hidden">
                <div className={`relative flex justify-center overflow-hidden items-center w-full`}>
                    <span className={`${anton.className} text-center z-10 text-[clamp(3rem,5vw,5rem)] w-full text-white leading-none mb-10`}>what client say's about our work</span>
                </div>
            </div> */}

            <div className="absolute h-full w-full inset-0 flex gap-5 justify-start ml-10">
                <div className="h-full border border-white/40
        bg-white/15 backdrop-blur-xl w-5"></div>
                <div className="h-full border border-white/40
        bg-white/15 backdrop-blur-xl w-5"></div>
                {/* <div className="h-full border border-white/40
        bg-white/15 backdrop-blur-xl w-35"></div>
                <div className="h-full border border-white/40
        bg-white/15 backdrop-blur-xl w-35"></div>
                <div className="h-full border border-white/40
        bg-white/15 backdrop-blur-xl w-35"></div>
                <div className="h-full border border-white/40
        bg-white/15 backdrop-blur-xl w-35"></div>
                <div className="h-full border border-white/40
        bg-white/15 backdrop-blur-xl w-35"></div> */}
            </div>

            <div className="absolute h-full w-full inset-0 flex flex-col gap-5 mt-10">
                <div className="w-full border border-white/40
        bg-white/15 backdrop-blur-xl h-5"></div>
                <div className="w-full border border-white/40
        bg-white/15 backdrop-blur-xl h-5"></div>
                {/* <div className="h-full border border-white/40
        bg-white/15 backdrop-blur-xl w-35"></div>
                <div className="h-full border border-white/40
        bg-white/15 backdrop-blur-xl w-35"></div>
                <div className="h-full border border-white/40
        bg-white/15 backdrop-blur-xl w-35"></div>
                <div className="h-full border border-white/40
        bg-white/15 backdrop-blur-xl w-35"></div>
                <div className="h-full border border-white/40
        bg-white/15 backdrop-blur-xl w-35"></div> */}
            </div>

            <div className="w-[60%] h-[60vh] bg-white/50 p-1 flex items-center justify-center">
                {/* TEXT */}

                <div className="w-full h-full relative bg-white p-20 flex flex-col items-center">
                    <div className="text-center max-w-2.5xl transition-opacity duration-500">
                        <p className="text-[24px] font-medium text-gray-800">
                            “{testimonials[index].text}”
                        </p>
                        <div className="mt-5">
                            <p className="font-semibold text-gray-900">
                                {testimonials[index].name}
                            </p>
                            <p className="text-sm text-gray-500">
                                {testimonials[index].role}
                            </p>
                        </div>
                    </div>

                    {/* AVATAR RAIL */}
                    {/* AVATAR RAIL */}
                    <div className="absolute bottom-10">
                        <AvatarRail
                            testimonials={testimonials}
                            activeIndex={index}
                            visibleCount={5} // 👈 change to any odd number (3,5,7)
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}

/* FIXED CIRCLE COMPONENT */
function AvatarRail({
    testimonials,
    activeIndex,
    visibleCount = 5,
}: {
    testimonials: Testimonial[];
    activeIndex: number;
    visibleCount: number;
}) {
    if (visibleCount % 2 === 0) {
        throw new Error("visibleCount must be an odd number");
    }

    const half = Math.floor(visibleCount / 2);

    return (
        <div className="relative flex items-center justify-center gap-8 mt-12">
            {Array.from({ length: visibleCount }).map((_, i) => {
                const offset = i - half; // -2 -1 0 +1 +2
                const idx =
                    (activeIndex + offset + testimonials.length) %
                    testimonials.length;

                const distance = Math.abs(offset);

                // decay values
                const scale = 1 - distance * 0.15;
                const opacity = 1 - distance * 0.25;
                const size = 90 * scale;

                return (
                    <div
                        key={i}
                        className="flex items-center justify-center transition-all duration-500"
                        style={{
                            width: size,
                            height: size,
                            transform: `scale(${scale})`,
                            opacity,
                        }}
                    >
                        <div
                            className={`overflow-hidden rounded-full
                ${offset === 0 ? "ring-4 ring-gray-300" : ""}
              `}
                            style={{ width: "100%", height: "100%" }}
                        >
                            <img
                                src={testimonials[idx].avatar}
                                alt=""
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}


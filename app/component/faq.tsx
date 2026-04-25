"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What services does Uplicity offer?",
    a: "We provide end-to-end social media content creation, brand strategy, short-form video production, and digital campaign management. From concept to delivery — we handle the full pipeline.",
  },
  {
    q: "How long does onboarding take?",
    a: "Onboarding is completed within 3–5 business days. We run a brand audit, align on tone-of-voice, and set up your content calendar before the first deliverable ships.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. We operate across multiple time zones and have active clients in India, the UAE, UK, and Southeast Asia. All communication runs asynchronously or via scheduled calls.",
  },
  {
    q: "What platforms do you create content for?",
    a: "Instagram Reels, YouTube Shorts, TikTok, LinkedIn, and X (Twitter). Each format is natively produced — no repurposed crop-and-export.",
  },
  {
    q: "How is pricing structured?",
    a: "Pricing is retainer-based, scoped by output volume and platform count. Custom project quotes are available. Book a discovery call to get a tailored breakdown.",
  },
  {
    q: "Can I own all the produced content?",
    a: "Yes — upon final payment, full IP transfers to you. Raw files, edits, and assets are delivered via cloud link. We retain no usage rights post-handover.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="bg-[#acd3ff] text-black h-full w-screen px-4 md:px-8 py-12 md:py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr] gap-8 md:gap-10 lg:gap-12">

          {/* Left Sidebar */}
          <div className="flex flex-col items-start pr-0 md:pr-8 lg:pr-12 md:mb-0">
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-light text-blue-700 leading-none">
              <span className="text-black/80 font-light text-6xl md:text-7xl lg:text-8xl">FA</span>Q
            </h2>

            {/* Decorative Rings */}

            {/* Additional info on desktop */}
            {/* <p className="text-xs tracking-widest text-blue-700/60 uppercase mt-8 hidden md:block">
              {String(faqs.length).padStart(2, "0")} Questions
            </p> */}

            {/* <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-full border-3 border-blue-700 flex-shrink-0"></div>
              <div className="w-12 h-12 rounded-full border-3 border-blue-700 flex-shrink-0 -ml-6"></div>
              <div className="w-12 h-12 rounded-full border-3 border-blue-700 flex-shrink-0 -ml-6"></div>
            </div> */}
          </div>

          {/* Right Content */}
          <div className="w-full flex flex-col gap-5">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className="bg-white rounded-xl overflow-hidden shadow-sm"
                >
                  {/* Question row */}
                  <button
                    onClick={() => toggle(i)}
                    className="flex items-start md:items-center justify-between gap-4 md:gap-6 w-full py-5 md:py-6 text-left cursor-pointer group hover:bg-gray-50 transition-colors px-4 md:px-6"
                  >
                    {/* Plus/Minus Icon */}
                    <span
                      className={`flex-1 text-sm md:text-base lg:text-lg tracking-wide transition-colors duration-200 ${isOpen ? " text-blue-700" : " text-black"
                        }`}
                    >
                      {faq.q}
                    </span>

                    <div
                      className={`w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-sm flex-shrink-0 transition-all duration-300 font-bold text-lg md:text-xl ${isOpen
                        ? " bg-blue-700 text-white "
                        : "bg-blue-200 "
                        }`}
                    >
                      {isOpen ? "−" : "+"}
                    </div>

                  </button>

                  {/* Answer — animated with grid trick */}
                  {/* Answer */}
                  <div
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "grid-rows-[1fr] opacity-100 " : "grid-rows-[0fr] opacity-0 "
                      }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-4 md:px-6 pb-5 md:pb-6 pt-0 text-xs md:text-sm leading-6 md:leading-7 text-black/70 tracking-wide">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scan-line {
          animation: scan 6s linear infinite;
        }
        @keyframes scan {
          0%   { top: 0%;   opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}

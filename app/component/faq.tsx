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
    <section className="dark:bg-black bg-white dark:text-white text-black min-h-screen w-screen px-6 md:px-15 py-16 md:py-24 relative overflow-hidden">

      {/* Scan-line animation */}
      {/* <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="scan-line absolute left-0 right-0 h-px bg-white/5" />
      </div> */}
      <div className="absolute top-50 -right-50 h-[50%] w-[20%] rotate-45 rounded-4xl bg-black/3 dark:bg-white/3"></div>
      <div className="absolute top-30 -left-80 h-[50%] w-[40%] rotate-55 rounded-4xl bg-black/4 dark:bg-white/3"></div>
      {/* Header */}
      <div className="flex items-end justify-between border-b dark:border-white/10 border-black/10 pb-7 mb-0">
        <div>
          <p className="text-[11px] tracking-[0.25em] dark:text-white/30 text-black/30 uppercase mb-2">
            // system.faq
          </p>
          <h2 className="text-4xl md:text-6xl font-light">
            Frequently asked<br />questions
          </h2>
        </div>
        <span className="text-[11px] tracking-widest dark:text-white/20 text-black/20 pb-1">
          {String(faqs.length).padStart(2, "0")} ENTRIES
        </span>
      </div>

      {/* FAQ list */}
      <div>
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className={`border-t transition-colors duration-200 last:border-b ${isOpen ? "dark:border-white border-black  dark:last:border-white last:border-black " : "dark:border-white/10 border-black/10 dark:last:border-white/10 last:border-black/10"
                }`}
            >
              {/* Question row */}
              <button
                onClick={() => toggle(i)}
                className="flex items-center gap-5 w-full py-6 text-left cursor-pointer group"
              >
                <span
                  className={`text-[11px] tracking-widest min-w-[32px] transition-colors duration-200 ${isOpen ? "dark:text-white text-black" : "dark:text-white/25 text-black/25"
                    }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span
                  className={`flex-1 text-base md:text-lg font-light tracking-wide transition-colors duration-200 ${isOpen ? "dark:text-white text-black" : "dark:text-white/60 text-black/60"
                    }`}
                >
                  {faq.q}
                </span>

                {/* Toggle button */}
                <div
                  className={`w-7 h-7 flex items-center justify-center border text-base flex-shrink-0 transition-all duration-200 ${isOpen
                    ? "dark:border-white dark:bg-white border-black bg-black dark:text-black text-white"
                    : "dark:border-white/20 border-black/20  dark:text-white/30 text-black/30"
                    }`}
                >
                  {isOpen ? "×" : "+"}
                </div>
              </button>

              {/* Answer — animated with grid trick (no JS height calc needed) */}
              <div
                className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
              >
                <div className="overflow-hidden">
                  <div className="flex gap-8 pl-[52px] pb-7">
                    {/* Vertical white bar */}
                    <div className="w-px dark:bg-white bg-black self-stretch flex-shrink-0" />
                    <p className="text-sm leading-7 dark:text-white/45 text-black/45 tracking-wide">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
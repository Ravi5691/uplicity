'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const logos = [
  'Noise',
  'Coca-Cola',
  'Boat',
  'DAT',
  'SWWL',
  'Thermax',
  'Hlon',
  'Mamaearth',
  'Nuego',
  'Royal Enfield',
  'HBK',
  'ITC',
];

export default function InfiniteBandLogo() {
  const band1Ref = useRef<HTMLDivElement>(null);
  const band2Ref = useRef<HTMLDivElement>(null);
  const band3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!band1Ref.current || !band2Ref.current || !band3Ref.current) return;

    // Get the total scroll width for seamless looping
    const band1Width = band1Ref.current.scrollWidth;
    const band2Width = band2Ref.current.scrollWidth;
    const band3Width = band3Ref.current.scrollWidth;

    // Band 1: Moving left to right (LTR)
    gsap.fromTo(
      band1Ref.current,
      { x: -band1Width / 2 },
      {
        x: band1Width / 2,
        duration: 30,
        repeat: -1,
        ease: 'none',
      }
    );

    // Band 2: Moving right to left (RTL)
    gsap.fromTo(
      band2Ref.current,
      { x: band2Width / 2 },
      {
        x: -band2Width / 2,
        duration: 30,
        repeat: -1,
        ease: 'none',
      }
    );

    // Band 3: Moving left to right (LTR)
    gsap.fromTo(
      band3Ref.current,
      { x: -band3Width / 2 },
      {
        x: band3Width / 2,
        duration: 30,
        repeat: -1,
        ease: 'none',
      }
    );
  }, []);

  const LogoBand = ({ logos, isReverse }: { logos: string[]; isReverse: boolean }) => (
    <div className="flex gap-8 whitespace-nowrap">
      {[...logos, ...logos].map((logo, idx) => (
        <div
          key={idx}
          className="text-white/80 text-2xl font-semibold px-6 py-3 border border-white/20 rounded-lg hover:border-white/40 transition-colors"
        >
          {logo}
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative w-full bg-noise flex flex-col items-center justify-center overflow-hidden">
      {/* Gradient fade masks */}
      {/* <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent" />
      </div> */}

      {/* Center content */}
      {/* <div className="relative z-10 text-center mb-20">
        <h1 className="text-white text-5xl font-bold tracking-widest">
          OUR PARTNERS
        </h1>
        <p className="text-white/60 mt-4 text-lg">Infinite Motion Carousel</p>
      </div> */}

      {/* Band 1 - Left to Right */}
      <div className="relative w-full h-24 flex items-center overflow-hidden mb-8">
        <div ref={band1Ref} className="flex gap-8 whitespace-nowrap">
          <LogoBand logos={logos} isReverse={false} />
        </div>
      </div>

      {/* Band 2 - Right to Left */}
      <div className="relative w-full h-24 flex items-center overflow-hidden mb-8">
        <div ref={band2Ref} className="flex gap-8 whitespace-nowrap">
          <LogoBand logos={logos} isReverse={true} />
        </div>
      </div>

      {/* Band 3 - Left to Right */}
      <div className="relative w-full h-24 flex items-center overflow-hidden">
        <div ref={band3Ref} className="flex gap-8 whitespace-nowrap">
          <LogoBand logos={logos} isReverse={false} />
        </div>
      </div>
    </div>
  );
}

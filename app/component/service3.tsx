"use client"
import { Lora, Anton } from "next/font/google";
import { useRef } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const lora = Lora({ subsets: ["latin"], weight: ["400", "700"] });
const anton = Anton({ subsets: ["latin"], weight: ["400"] });

const projects = [
  { id: 1, img: "/webService/1.webp" },
  { id: 2, img: "/webService/2.webp" },
  { id: 3, img: "/webService/3.webp" },
  { id: 4, img: "/webService/4.webp" },
];

export default function Service3() {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -window.innerWidth,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: window.innerWidth,
      behavior: "smooth",
    });
  };

  return (
    <section
      className={`
        ${anton.className}
        relative
        flex
        flex-col
        justify-center
        items-center
        h-[80vh]
        md:h-auto
        w-screen
        overflow-hidden
        text-white
        bg-noise
      `}
    >
      {/* BACKGROUND SVG */}
      <img
        src="topography.svg"
        alt="svg"
        className="absolute inset-0 object-cover w-full h-full invert opacity-10 pointer-events-none md:hidden"
      />

      {/* CENTER CONTENT */}
      <div className="relative z-10 px-4 py-10 text-center text-white/20 border-b-2 border-white/20">
        <h1 className="text-center z-10 text-[clamp(5rem,13vw,13rem)] w-full leading-none scale-y-[0.80] ">
          web development
        </h1>

        <h2
          className={`${anton.className} text-[clamp(2.8rem,1vw,1rem)] leading-none scale-y-[0.50] text-[#ffffffe9]`}
        >
          Custom web development services to build responsive and dynamic websites.
        </h2>
      </div>

      {/* ================= MOBILE WEB SHOWCASE ================= */}
      <div className="relative z-10 w-full h-[60%] mt-8 md:hidden">
        <div
          ref={sliderRef}
          className="
            flex
            w-full
            h-[90%]
            overflow-x-auto
            snap-x snap-mandatory
            scroll-smooth
            no-scrollbar
          "
        >
          {projects.map((p) => (
            <div
              key={p.id}
              className="w-screen h-full shrink-0 snap-center px-4"
            >
              <div className="relative h-full w-full overflow-hidden border border-white/50">
                <img
                  src={p.img}
                  alt=""
                  className="h-[50%] w-full object-cover"
                />

                <div className="h-[20%] w-full grid grid-cols-3 gap-1">
                  <div className="bg-amber-200" />
                  <div className="bg-amber-200" />
                  <div className="bg-amber-200" />
                </div>

                <div className="h-[30%] p-4 bg-black/80 backdrop-blur-md text-[12px]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam neque unde doloribus amet quo illum nulla eos hic consequatur sit vitae molestias, ducimus maxime sapiente saepe earum facilis fuga nobis.
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= ARROW CONTROLS ================= */}
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-6">
          <button
            onClick={scrollLeft}
            className="
              h-12 w-12
              rounded-full
              flex items-center justify-center
              bg-white/5
              backdrop-blur-xs
              border border-white/30
              text-white
              active:scale-95
            "
          >
            <IoChevronBack size={22} />
          </button>

          <button
            onClick={scrollRight}
            className="
              h-12 w-12
              rounded-full
              flex items-center justify-center
              bg-white/5
              backdrop-blur-xs
              border border-white/30
              text-white
              active:scale-95
            "
          >
            <IoChevronForward size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}

import { Anton } from "next/font/google";

const anton = Anton({ subsets: ["latin"], weight: ["400"] });
export default function GraphicSection() {

    const project = [
        { id: 1, img: "/webService/3.webp" },
        { id: 2, img: "/webService/3.webp" },
        { id: 3, img: "/webService/3.webp" },
        { id: 4, img: "/webService/3.webp" },
        { id: 5, img: "/webService/3.webp" },
        { id: 6, img: "/webService/3.webp" },
        { id: 7, img: "/webService/3.webp" },
        { id: 8, img: "/webService/3.webp" },
        { id: 9, img: "/webService/3.webp" },
        { id: 10, img: "/webService/3.webp" },
        { id: 11, img: "/webService/3.webp" },
    ];

    const ASPECTS = [
        "aspect-[3/4]",
        "aspect-[4/5]",
        "aspect-[1/1]",
        "aspect-[5/4]",
    ];


    return (
        <div className="bg-noise p-10 flex flex-col w-screen items-center max-w-8xl">
            <div className="relative flex justify-between items-center ">
                <span
                    className={`
              ${anton.className}
              text-center z-10 text-[clamp(5rem,13vw,13rem)] w-full leading-none scale-y-[0.80] text-white/20
            `}
                >
                    graphic
                </span>
                <div className="h-50 w-full overflow-hidden">
                    <img src="/media/ui-5.jpg" className="object-cover"></img>
                </div>
                <span
                    className={`
              ${anton.className}
              text-center z-10 text-[clamp(5rem,13vw,13rem)] w-full leading-none scale-y-[0.80] text-white/20
            `}
                >
                    design
                </span>
            </div>
            <h2
                className={`${anton.className} text-[clamp(2.8rem,1vw,1rem)] leading-none scale-y-[0.50] pb-10 border-b-2 border-white/20 text-[#ffffffe9]`}
            >
                Custom web development services to build responsive and dynamic websites.
            </h2>

            <div className="w-full relative p-10 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8">
                {project.map((p, i) => (
                    <div
                        key={p.id}
                        className="mb-8 break-inside-avoid lightgreen-noise rounded-2xl overflow-hidden group"
                    >
                        <div className={`w-full overflow-hidden ${ASPECTS[i % ASPECTS.length]}`}>
                            <img
                                src={p.img}
                                alt=""
                                className="
          w-full h-full object-cover
          transition-transform duration-700 ease-out
          group-hover:scale-110
        "
                            />
                        </div>
                    </div>
                ))}
                <div className="absolute right-5 bottom-0 max-w-xl text-white italic">
                    <span className="text-red-500">&quot;</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. <span className="italic">Fugit eligendi nostrum nemo suscipit recusandae! Tenetur accusamus officia illum quibusdam iste!</span> Iste doloribus maxime voluptatibus mollitia, cum cumque amet numquam quibusdam.<span className="text-red-500">&quot;</span>
                </div>
            </div>
        </div>
    )
}
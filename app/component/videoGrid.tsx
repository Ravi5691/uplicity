import { Inter } from "next/font/google"
import { Poppins } from "next/font/google";
import { Lato } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

export default function VideoGrid() {
    return (
        <div className="md:min-h-screen w-screen md:p-10 p-5 z-20">
            <div className="md:grid md:grid-cols-[1.5fr_1fr] flex flex-col md:gap-10 gap-4 w-full h-full">
                <div className="md:grid md:grid-rows-[2fr_1fr] flex flex-col md:gap-10 gap-4">
                    <div className="bg-[#ffffff] md:h-110 md:w-auto h-50 overflow-hidden">
                        {/* <video
                            src="/videoService/2.mp4"
                            controls
                            muted
                            className="w-full h-full object-cover"
                        /> */}
                    </div>
                    <div className="grid md:grid-cols-[1fr_1fr_2fr] md:gap-10 gap-4">
                        <div className="md:hidden grid grid-cols-2 gap-4 h-30">
                            <div className="bg-[#ffffff] overflow-hidden">
                                <video
                                src="/videoService/4.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                            </div>
                            <div className="bg-[#ffffff] overflow-hidden">
                                <video
                                src="/videoService/4.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                            </div>
                        </div>
                        <div className="bg-[#FDFFD4] md:block hidden h-54">
                            <video
                                src="/videoService/4.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="bg-[#FDFFD4] md:block hidden h-54">
                            <video
                                src="/videoService/4.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className={`${inter.className} text-justify md:text-base text-sm`}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum repudiandae laudantium ratione totam, cum doloribus blanditiis odit eaque aliquam, facilis dolores provident natus voluptate accusamus modi dicta facere. Tempore, dolorem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam doloremque, sequi consequatur reiciendis, eveniet consequuntur laboriosam explicabo cumque</div>
                    </div>
                </div>
                <div className={`${inter.className} md:grid md:grid-rows-2 flex flex-col-reverse  md:gap-10 gap-4 text-justify `}>
                    <div className=" md:text-base text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis blanditiis dicta facilis officia atque. Recusandae earum dolor repellat enim, labore unde neque nam rem cum ad magni voluptate! Quidem, aliquam.
                        Quidem veritatis non, nobis atque reprehenderit ea aperiam quisquam dolores, nisi maiores asperiores adipisci magnam nihil? Deleniti autem, a quae sequi alias sint, eveniet eius non in nam hic sed!
                        Facere molestias debitis voluptatem sint qui dicta perferendis at facilis asperiores corporis in magnam doloribus ipsa cumque, explicabo fugit repellat sed? Natus, voluptatibus vitae corrupti repellat ipsum amet quia adipisci? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, voluptatem atque itaque ex rem iusto iste dolore assumenda beatae modi illo reiciendis expedita explicabo necessitatibus quos sit. Quod, modi dolores.</div>
                    <div className="bg-[#ffffff] md:h-auto h-50 overflow-hidden">
                        {/* <video
                            src="/videoService/1.mp4"
                            controls
                            muted
                            className="w-full h-full object-cover"
                        /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
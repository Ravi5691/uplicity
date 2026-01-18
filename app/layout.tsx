import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "./navbar/page"
import Footer from "./footer/page"
import SmoothScroll from "./component/smoothScroll"
import Intro from "./component/intro"
import Background from "./component/backGround";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Creative Digital Agency for Video, Design & Web",
  description: "A social media agency specializing in video editing, graphic design, and web solutions that boost engagement, build brands, and drive growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden scrollbar-hidden`}
      >
        <SmoothScroll/>
        {/* <div className="fixed left-3 -bottom-50 opacity-50  z-100 h-[450px] w-[50px]">
          <img src="/obj2.png" alt="obj1" className="scale-50 rotate-y-180" />
        </div>
        <Intro/> */}
        <Background/>
        <header className="fixed md:min-w-7xl z-50 md:left-1/2 md:-translate-x-1/2 "><Navbar/></header>
        <main>{children}</main>
        <footer><Footer/></footer>
      </body>
    </html>
  );
}


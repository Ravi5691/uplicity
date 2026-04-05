import type { Metadata } from "next";
import "./globals.css"
import Navbar from "./navbar/navbar1"
import Footer from "./footer/page"
import SmoothScroll from "./component/smoothScroll"
import Providers from "@/providers/provider";
import NewNavbar from "./navbar/page";


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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased overflow-x-hidden scrollbar-hidden`}
      >
        <Providers>
          <SmoothScroll/>
          <header className="fixed md:min-w-7xl z-50 md:left-1/2 md:-translate-x-1/2 "><NewNavbar/></header>
          <main>{children}</main>
          <footer><Footer/></footer>
        </Providers>
      </body>
    </html>
  );
}


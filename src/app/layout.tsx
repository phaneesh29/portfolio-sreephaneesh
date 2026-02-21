import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/Navbar";
import StarCanvas from "@/components/StarCanvas";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sreephaneesha Kanugovi | Full Stack Developer",
  description: "Portfolio of Sreephaneesha Kanugovi, a Full Stack Developer and AI/ML Enthusiast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white antialiased overflow-x-hidden`}>
        <StarCanvas />
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

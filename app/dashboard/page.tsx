"use client";

import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import NavbarDemo from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Team() {

  return (
    <main className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center">
      <StarsBackground />
      <ShootingStars />
      <div className="z-10 w-full max-w-5xl text-center p-3 md:p-12 mt-12">
        <NavbarDemo />
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 mt-12">
          dASHBOARD YAY
        </h1>
      </div>
      <div className="my-12"></div>
      <Footer />
    </main>
  );
}

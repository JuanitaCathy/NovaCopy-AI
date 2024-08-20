"use client";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import NavbarDemo from "@/components/Header";

export default function Pricing() {
  return (
  <main className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* Background Effects */}
      <StarsBackground />
      <ShootingStars />
      <div className="z-10 w-full max-w-5xl text-center p-4 md:p-24 mt-24 md:mt-32">
        <NavbarDemo />
      <h1 className="text-4xl md:text-5xl font-bold mb-12 mt-12">Pricing</h1>
      </div>
    </main>
    )
}

"use client";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import NavbarDemo from "@/components/Header";
import Footer from "@/components/Footer";

export default function Onboarding() {
  return (
    <main className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* Background Effects */}
      <StarsBackground />
      <ShootingStars />
      <div className="z-10 w-full max-w-5xl text-center p-4 md:p-24 mt-24 md:mt-32">
        <NavbarDemo />
      </div>
      <div data-tf-live="01J6NXBJW1V0V5KGNF1AD99YSD"></div>
      <script src="//embed.typeform.com/next/embed.js"></script>
      <Footer />
    </main>
  );
}

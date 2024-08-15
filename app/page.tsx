import dynamic from "next/dynamic";
import NavbarDemo from "@/components/Header";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import ShiningButton from "@/components/ui/ShiningButton";

const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

export default function Home() {
  const words = [
    { text: "High-Quality Content ", className: "text-pink font-cursive" },
    { text: "Words That Work ", className: "text-pink font-cursive" },
    { text: "Time-Saving Copy ", className: "text-pink font-cursive" },
    { text: "Magic ", className: "text-pink font-cursive" },
    { text: "Your Future ", className: "text-pink font-cursive" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <StarsBackground />
      <ShootingStars />
      <Scene />

      <div className="z-10 w-full max-w-5xl text-center absolute inset-0 flex flex-col items-center justify-center p-24">
        <NavbarDemo />
        <h1 className="text-5xl font-bold mt-10">
          Tired of Spending Hours Writing Content?
        </h1>
        <div className="flex items-center justify-center mt-8">
          <span className="text-5xl font-semibold">Write </span>
          <div className="ml-6">
            <TypewriterEffect
              words={words}
              className="text-5xl"
              cursorClassName="ml-2"
              wordClassName="text-pink font-cursive"
              typingSpeed={150}
            />
          </div>
        </div>
        <div className="mt-16">
          <ShiningButton />
        </div>
      </div>
    </main>
  );
}

"use client";

import { useEffect } from "react";
import gsap from "gsap";
import NavbarDemo from "@/components/Header";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import ShiningButton from "@/components/ui/ShiningButton";
import { HoverEffect } from "@/components/ui/card-hover-effect";

export default function Home() {
  const words = [
    { text: "High-Quality Content ", className: "text-pink font-cursive" },
    { text: "Words That Work ", className: "text-pink font-cursive" },
    { text: "Time-Saving Copy ", className: "text-pink font-cursive" },
    { text: "Magic ", className: "text-pink font-cursive" },
    { text: "Your Future ", className: "text-pink font-cursive" },
  ];

  // Features Data
  const features = [
    {
      title: "AI Content Wizard",
      description:
        "Generate high-quality and personalised content tailored to your brand and audience.",
      link: "#feature-one",
    },
    {
      title: "Email & Ad Magic",
      description: "Create persuasive emails and ads that convert.",
      link: "#feature-two",
    },
    {
      title: "Copywriting Coach",
      description: "Get expert guidance on writing styles and techniques.",
      link: "#feature-three",
    },
    {
      title: "SEO Supercharger",
      description: "Optimize content for search engines and boost visibility.",
      link: "#feature-four",
    },
    {
      title: "Grammar Guardian",
      description: "Ensure flawless grammar and style in every piece.",
      link: "#feature-five",
    },
    {
      title: "Content Insights",
      description: "Understand your audience and refine your content strategy.",
      link: "#feature-six",
    },
    {
      title: "Idea Incubator",
      description: "Spark creativity with fresh content ideas.",
      link: "#feature-seven",
    },
    {
      title: "Performance Analyzer",
      description: "Track content success and optimize for better results.",
      link: "#feature-eight",
    },
    // Add more features as needed
  ];

  return (
    <main className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* Background Effects */}
      <StarsBackground />
      <ShootingStars />

      <div className="z-10 w-full max-w-5xl text-center p-24">
        <NavbarDemo />
        <h1 className="text-5xl font-bold mb-12 mt-12">
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
        <div className="mt-24">
          <ShiningButton />
        </div>
      </div>

      {/* Features Section */}
      <section className="w-full max-w-5xl py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Features</h2>
        <HoverEffect items={features} />
      </section>
    </main>
  );
}

"use client";

import NavbarDemo from "@/components/Header";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import ShiningButton from "@/components/ui/ShiningButton";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import dynamic from "next/dynamic";
import "./globals.css";
import Footer from "../components/Footer";
import FAQSection from "@/components/FAQ";
import { Badge } from "@/components/ui/Launch";
import { InfiniteMovingCardsDemo } from "@/components/HypeScroll";

const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

export default function Home() {
  // const words = [
  //   { text: "High-Quality Content", emoji: "💡" },
  //   { text: "Words That Work", emoji: "🎯" },
  //   { text: "Time-Saving Copy", emoji: "⏳" },
  //   { text: "Magic", emoji: "🪄" },
  //   { text: "Your Future", emoji: "🔮" },
  // ];

  // Features Data
  const features = [
    {
      // title: "AI Content Wizard 🧙‍♂️",
      title: "AI Content Wizard",
      icon: "fa-solid fa-hat-wizard",
      description:
        "Generate high-quality and personalised content tailored to your brand and audience.",
      link: "#feature-one",
    },
    {
      // title: "Email & Ad Magic 🪄",
      title: "Email & Ad Magic",
      icon: "fa-solid fa-wand-magic-sparkles",
      description: "Create persuasive emails and ads that convert.",
      link: "#feature-two",
    },
    {
      // title: "Copywriting Coach 🚨",
      title: "Copywriting Coach",
      icon: "fa-solid fa-chalkboard-user",
      description: "Get expert guidance on writing styles and techniques.",
      link: "#feature-three",
    },
    {
      // title: "SEO Supercharger 🔋",
      title: "SEO Supercharger",
      icon: "fa-solid fa-bolt",
      description: "Optimize content for search engines and boost visibility.",
      link: "#feature-four",
    },
    {
      // title: "Grammar Guardian 🛟",
      title: "Grammar Guardian",
      icon: "fa-solid fa-life-ring",
      description: "Ensure flawless grammar and style in every piece.",
      link: "#feature-five",
    },
    {
      // title: "Content Insights 🎯",
      title: "Content Insights",
      icon: "fa-solid fa-bullseye",
      description: "Understand your audience and refine your content strategy.",
      link: "#feature-six",
    },
    {
      // title: "Idea Incubator 💡",
      title: "Idea Incubator",
      icon: "fa-solid fa-lightbulb",
      description: "Spark creativity with fresh content ideas.",
      link: "#feature-seven",
    },
    {
      // title: "Performance Analyzer 💪",
      title: "Performance Analyzer",
      icon: "fa-solid fa-magnifying-glass-chart",
      description: "Track content success and optimize for better results.",
      link: "#feature-eight",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center">
      <StarsBackground />
      <ShootingStars />

      <div className="relative h-screen pt-20 flex flex-col">
        <NavbarDemo />
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4 md:p-6">
          <Badge text={"We are launching soon ✨"} />
          <h1 className="text-4xl md:text-6xl mb-7 font-bold">
            <span className="bg-gradient-to-t from-gray-400 to-white bg-clip-text text-transparent">
              Tired of Slow Content Creation?
            </span>
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center md: mt-2 mb-8">
            <span className="text-3xl md:text-4xl font-semibold bg-gradient-to-t from-gray-400 to-white bg-clip-text text-transparent">
              Write
            </span>
            <div className="mt-4 md:mt-0 md:ml-6">
              <TypewriterEffect
                words={[
                  { text: "High-Quality Content", emoji: "💡" },
                  { text: "Words That Work", emoji: "🎯" },
                  { text: "Time-Saving Copy", emoji: "⏳" },
                  { text: "Magic", emoji: "🪄" },
                  { text: "Your Future", emoji: "🔮" },
                ]}
                className="text-4xl md:text-4xl"
                cursorClassName="ml-2"
                textClassName="gradient-text"
              />
            </div>
          </div>
          <div className="text-sm md:text-lg mb-6 px-4 sm:px-6 lg:px-9 text-gray-300">
            <p className="mb-2 break-words">
              We’ve got you! With our AI technology, generate
            </p>
            <p className="break-words">
              tailor-made copy that will make your business skyrocket.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
            <button
              className="inline-flex items-center gap-2 border border-white/16 px-6 py-2 md:px-8 md:py-3 h-auto rounded-xl text-sm md:text-base font-semibold"
              onClick={() =>
                (window.location.href = "https://www.novacopyai.xyz/services")
              }
            >
              <span className="font-semibold">Explore Services!</span>
            </button>

            <ShiningButton />
          </div>
        </div>
      </div>

      <section
        className="relative w-full max-w-6xl py-16 px-4 mt-24 flex flex-col md:flex-row items-center md:items-start"
        style={{ transform: "translateX(12px)" }}
      >
        <div className="md:w-1/2 text-left">
          <h2 className="text-2xl md:text-4xl font-bold mb-8">
            Your <span className="gradient-text">Content</span>, Your Way,
            Faster <span className="gradient-text">! </span>
          </h2>
          <p className="text-base md:text-lg mb-4">
            We&apos;ve all been there—staring at a blank screen, waiting for
            that perfect idea to strike, or scrambling to fill up a content
            calendar with something fresh and engaging. It&apos;s tough, right?
            You&apos;re not alone in this struggle.
          </p>
          <p className="text-base md:text-lg mb-4">
            At NovaCopy AI, we get it. We&apos;ve felt that same pressure to
            deliver top-notch content, often under tight deadlines. That&apos;s
            exactly why we created Nova AI. Not just another tool, but a
            creative partner that understands your needs.
          </p>
          <p className="text-base md:text-lg mb-4">
            Nova AI is here to help you take back control of your content.
            It&apos;s not about replacing you—it&apos;s about working with you.
            Together, you&apos;ll breeze through those drafts, meet deadlines
            with ease, and give your brand the voice it deserves.
          </p>
          <p className="text-base md:text-lg mb-4">
            Ready to make content creation a whole lot easier? Come join our
            waitlist and be one of the first to see how we&apos;re changing the
            game.
          </p>
          <div className="mt-4 md:mt-14">
            <ShiningButton />
          </div>
        </div>
        <div className="w-full md:w-2/3 lg:w-3/4 full-screen-container">
          <Scene />
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-6xl py-8 md:py-16 px-4 z-0">
        <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center">
          Our <span className="gradient-text">Features</span>
        </h2>
        <HoverEffect items={features} />
      </section>

      <div className="my-8 md:my-16"></div>

      <section>
        <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center">
          Join the <span className="gradient-text">hype!</span>
        </h2>
        <InfiniteMovingCardsDemo />
      </section>

      <div className="my-8 md:my-16"></div>

      <section>
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Frequently asked <span className="gradient-text">Questions!</span>
        </h2>
        <FAQSection />
      </section>

      <div className="my-8 md:my-16"></div>

      <Footer />
    </main>
  );
}

"use client";

import { useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import NavbarDemo from "@/components/Header";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import ShiningButton from "@/components/ui/ShiningButton";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import ScrollVelocityText from "@/components/ui/ScrollVelocityText";
import dynamic from "next/dynamic";
import "./globals.css"; 
import logo from "@/public/NovaCopy_8.webp"; 
import Footer from "../components/Footer";
import FAQSection from "@/components/FAQ";
import MuiAccordion from "@/components/FAQ";

const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

export default function Home() {
  const words = [
    { text: "High-Quality Content 💡 ", className: "text-pink" },
    { text: "Words That Work 🎯 ", className: "text-pink" },
    { text: "Time-Saving Copy ⏳ ", className: "text-pink" },
    { text: "Magic 🪄", className: "text-pink" },
    { text: "Your Future 🔮", className: "text-pink" },
  ];

  // Features Data
  const features = [
    {
      title: "AI Content Wizard 🧙‍♂️",
      description:
        "Generate high-quality and personalised content tailored to your brand and audience.",
      link: "#feature-one",
    },
    {
      title: "Email & Ad Magic 🪄",
      description: "Create persuasive emails and ads that convert.",
      link: "#feature-two",
    },
    {
      title: "Copywriting Coach 🚨",
      description: "Get expert guidance on writing styles and techniques.",
      link: "#feature-three",
    },
    {
      title: "SEO Supercharger 🔋",
      description: "Optimize content for search engines and boost visibility.",
      link: "#feature-four",
    },
    {
      title: "Grammar Guardian 🛟",
      description: "Ensure flawless grammar and style in every piece.",
      link: "#feature-five",
    },
    {
      title: "Content Insights 🎯",
      description: "Understand your audience and refine your content strategy.",
      link: "#feature-six",
    },
    {
      title: "Idea Incubator 💡",
      description: "Spark creativity with fresh content ideas.",
      link: "#feature-seven",
    },
    {
      title: "Performance Analyzer 💪",
      description: "Track content success and optimize for better results.",
      link: "#feature-eight",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center py-4">
      {/* Background Effects */}
      <StarsBackground />
      <ShootingStars />

      <div className="z-10 w-full max-w-5xl text-center p-4 md:p-6 mt-12 md:mt-24"> 
        <NavbarDemo />
        <div className="flex justify-center mb-6">
          <Image src={logo} alt="NovaCopy Logo" width={200} height={170} />
        </div>
        {/* <h1 className="text-3xl md:text-5xl font-bold mb-6">
          Tired of Spending Hours Writing Content?
        </h1> */}
        {/* <h1 className="text-3xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-[radial-gradient(circle,_rgba(255,255,255,0.8),_rgba(255,105,180,0.5))]">
          Tired of Spending Hours Writing Content?
        </h1> */}
        <h1 className="text-3xl md:text-5xl mb-6 font-bold text-transparent bg-clip-text bg-[linear-gradient(to_bottom,_rgba(255,255,255,0.8),_rgba(237,73,153,0.8))]">
          Tired of Spending Hours Writing Content?
        </h1>


        <div className="flex flex-col md:flex-row items-center justify-center mb-8">
          <span className="text-4xl md:text-4xl font-semibold">Write </span>
          <div className="mt-4 md:mt-0 md:ml-6">
            <TypewriterEffect
              words={words}
              className="text-4xl md:text-4xl"
              cursorClassName="ml-2"
              wordClassName="text-pink font-cursive"
              typingSpeed={150}
            />
          </div>
        </div>
        <div className="text-lg md:text-xl mb-6">
          <p>Well, we got you! At NovaCopy, we provide high-quality, customized copy that fits your brand, saving you time and effort.</p>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-4">
          <button className="inline-flex items-center gap-2 border border-white/16 px-6 h-15.5 rounded-xl"> 
            <span className="font-semibold">Explore Services!</span>
          </button>
          <ShiningButton />
        </div>
      </div>


      {/* Spacing between sections */}
      <div className="my-8 md:my-16"></div>

      {/* Scrolling Text */}
      <section>
        <ScrollVelocityText />
      </section>

      {/* Spacing between sections */}
      <div className="my-8 md:my-3"></div>

      {/* Sticky Animation Section */}
      <section className="relative w-full max-w-5xl py-16 px-4 mt-24 flex flex-col md:flex-row items-center md:items-start">
        <div className="md:w-1/2 text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Your <span className="text-pink">Content</span>, Your Way, Faster <span className="text-pink">! </span>
          </h2>
          <p className="text-base md:text-lg mb-4">
            We’ve all been there—staring at a blank screen, waiting for that
            perfect idea to strike, or scrambling to fill up a content calendar
            with something fresh and engaging. It's tough, right? You're not
            alone in this struggle.
          </p>
          <p className="text-base md:text-lg mb-4">
            At NovaCopy AI, we get it. We've felt that same pressure to deliver
            top-notch content, often under tight deadlines. That’s exactly why
            we created Nova AI. Not just another tool, but a creative partner
            that understands your needs.
          </p>
          <p className="text-base md:text-lg mb-4">
            Nova AI is here to help you take back control of your content. It’s
            not about replacing you—it's about working with you. Together,
            you’ll breeze through those drafts, meet deadlines with ease, and
            give your brand the voice it deserves.
          </p>
          <p className="text-base md:text-lg mb-4">
            Ready to make content creation a whole lot easier? Come join our
            waitlist and be one of the first to see how we’re changing the game.
          </p>
          <div className="mt-2 md:mt-14">
            <ShiningButton />
          </div>
        </div>
        <div className="md:w-1/2 full-screen-container">
          <Scene />
        </div>
      </section>


      {/* Spacing between sections */}
      <div className="my-8 md:my-3"></div>

      {/* Features Section */}
      <section className="w-full max-w-5xl py-8 md:py-16 px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Our <span className="text-pink">Features</span>
        </h2>
        <HoverEffect items={features} />
      </section>

      <div className="my-8 md:my-3"></div>

      <section>
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Commonly asked <span className="text-pink">FAQs!</span>
        </h2>
        <FAQSection />
      </section>


      <div className="my-8 md:my-16"></div>

      <Footer />
    </main>
  );
}

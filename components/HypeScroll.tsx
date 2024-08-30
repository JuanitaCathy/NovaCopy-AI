"use client";

import React from "react";
import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[25rem] rounded-md flex flex-col antialiased bg-white dark:bg-transparent dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards items={hypeTexts} direction="right" speed="slow" />
    </div>
  );
}

const hypeTexts = [
  {
    quote:
      "I'm so excited for the launch! This platform is going to revolutionize how I create content. I've been looking for a tool like this for ages, and NovaCopy is exactly what I've been needing to elevate my work!",
    name: "Arshiya",
    title: "Agency Owner",
    profilePic: "Arshiya.jpg",
  },
  {
    quote:
      "Super excited to see what NovaCopy will bring to the table! It's going to be a game changer. I’ve tried so many tools, but nothing compares to what NovaCopy promises to deliver!",
    name: "Alex",
    title: "Technical Blogger",
    profilePic: "alex.jpg",
  },

  {
    quote:
      "NovaCopy seems really interesting! It's exactly what I’ve been looking for to streamline my work. The features sound amazing, and I’m excited to dive in and see how it can improve my workflow.",
    name: "Kathrine",
    title: "Content Creator",
    profilePic: "Kathrine.jpg",
  },

  {
    quote:
      "Finally, something to make content creation fun and easy! NovaCopy is what every writer needs. I’m thrilled to be part of this journey and can’t wait to explore all the possibilities!",
    name: "Michael",
    title: "Blogger",
    profilePic: "Michael.jpg",
  },

  {
    quote:
      "Looking forward to trying out NovaCopy. The hype is real, and I can't wait to see it in action! With all the buzz around it, I know this is going to be a must-have tool for content creators everywhere.",
    name: "Sylvie",
    title: "Content Creator",
    profilePic: "Sylvie.jpg",
  },
];

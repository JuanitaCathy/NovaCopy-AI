"use client";

import React from "react";
import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[25rem] rounded-md flex flex-col antialiased bg-white dark:bg-transparent dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={hypeTexts}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const hypeTexts = [
  {
    quote: "Can't wait for the launch! This platform is going to change the way I create content! I've been searching for a tool like this forever, and NovaCopy is exactly what I need to take my work to the next level!",
    name: "Farheen",
    title: "Excited User",
    profilePic: "farheen.jpg",
  },

  {
    quote: "Super excited to see what NovaCopy will bring to the table! It's going to be a game changer. I’ve tried so many tools, but nothing compares to what NovaCopy promises to deliver!",
    name: "Juanita",
    title: "Technical Blogger",
    profilePic: "juanita.jpeg",
  },

  {
    quote: "NovaCopy seems really interesting! It's exactly what I’ve been looking for to streamline my work. The features sound amazing, and I’m excited to dive in and see how it can improve my workflow.",
    name: "Cindy",
    title: "Content Creator",
    profilePic: "cindy.jpeg",
  },

  {
    quote: "Finally, something to make content creation fun and easy! NovaCopy is what every writer needs. I’m thrilled to be part of this journey and can’t wait to explore all the possibilities!",
    name: "Otter",
    title: "Blogger - Otter Diaries",
    profilePic: "otter.png",
  },

  {
    quote: "Looking forward to trying out NovaCopy. The hype is real, and I can't wait to see it in action! With all the buzz around it, I know this is going to be a must-have tool for content creators everywhere.",
    name: "Miho",
    title: "Content Creator",
    profilePic: "miho.jpeg",
  },
];
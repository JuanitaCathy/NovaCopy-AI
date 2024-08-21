"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

const SubmitButton: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  useEffect(() => {
    const button = buttonRef.current;
    if (button) {
      gsap.fromTo(
        button,
        {
          boxShadow: "0 0 0 rgba(255, 133, 241, 0.8)",
          scale: 1,
        },
        {
          boxShadow: "0 0 25px rgba(255, 133, 241, 1)", // Increased glow intensity
          scale: 1.05, // Slight scale effect
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          ease: "power1.inOut",
        }
      );
    }
  }, []);

  const handleClick = () => {
    console.log("submit");

  };

  return (
    <button
      ref={buttonRef}
      className="px-6 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 transition duration-300"
      onClick={handleClick}
    >
      Submit
    </button>
  );
};

export default SubmitButton;

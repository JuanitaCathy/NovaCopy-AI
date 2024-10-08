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

  return (
    <button
      type="submit"
      ref={buttonRef}
      className="px-6 py-3 gradient-button text-white font-semibold rounded-lg shadow-md transition duration-300"
    >
      Submit
    </button>
  );
};

export default SubmitButton;

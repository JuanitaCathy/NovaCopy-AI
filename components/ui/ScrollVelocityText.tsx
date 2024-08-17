import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function ScrollVelocityText() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const speed = 100; // Adjust the speed of the scroll here

    if (container) {
      const content = container.querySelector(
        ".scroll-content"
      ) as HTMLDivElement;

      // Duplicate the content to create a seamless loop
      const duplicateContent = content?.cloneNode(true) as HTMLDivElement;
      if (duplicateContent) {
        container.appendChild(duplicateContent);
      }

      gsap.to([content, duplicateContent], {
        xPercent: -100,
        repeat: -1,
        ease: "linear",
        duration: speed,
      });
    }
  }, []);

  return (
    <div
      className="scroll-container"
      ref={containerRef}
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        position: "relative",
        width: "100%",
        background: "rgba(255, 133, 241, 0.4)",
        padding: "1rem 0",
      }}
    >
      <div
        className="scroll-content"
        style={{
          display: "inline-block",
          fontSize: "2rem",
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        {Array(10)
          .fill(
            "Skyrocket 🚀 your business with high-converting content & time-saving copy ⌚"
          )
          .join(" — ")}
      </div>
    </div>
  );
}

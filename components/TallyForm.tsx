"use client"
import React, { useEffect } from "react";

const TallyForm: React.FC = () => {
  useEffect(() => {
    // Load Tally widget script
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      {" "}
      {/* Full screen height */}
      <iframe
        data-tally-src="https://tally.so/r/wML9NM?transparentBackground=1"
        width="100%"
        height="100%"
        title="Onboarding Form"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          border: "none",
          backgroundColor: "transparent",
          overflow: "hidden",
        }}
      ></iframe>
    </div>
  );
};

export default TallyForm;

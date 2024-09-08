import React, { useEffect } from "react";

declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

const FeedbackForm: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    script.onload = () => {
      if (window.Tally) {
        window.Tally.loadEmbeds();
      } else {
        document
          .querySelectorAll("iframe[data-tally-src]:not([src])")
          .forEach((element) => {
            const iframe = element as HTMLIFrameElement;
            iframe.src = iframe.dataset.tallySrc || "";
          });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full h-full">
      <iframe
        data-tally-src="https://tally.so/embed/mZY6GB?transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="80%"
        height="100%"
        style={{
          position: "absolute",
          top: 25,
          right: 0,
          bottom: 25,
          left: 150,
          border: "none",
          backgroundColor: "transparent",
          overflow: "hidden",
        }}
        title="Feedback Form"
      ></iframe>
    </div>
  );
};

export default FeedbackForm;

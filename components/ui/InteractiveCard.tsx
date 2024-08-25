import React from "react";

interface InteractiveCardProps {
  title: string;
  content: string;
  buttonText: string;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({
  title,
  content,
  buttonText,
}) => {
  return (
    <div className="interactive-card">
      <div className="card-content">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base mb-8">
          We&apos;ve all been there—staring at a blank screen, waiting for that
          perfect idea to strike, or scrambling to fill up a content calendar
          with something fresh and engaging. It&apos;s tough, right? You're not alone
          in this struggle.
          <br />
          <br />
          At NovaCopy AI, we get it. We&apos;ve felt that same pressure to deliver
          top-notch content, often under tight deadlines. That&apos;s exactly why we
          created Nova AI. Not just another tool, but a creative partner that
          understands your needs.
          <br />
          <br />
          Nova AI is here to help you take back control of your content. It&apos;s
          not about replacing you—it&apos;s about working with you. Together, you&apos;ll
          breeze through those drafts, meet deadlines with ease, and give your
          brand the voice it deserves.
          <br />
          <br />
          Ready to make content creation a whole lot easier? Come join our
          waitlist and be one of the first to see how we&apos;re changing the game.
        </p>
        <button className="bg-pink-500 text-white py-2 px-4 rounded-full glow-on-hover">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default InteractiveCard;

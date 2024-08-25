"use client";

import { useEffect, useState } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
  textClassName,
  typingSpeed = 90,
  pauseDuration = 1000,
}: {
  words: {
    text: string;
    emoji: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
  textClassName?: string;
  typingSpeed?: number;
  pauseDuration?: number;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const { text, emoji } = currentWord;

    const type = () => {
      if (!isDeleting) {
        if (charIndex < text.length) {
          setDisplayedText((prev) => prev + text[charIndex]);
          setCharIndex((prev) => prev + 1);
        } else {
          setShowEmoji(true); // Show emoji when text is fully typed
          setTimeout(() => setIsDeleting(true), 1000); // Wait 1 second before starting deletion
        }
      } else {
        setShowEmoji(false); // Remove emoji immediately when deleting
        if (charIndex > 0) {
          setDisplayedText((prev) => prev.slice(0, -1));
          setCharIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          setCharIndex(0);
          setDisplayedText("");
        }
      }
    };

    const interval = setInterval(type, typingSpeed);

    return () => clearInterval(interval);
  }, [charIndex, isDeleting, currentWordIndex, typingSpeed, words, pauseDuration]);

  const currentWord = words[currentWordIndex];
  const { emoji } = currentWord;

  return (
    <span className={className}>
      <span className={textClassName}>
        {displayedText}
      </span>
      {showEmoji && <span>{emoji}</span>}
      <span className={cursorClassName}>|</span>
    </span>
  );
};

"use client";

import { useEffect, useState } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
  wordClassName,
  typingSpeed = 100,
  pauseDuration = 1000,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
  wordClassName?: string;
  typingSpeed?: number;
  pauseDuration?: number;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex].text;

    const type = () => {
      if (!isDeleting) {
        if (charIndex < currentWord.length) {
          setDisplayedText((prev) => prev + currentWord[charIndex]);
          setCharIndex((prev) => prev + 1);
        } else {
          setIsDeleting(true);
        }
      } else {
        if (charIndex > 0) {
          setDisplayedText((prev) => prev.slice(0, -1));
          setCharIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          setCharIndex(0);
        }
      }
    };

    const interval = setInterval(type, typingSpeed);

    return () => clearInterval(interval);
  }, [charIndex, isDeleting, currentWordIndex, typingSpeed, words]);

  return (
    <span className={className}>
      <span className={wordClassName}>{displayedText}</span>
      <span className={cursorClassName}>|</span>
    </span>
  );
};

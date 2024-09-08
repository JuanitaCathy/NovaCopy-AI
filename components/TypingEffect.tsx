"use client"
import React, { useEffect, useState } from 'react';

interface TypingEffectProps {
  text: string;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(displayedText + text[index]);
        setIndex(index + 1);
      }, 50); // Adjust typing speed here (ms per character)

      return () => clearTimeout(timer);
    }
  }, [index, text, displayedText]);

  return <span>{displayedText}</span>;
};

export default TypingEffect;

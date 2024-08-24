import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function Confetti({ isConfettiActive }: { isConfettiActive: boolean }) {

  useEffect(() => {
    if (isConfettiActive) {
      // Launch confetti from the left
      confetti({
        particleCount: 80,
        startVelocity: 30,
        shapes: ["square", "square", "circle", "star"],
        angle: 60,
        spread: 120,
        origin: { x: 0 },
      });

      // Launch confetti from the right
      confetti({
        particleCount: 80,
        startVelocity: 30,
        shapes: ["square", "square", "circle", "star"],
        angle: 120,
        spread: 120,
        origin: { x: 1 },
      });
    }

  }, [isConfettiActive]);

  return null; // Component doesn't render anything visually
}

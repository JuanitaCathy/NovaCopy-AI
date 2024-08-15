import NavbarDemo from "@/components/Header";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import ShiningButton from "../components/ui/ShiningButton"; // Import the new ShiningButton component

export default function Home() {
  const words = [
    { text: "High-Quality Content ", className: "text-pink font-cursive" },
    { text: "Words That Work ", className: "text-pink font-cursive" },
    { text: "Time-Saving Copy ", className: "text-pink font-cursive" },
    { text: "Magic ", className: "text-pink font-cursive" },
    { text: "Your Future ", className: "text-pink font-cursive" },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl text-center">
        <NavbarDemo />
        <h1 className="text-5xl font-bold mt-10">
          {" "}
          {/* Adjusted spacing */}
          Tired of Spending Hours Writing Content?
        </h1>
        <div className="flex items-center justify-center mt-8">
          {" "}
          {/* Adjusted spacing */}
          <span className="text-5xl font-semibold">Write </span>
          <div className="ml-6">
            <TypewriterEffect
              words={words}
              className="text-5xl"
              cursorClassName="ml-2"
              wordClassName="text-pink font-cursive"
              typingSpeed={150}
            />
          </div>
        </div>
        <div className="mt-16">
          {" "}
          {/* Adjusted spacing */}
          <ShiningButton />
        </div>
      </div>
    </main>
  );
}

"use client";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import BackButton from "@/components/BackButton";
import Image from "next/image";
import OnboardingForm from "@/components/OnboardingForm";

export default function Onboarding() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Effects */}
      <StarsBackground />
      <ShootingStars />

      {/* Back to Homepage Button */}
      <div className="absolute top-7 left-4 z-20">
        <BackButton />
      </div>

      {/* Logo */}
      <div className="absolute top-4 right-6 z-20">
        {" "}
        <Image
          src="/NovaCopy_white_transparent.png"
          alt="Logo"
          width={80}
          height={80}
          className="object-contain"
        />
      </div>

      {/* Tally Form */}
      <div className="flex-grow w-full">
        <OnboardingForm />
      </div>
    </div>
  );
}

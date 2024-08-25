"use client";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import NavbarDemo from "@/components/Header";
import ContactUS from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Contact() {
  return (
    <main className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center">
      <StarsBackground />
      <ShootingStars />
      <div className="z-10 w-full max-w-5xl text-center p-4 md:p-12 md:mb-6 mt-12 md:mt-32">
        <NavbarDemo />
        <ContactUS />
      </div>
      <Footer />
    </main>
  );
}

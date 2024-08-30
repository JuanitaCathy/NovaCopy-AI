"use client";
import { useEffect } from "react";
import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  useAuth,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import NavbarDemo from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <AuthHandler>
    </AuthHandler>
  );
}

function AuthHandler() {
  const { isSignedIn } = useAuth(); // Use useAuth to get the signed-in state
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    // This effect will run whenever the signed-in state changes
    if (isSignedIn) {
      router.push("/home"); // Redirect to the AI Copywriting Assistant home page
    }
  }, [isSignedIn, router]); // Dependency array includes isSignedIn and router

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center">
          {/* Background Effects */}
          <StarsBackground />
          <ShootingStars />
          <div className="w-full px-4">
          <div className="flex justify-between items-center w-full">
            <div className="flex-grow flex justify-center">
              <NavbarDemo />
            </div>
            <div className="ml-4">
            </div>
          </div>
        </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-12 mt-12">
              Welcome to AI Assistant!!
            </h1>
          <Footer />
        </div>
      </SignedIn>
    </>
  );
}

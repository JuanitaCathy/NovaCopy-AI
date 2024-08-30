"use client";
import { useEffect } from "react";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  useAuth,
} from "@clerk/nextjs";
import HeaderUser from "@/components/ui/UserHeader";
import { useRouter } from "next/navigation";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import NavbarDemo from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <AuthHandler>{children}</AuthHandler>
    </ClerkProvider>
  );
}

function AuthHandler({ children }: { children: React.ReactNode }) {
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
          {/* <div className="z-10 w-full max-w-5xl text-center p-4 md:p-24 mt-24 md:mt-32"> */}
          <div className="w-full px-4">
          <div className="flex justify-between items-center w-full">
            <div className="flex-grow flex justify-center">
              <NavbarDemo />
              <HeaderUser />
            </div>
            <div className="ml-4">
            </div>
          </div>
        </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-12 mt-12">
              Welcome to AI Assistant!!
            </h1>
          {/* </div> */}
          <Footer />
        </div>
      </SignedIn>
    </>
  );
}

"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import SignedInContent from "@/components/SignedInContent";
import SignedOutContent from "@/components/SignedOutContent";
import SignedUpContent from "@/components/SignedUpContent";
import "./globals.css";

export default function Home() {
  return (
    <>
      <SignedIn>
        <SignedUpContent /> {/* Handles redirect if user needs onboarding */}
        <SignedInContent /> {/* Display content for signed-in users */}
      </SignedIn>
      <SignedOut>
        <SignedOutContent /> {/* Display content for users who are not signed in */}
      </SignedOut>
    </>
  );
}

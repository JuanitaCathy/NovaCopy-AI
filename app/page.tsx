"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import SignedInContent from "@/components/SignedInContent";
import SignedOutContent from "@/components/SignedOutContent";
import "./globals.css";

export default function Home() {
  return (
    <>
      <SignedIn>
        <SignedInContent /> {/* Display content for signed-in users */}
      </SignedIn>
      <SignedOut>
        <SignedOutContent /> {/* Display content for users who are not signed in */}
      </SignedOut>
    </>
  );
}

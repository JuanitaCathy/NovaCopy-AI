"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import SignedInContent from "@/components/SignedInContent";
import SignedOutContent from "@/components/SignedOutContent";
import "./globals.css";

export default function Home() {
  return (
    <>
      <SignedIn>
        <SignedInContent />
      </SignedIn>
      <SignedOut>
        <SignedOutContent />
      </SignedOut>
    </>
  );
}

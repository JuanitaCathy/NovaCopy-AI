"use client";

import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { ReactNode } from "react";
import { ConvexClientProvider } from "./ConvexClientProvider";
import Header from "./layout";

interface ClerkLayoutProps {
  children: ReactNode;
}

export default function ClerkLayout({ children }: ClerkLayoutProps) {
  return (
    <ClerkProvider>
      {/* <SignedOut> */}
        {/* Render the public view */}
        {/* You can place public content here */}
        {/* {children}
      </SignedOut>
      <SignedIn>
        <Header /> */}
        <ConvexClientProvider>{children}</ConvexClientProvider>
      {/* </SignedIn> */}
    </ClerkProvider>
  );
}

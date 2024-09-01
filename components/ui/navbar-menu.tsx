"use client";
import React from "react";
import { useState } from "react";
import Box from '@mui/material/Box';
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
// import Header from "../../app/layout";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, useClerk, UserButton } from "@clerk/nextjs";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  href,
  onClick,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  href: string;
  onClick?: () => void;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href === "#" && onClick) {
      e.preventDefault(); // Prevent default link behavior
      onClick();
    }
  };

  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-base font-semibold text-[#d1d5db] hover:opacity-[0.8]"
      >
        <Link href={href} scroll={false} onClick={handleClick}>
          {item}
        </Link>
      </motion.p>
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  const { openSignIn } = useClerk(); // Use Clerk's sign-in methods
  const router = useRouter();

  // Function to handle the sign-in process
  const handleSignIn = () => {
    if (!openSignIn) {
      console.error("Clerk sign-in is not available");
      return;
    }

    // Redirect to the Clerk sign-in page
    openSignIn();
  };

  return (
    <Box display="flex" justifyContent="center" gap={4}>
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-[#2c2f41] bg-[#1a1b2e]/50 backdrop-blur-lg shadow-input flex justify-center items-center space-x-8 px-16 py-5"
    >
      {children}
      {/* Render Header if signed in, otherwise render Sign In button */}
      <SignedIn>
          <Header />
        </SignedIn>
        <SignedOut>
          <button onClick={handleSignIn}>Sign In</button>
        </SignedOut>
      </nav>
    </Box>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black"
    >
      {children}
    </Link>
  );
};

export function Header() {
    return (
      <header>
        <UserButton />
      </header>
    );
  }

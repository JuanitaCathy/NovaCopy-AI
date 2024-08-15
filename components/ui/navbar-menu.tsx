"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HoverBorderGradient } from "./hover-border-gradient";

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
  href
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  href: string;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-base font-semibold text-[#d1d5db] hover:opacity-[0.8]"
      >
        <Link href={href} scroll={true}>
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
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-[#2c2f41] bg-[#1a1b2e]/50 backdrop-blur-lg shadow-input flex justify-center items-center space-x-8 px-16 py-5" 
    >
      {children}
    </nav>
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

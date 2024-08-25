import React, { useState } from "react";
import { Menu, MenuItem } from "../components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";

export default function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-5" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false); // State for menu visibility

  return (
    <div className={cn("fixed top-0 inset-x-0 z-50", className)}>
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-center py-4 px-6 max-w-4xl mx-auto">
        <Menu setActive={setActive}>
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <Image
              src="/NovaCopy_white_transparent.png"
              alt="NovaCopy Logo"
              width={40}
              height={40}
            />
            <MenuItem
              setActive={setActive}
              active={active}
              item="About"
              href="/"
            />
            <div className="h-full flex items-center justify-center text-gray-400">
              •
            </div>
            <MenuItem
              setActive={setActive}
              active={active}
              item="Pricing"
              href="/pricing"
            />
            <div className="h-full flex items-center justify-center text-gray-400">
              •
            </div>
            <MenuItem
              setActive={setActive}
              active={active}
              item="Contact"
              href="/contact"
            />
            <div className="h-full flex items-center justify-center text-gray-400">
              •
            </div>
            <MenuItem
              setActive={setActive}
              active={active}
              item="Services"
              href="/services"
            />
            <div className="h-full flex items-center justify-center text-gray-400">
              •
            </div>
            <MenuItem
              setActive={setActive}
              active={active}
              item="Team"
              href="/team"
            />
          </div>
        </Menu>
      </div>

      {/* Mobile Navbar */}
      <div className="flex items-center justify-between md:hidden px-4 py-2">
        {/* Logo */}
        <Image
          src="/NovaCopy_white_transparent.png"
          alt="NovaCopy Logo"
          width={70}
          height={70}
        />

        {/* Hamburger Menu Icon */}
        <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX size={35} /> : <HiMenu size={35} />}
        </button>
      </div>

      {/* Pop-up Menu for Mobile */}
      {isOpen && (
        <div className="fixed inset-0 top-16 bg-gray-800 bg-opacity-70 text-white p-4 md:hidden flex flex-col items-center space-y-4">
          <Menu setActive={setActive}>
            <MenuItem
              setActive={setActive}
              active={active}
              item="About"
              href="/"
            />
            <MenuItem
              setActive={setActive}
              active={active}
              item="Pricing"
              href="/pricing"
            />
            <MenuItem
              setActive={setActive}
              active={active}
              item="Contact"
              href="/contact"
            />
            <MenuItem
              setActive={setActive}
              active={active}
              item="Services"
              href="/services"
            />
            <MenuItem
              setActive={setActive}
              active={active}
              item="Team"
              href="/team"
            />
          </Menu>
        </div>
      )}
    </div>
  );
}

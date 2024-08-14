"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "../components/ui/navbar-menu";
import { cn } from "@/lib/utils";

export default function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">   
      <Navbar className="top-8" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-16 inset-x-0 max-w-4xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="About" href="/" />
        <div className="h-full flex items-center justify-center text-gray-400">•</div>
        <MenuItem setActive={setActive} active={active} item="Pricing" href="#pricing"/>
        <div className="h-full flex items-center justify-center text-gray-400">•</div>
        <MenuItem setActive={setActive} active={active} item="Contact" href="#contact"/>
        <div className="h-full flex items-center justify-center text-gray-400">•</div>
        <MenuItem setActive={setActive} active={active} item="Services" href="#services"/>
        <div className="h-full flex items-center justify-center text-gray-400">•</div>
        <MenuItem setActive={setActive} active={active} item="Team" href="#team" />
      </Menu>
    </div>
  );
}

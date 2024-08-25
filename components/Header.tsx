import React, { useState } from "react";
import { Menu, MenuItem } from "../components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function NavbarDemo({
  onFeaturesClick,
}: {
  onFeaturesClick: () => void;
}) {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-7" onFeaturesClick={onFeaturesClick} />
    </div>
  );
}

function Navbar({
  className,
  onFeaturesClick,
}: {
  className?: string;
  onFeaturesClick: () => void;
}) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={cn("fixed top-16 inset-x-0 max-w-4xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
          <div className="flex items-center">
            <Image
              src="/NovaCopy_white_transparent.png" 
              alt="NovaCopy Logo"
              width={40}
              height={40}
            />
          </div>
        <MenuItem setActive={setActive} active={active} item="About" href="/" />
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
          href="#"
          onClick={onFeaturesClick} 
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
      </Menu>
    </div>
  );
}

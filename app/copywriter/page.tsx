"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";

const SidebarItem = ({ label, icon }: { label: string; icon: JSX.Element }) => (
  <div className="flex items-center px-4 hover:bg-gradient-to-r from-[#00b4d8] to-[#9b5de5] text-white rounded-md cursor-pointer transition-all duration-300 whitespace-nowrap">
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const Copywriter: React.FC = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Effects */}
      <StarsBackground />
      <ShootingStars />

      <div className="flex h-full">
        {/* Sidebar */}
        <aside className="w-64 bg-[#1a1a2e] p-4 shadow-lg z-20">
          <div className="flex items-center mb-5">
            <Image
              src="/NovaCopy_white.png"
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="ml-3 mt-5 text-white">
              <h2 className="text-xl font-semibold">NovaCopy AI</h2>
              <button className="text-[#00b4d8] hover mt-4">
                Upgrade your plan
              </button>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <SidebarItem label="Create Custom Copy" icon={<svg />} />
            <SidebarItem label="Templates" icon={<svg />} />
            <SidebarItem label="Option 1" icon={<svg />} />
            <SidebarItem label="Settings" icon={<svg />} />
          </div>
        </aside>

        {/* Main Content */}
      </div>
    </div>
  );
};

export default Copywriter;

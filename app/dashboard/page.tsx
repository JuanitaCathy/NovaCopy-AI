"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars"; 

const SidebarItem = ({ label, icon }: { label: string; icon: JSX.Element }) => (
    <div className="flex items-center px-4 hover:bg-gradient-to-r from-[#00b4d8] to-[#9b5de5] text-white rounded-md cursor-pointer transition-all duration-300 whitespace-nowrap">
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const Dashboard: React.FC = () => {
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
              <button className="text-[#00b4d8] hover mt-4">Upgrade your plan</button>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <SidebarItem label="Create Custom Copy" icon={<svg  />} />
            <SidebarItem label="Templates" icon={<svg  />} />
            <SidebarItem label="Option 1" icon={<svg  />} />
            <SidebarItem label="Settings" icon={<svg  />} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 mt-10 text-white z-10">
          <div className="flex items-center justify-between mb-7">
            <div className="flex-1">
              <h1 className="text-5xl font-bold mb-4"> <span className="bg-gradient-to-r from-[#00b4d8] to-[#9b5de5] bg-clip-text text-transparent"> Welcome </span> back!</h1>
               <h1 className="text-4xl font-bold mt-2">What copy would you like to generate today?</h1>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-2 mt-4 border border-gray-700 rounded-lg bg-[#1a1a2e] text-white"
              />
            </div>
            <button
              onClick={() => router.push('/copywriter')}
              className="bg-gradient-to-r from-[#00b4d8] to-[#9b5de5] text-white px-4 py-2 rounded-md flex items-center space-x-2 shadow-lg"
            >
              <span>+</span>
              <span>Create a copy</span>
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">You might want to try</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Replace with dynamic content */}
              <div className="bg-[#1a1a2e] p-4 rounded-md shadow-md">Suggestion 1</div>
              <div className="bg-[#1a1a2e] p-4 rounded-md shadow-md">Suggestion 2</div>
              <div className="bg-[#1a1a2e] p-4 rounded-md shadow-md">Suggestion 3</div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Past Copies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Replace with dynamic content */}
              <div className="bg-[#1a1a2e] p-4 rounded-md shadow-md">Past Copy 1</div>
              <div className="bg-[#1a1a2e] p-4 rounded-md shadow-md">Past Copy 2</div>
              <div className="bg-[#1a1a2e] p-4 rounded-md shadow-md">Past Copy 3</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

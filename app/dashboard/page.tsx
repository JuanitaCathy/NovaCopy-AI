"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPen,
  faInfoCircle,
  faShoppingCart,
  faTag,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";

const SidebarItem = ({
  label,
  icon,
  href,
}: {
  label: string;
  icon: JSX.Element;
  href: string;
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(href)}
      className="flex items-center px-4 py-2 space-x-2 hover:bg-gradient-to-r from-[#00b4d8] to-[#9b5de5] text-white rounded-md cursor-pointer transition-all duration-300 whitespace-nowrap z-10"
    >
      <div className="flex items-center justify-center w-6 h-12">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

const ClickableIcon = ({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: JSX.Element;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-105"
  >
    <div className="bg-[#1a1a2e] p-3 rounded-full mb-2">{icon}</div>
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const Dashboard: React.FC = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleIconClick = (label: string) => {
    router.push(`/copywriter?type=${encodeURIComponent(label)}`);
  };

  return (
    <div className="relative h-screen overflow-hidden overflow-y-auto">
      {" "}
      {/* Background Effects */}
      <StarsBackground />
      <ShootingStars />
      <div className="flex h-full">
        <aside className="w-60 bg-[#1a1a2e] p-4 shadow-lg z-20">
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
          <div className="flex flex-col space-y-2">
            <SidebarItem
              label="Create Custom Copy"
              icon={<svg />}
              href="/copywriter"
            />
            <SidebarItem
              label="Previous Copies"
              icon={<svg />}
              href="/previous-copies"
            />
            <SidebarItem label="Settings" icon={<svg />} href="/settings" />
            <SidebarItem label="Feedback" icon={<svg />} href="/feedback" />
          </div>
          <div className="m-5 mt-10">
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-gradient-to-r from-[#00b4d8] to-[#9b5de5] text-white px-4 py-2 rounded-md hover:bg-[#0489b1] transition-all duration-300"
            >
              Back to Dashboard
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 mt-10 text-white z-10">
          <div className="flex items-center justify-between mb-7">
            <div className="flex-1">
              <h1 className="text-5xl font-bold mb-4">
                {" "}
                <span className="bg-gradient-to-r from-[#00b4d8] to-[#9b5de5] bg-clip-text text-transparent">
                  {" "}
                  Welcome{" "}
                </span>{" "}
                back!
              </h1>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-2 mt-4 border border-gray-700 rounded-lg bg-[#1a1a2e] text-white"
              />
            </div>
            <button
              onClick={() => router.push("/copywriter")}
              className="bg-gradient-to-r from-[#00b4d8] to-[#9b5de5] text-white px-4 py-2 rounded-md flex items-center space-x-2 shadow-lg"
            >
              <span>+</span>
              <span>Create a copy</span>
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">
              What copy would you like to generate today?
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <ClickableIcon
                label="Email Ad"
                icon={<FontAwesomeIcon icon={faEnvelope} />}
                onClick={() => handleIconClick("Email Ad")}
              />
              <ClickableIcon
                label="Facebook Ad"
                icon={<FontAwesomeIcon icon={faFacebook} />}
                onClick={() => handleIconClick("Facebook Ad")}
              />
              <ClickableIcon
                label="Instagram Ad"
                icon={<FontAwesomeIcon icon={faInstagram} />}
                onClick={() => handleIconClick("Instagram Ad")}
              />
              <ClickableIcon
                label="Social Media Caption"
                icon={<FontAwesomeIcon icon={faPen} />}
                onClick={() => handleIconClick("Social Media Caption")}
              />
              <ClickableIcon
                label="About Us Page"
                icon={<FontAwesomeIcon icon={faInfoCircle} />}
                onClick={() => handleIconClick("About Us Page")}
              />
              <ClickableIcon
                label="Sales Page"
                icon={<FontAwesomeIcon icon={faShoppingCart} />}
                onClick={() => handleIconClick("Sales Page")}
              />
              <ClickableIcon
                label="Product Description"
                icon={<FontAwesomeIcon icon={faTag} />}
                onClick={() => handleIconClick("Product Description")}
              />
              <ClickableIcon
                label="Google Ad"
                icon={<FontAwesomeIcon icon={faGoogle} />}
                onClick={() => handleIconClick("Google Ad")}
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Your Metrics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

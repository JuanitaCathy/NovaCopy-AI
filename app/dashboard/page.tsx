'use client'
import React from "react";
import { useState } from "react";
import {Sidebar, SidebarBody, SidebarLink} from "../../components/Sidebar";
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt } from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

// side bar function
export default function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
               icon: (
                  <img
                    src='cindy.jpg'
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ), 
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Acet Labs
      </motion.span>
    </Link>
  );
}
 export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
}

const Dashboard = () => {
  const [userInput, setUserInput] = useState("");
  const [businesses, setBusinesses] = useState(["Business 1"]); // 登録ビジネスのリスト

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(event.target.value);
  };

  const handleAddBusiness = () => {
    const newBusiness = prompt("新しいビジネスの名前を入力してください:");
    if (newBusiness) {
      setBusinesses([...businesses, newBusiness]);
    }
  };
  return (
      <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
          <div className="flex gap-2">
              <div className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse">
                <section className="w-1/2 p-4">
                  <h2 className="text-xl font-semibold">Prompt</h2>
                  <textarea
                  className="w-full h-64 p-2 border border-gray-300 rounded"
                  placeholder="Please enter here..."
                  value={userInput}
                  onChange={handleInputChange}
                ></textarea>
                </section>
              </div>

              <div className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse">
                <section className="w-1/2 p-4">
                  <h2 className="text-xl font-semibold">Output</h2>
                </section>
              </div>
            
          </div>
          <div className="flex gap-2 flex-1">
            {[...new Array(2)].map((i) => (
              <div
                key={"second-array" + i}
                className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>   
  );
};

/*
export default function SignedInContent() {
  const [userInput, setUserInput] = useState("");
  const [businesses, setBusinesses] = useState(["Business 1"]); // 登録ビジネスのリスト

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(event.target.value);
  };

  const handleAddBusiness = () => {
    const newBusiness = prompt("新しいビジネスの名前を入力してください:");
    if (newBusiness) {
      setBusinesses([...businesses, newBusiness]);
    }
  };

  /*
  return (
    <main className="relative min-h-screen overflow-hidden flex flex-col">
      <div className="flex flex-grow"> */
            /* Side bar */
  /*    <Sidebar businesses={businesses} handleAddBusiness={handleAddBusiness} /> 
        
              {/* User Input Field */
        /*      <section className="w-1/2 p-4">
                <h2 className="text-xl font-semibold">Prompt</h2>
                <textarea
                  className="w-full h-64 p-2 border border-gray-300 rounded"
                  placeholder="Please enter here..."
                  value={userInput}
                  onChange={handleInputChange}
                ></textarea>

                <h2 className="text-xl font-semibold">Tone</h2>
                <textarea
                  className="w-full h-30 p-2 border border-gray-300 rounded"
                  placeholder="Please enter here..."
                ></textarea>
                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Generate
                </button>
              </section>    */

              /* AI Response Field */
      /*        <section className="w-1/2 bg-gray-500 p-4">
                <h2 className="text-xl font-semibold">AI Response</h2>
                <div className="h-64 p-2 border border-gray-300 rounded"></div>
              </section>
      </div>
    </main>
  );
} */
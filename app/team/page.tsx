"use client";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import Image from "next/image";
import NavbarDemo from "@/components/Header";
import Footer from "@/components/Footer";

export default function Team() {
  const teamMembers = [
    {
      name: "Miho Funayama",
      image: "/images/miho.jpeg", 
      title: "Fullstack Engineer | AI Enthusiast",
      description:
        "Miho brings a unique perspective from her experience in shipping and semiconductors. She is passionate about leveraging the latest technologies and is eager to apply her skills.",
    },
    {
      name: "Cindy Mae Ngoho",
      image: "/images/cindy.jpeg",
      title: "Web Developer | CS Graduate",
      description:
        "Cindy Mae is a web developer with a background in computer science, currently focused on building a portfolio and expanding her expertise in full-stack development. She is dedicated to mastering the technologies needed to create seamless and efficient user experiences.",
    },
    {
      name: "Juanita Cathy J",
      image: "/images/juanita.jpeg",
      title: "Full Stack Engineer | AI Developer",
      description:
        "Juanita is an undergraduate in CS with expertise in full stack development and AI. Having worked with two startups, she is passionate about building software products that make an impact.",
    },
    {
      name: "Syeda Farheen Masroor",
      image: "/images/farheen.jpg",
      title: "Front-End Developer",
      description:
        "Starting out university this fall, Farheen is a front-end developer and aspiring software engineer. She has versatile skill sets, including writing and communicating effectively, planning a product, and building solutions independently.",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center">
      <StarsBackground />
      <ShootingStars />
      <div className="z-10 w-full max-w-5xl text-center p-3 md:p-12 mt-12">
        <NavbarDemo />
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 mt-12">
          Our Team
        </h1>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 w-48 sm:w-56 md:w-64"
              style={{ flexBasis: "calc(50% - 16px)" }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full mb-4"
              />
              <h2 className="text-base sm:text-lg md:text-xl font-semibold">
                {member.name}
              </h2>
              <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-500">
                {member.title}
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-center mt-2">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="my-12"></div>
      <Footer />
    </main>
  );
}

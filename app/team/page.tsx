"use client";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import NavbarDemo from "@/components/Header";

export default function Team() {
  const teamMembers = [
    {
      name: "Miho Funayama",
      image: "/images/miho.jpeg",
      title: "Fullstack Engineer & AI Enthusiast",
      description:
        "Miho brings a unique perspective from her experience in shipping and semiconductors. She is passionate about leveraging the latest technologies and is eager to apply her skills.",
    },
    {
      name: "Cindy Mae Ngoho",
      image: "/images/cindy.jpeg",
      title: "Web Developer | Computer Science Graduate",
      description:
        "Cindy Mae is a web developer with a background in computer science, currently focused on building a portfolio and expanding her expertise in full-stack development. She is dedicated to mastering the technologies needed to create seamless and efficient user experiences.",
    },
    {
      name: "Juanita Cathy J",
      image: "/images/juanita.jpeg",
      title: "Full Stack Engineer and AI Developer",
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
      <div className="z-10 w-full max-w-5xl text-center p-3 md:p-24 mt-12 md:mt-24">
        <NavbarDemo
          onFeaturesClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <h1 className="text-4xl md:text-5xl font-bold mb-12 mt-12 md:mt-16">
          Our Team
        </h1>
        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 w-64"
              style={{ flexBasis: "calc(50% - 16px)" }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mb-4"
              />
              <h2 className="text-xl font-semibold">{member.name}</h2>
              <h3 className="text-lg font-medium text-gray-500">
                {member.title}
              </h3>
              <p className="text-center mt-2">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

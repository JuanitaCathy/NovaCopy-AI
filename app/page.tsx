import dynamic from "next/dynamic";
import NavbarDemo from "@/components/Header";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

export default function Home() {
  return (
    <main className="relative h-screen w-full overflow-hidden">
      <ShootingStars />
      <NavbarDemo />
      <StarsBackground />
      <Scene />
    </main>
  );
}

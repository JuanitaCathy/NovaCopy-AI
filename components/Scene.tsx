import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Suspense, useState, useEffect } from "react";
import { useProgress, Html, ScrollControls } from "@react-three/drei";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(1)} % loaded</Html>;
}

export default function Scene() {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const offset = window.scrollY / maxScroll;
      setScrollOffset(offset);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setAnimationProgress(scrollOffset);
  }, [scrollOffset]);

  return (
    <Canvas gl={{ antialias: true }} dpr={[1, 1.5]} className="absolute top-0 left-20 w-screen h-screen ">
      <directionalLight position={[-5, 5, 5]} intensity={1} />
      <ambientLight intensity={0.3} />
      <Suspense fallback={<Loader />}>
        <ScrollControls damping={0.5} pages={3}>
          <Model animationProgress={animationProgress} />
        </ScrollControls>
      </Suspense>
    </Canvas>
    // </div>
  );
}

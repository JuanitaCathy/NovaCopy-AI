import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Group } from "three";

useGLTF.preload("/robot_playground.glb");

export default function Model({
  animationProgress,
}: {
  animationProgress: number;
}) {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF("/robot_playground.glb");
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (actions["Experiment"]) {
      actions["Experiment"].play().paused = true;
    }
  }, [actions]);

  useFrame(() => {
    if (actions["Experiment"]) {
      // Update the animation time based on animationProgress
      const animationClip = actions["Experiment"].getClip();
      actions["Experiment"].time =
        (animationClip.duration * animationProgress) % animationClip.duration;
    }
  });

  return (
    <group ref={group} scale={[1.4, 2.2, 0.17]} position={[0.4, -1.5, 0]}>
      <primitive object={scene} />
    </group>
  );
}

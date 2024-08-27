import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Group } from "three";

useGLTF.preload("/robot_playground.glb");

export default function Model() {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF("/robot_playground.glb");
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (actions["Experiment"]) {
      actions["Experiment"].play();
    }
  }, [actions]);

  return (
    <group ref={group} scale={[1.4, 2.2, 0.17]} position={[-0.1, -1.5, 0]}>
      <primitive object={scene} />
    </group>
  );
}

import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { Vector3 } from "three";

const name = "ground-npc-dinosaur";

export const Dinosaur = () => {
  const { scene } = useGLTF("/models/CuteRedDino.glb");
  const position = useMemo(() => new Vector3(0, 0, -5), []);

  scene.traverse((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  return (
    <primitive
      visible
      name={name}
      scale={2}
      position={position}
      object={scene}
    />
  );
};

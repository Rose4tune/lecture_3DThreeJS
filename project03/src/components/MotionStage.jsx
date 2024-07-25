import { useGLTF, useTexture } from "@react-three/drei";
import Picture from "./Picture";
import { useRef } from "react";
import { useBox } from "@react-three/cannon";

export default function MotionStage({ position }) {
  const { nodes, materials } = useGLTF("/assets/models/popup.glb");
  const texture = useTexture(`/assets/images/github.png`);

  const [ref] = useBox(
    () => ({
      args: [0.9, 0.9, 0.2],
      position,
      type: "Static",
      mass: 5,
    }),
    useRef()
  );

  return (
    <group ref={ref} scale={0.3}>
      <mesh
        geometry={nodes.body.geometry}
        material={materials.Material}
        position={[0.004, 0.3, 0]}
        scale={[1.957, -1.036, 0.135]}
      />
      <Picture nodes={nodes} texture={texture} />
    </group>
  );
}

useGLTF.preload("/assets/models/popup.glb");

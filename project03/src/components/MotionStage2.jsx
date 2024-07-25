import { useGLTF, useTexture } from "@react-three/drei";
import Picture from "./Picture";
import { useRef } from "react";
import { useBox } from "@react-three/cannon";

export default function MotionStage2({ position }) {
  const { nodes, materials } = useGLTF("/assets/models/popup.glb");
  const texture = useTexture(`/assets/images/info.jpg`);

  const [ref] = useBox(
    () => ({
      args: [0.9, 0.9, 0.2],
      position,
      type: "Static",
      rotation: [0, Math.PI / 2, 0],
      mass: 5,
    }),
    useRef()
  );

  const x = position[0];
  const y = position[1];
  const z = position[2];

  return (
    <group>
      <mesh position={[x + 1, y - 0.54, z]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry ref={[1, 1]} />
        <meshStandardMaterial color={"hotpink"} transparent opacity={0.8} />
      </mesh>
      <group ref={ref} scale={0.3}>
        <mesh
          geometry={nodes.body.geometry}
          material={materials.Material}
          position={[0.004, 0.3, 0]}
          scale={[1.957, -1.036, 0.135]}
        />
        <Picture nodes={nodes} texture={texture} />
      </group>
    </group>
  );
}

useGLTF.preload("/assets/models/popup.glb");

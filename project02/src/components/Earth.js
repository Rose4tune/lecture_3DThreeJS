import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Earth(props) {
  const { scene } = useGLTF("/models/earth.glb");
  const earthRef = useRef(null);

  useFrame(({}, delta) => {
    earthRef.current.rotation.y += delta * 0.1;
  });

  return (
    <mesh
      ref={earthRef}
      position={[0, -0.9, 0]}
      scale={0.8}
      rotation-x={-Math.PI / 2}
    >
      <primitive object={scene} />
    </mesh>
  );
}

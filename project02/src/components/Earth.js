import { Html, Sparkles, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useBodyClass } from "../utils/hook";

export default function Earth(props) {
  const { scene } = useGLTF("/models/earth.glb");
  const earthRef = useRef(null);
  const [isHover, setIsHover] = useState(false);

  useFrame(({}, delta) => {
    earthRef.current.rotation.y += delta * 0.1;
  });

  useBodyClass(isHover, "drag");

  return (
    <group position={[0, -0.8, 0]}>
      <Sparkles
        position={[0, 0, 0]}
        count={80}
        scale={1.8}
        size={2}
        speed={0.4}
      />
      <mesh
        ref={earthRef}
        onPointerEnter={() => setIsHover(true)}
        onPointerOut={() => setIsHover(false)}
        scale={0.8}
        rotation-x={-Math.PI / 2}
      >
        <primitive object={scene} />
      </mesh>

      <Html center>
        <span className="rotation-icon">
          <img src="/icons/rotation.png" alf="icon" />
        </span>
      </Html>
    </group>
  );
}

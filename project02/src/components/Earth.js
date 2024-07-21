import { Html, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

export default function Earth(props) {
  const { scene } = useGLTF("/models/earth.glb");
  const earthRef = useRef(null);
  const [isHover, setIsHover] = useState(false);

  useFrame(({}, delta) => {
    earthRef.current.rotation.y += delta * 0.1;
  });

  return (
    <group position={[0, -0.8, 0]}>
      <mesh
        ref={earthRef}
        onPointerEnter={() => setIsHover(true)}
        onPointerOut={() => setIsHover(false)}
        scale={0.8}
        rotation-x={-Math.PI / 2}
      >
        <primitive object={scene} />
      </mesh>
      {isHover && (
        <Html center>
          <span className="rotation-icon">
            <img src="/icons/rotation.png" alf="icon" />
          </span>
        </Html>
      )}
    </group>
  );
}

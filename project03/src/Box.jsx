import React, { useState } from "react";
import { useBox } from "@react-three/cannon";

export default function Box(props) {
  const [meshRef, api] = useBox(() => ({ args: [2, 1, 1], mass: 1, ...props }));

  const [hovered, setHover] = useState(false);

  return (
    <mesh
      {...props}
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onPointerDown={() => api.velocity.set(0, 5, 0)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

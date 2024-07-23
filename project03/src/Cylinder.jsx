import React, { useState } from "react";
import { useCylinder } from "@react-three/cannon";

export default function Cylinder(props) {
  const [meshRef, api] = useCylinder(() => ({
    args: [1, 0.3, 1, 8],
    mass: 1,
    ...props,
  }));

  const [hovered, setHover] = useState(false);

  return (
    <mesh
      {...props}
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onPointerDown={() => api.velocity.set(0, 5, 0)}
    >
      <cylinderGeometry args={[0.5, 0.3, 1, 8]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

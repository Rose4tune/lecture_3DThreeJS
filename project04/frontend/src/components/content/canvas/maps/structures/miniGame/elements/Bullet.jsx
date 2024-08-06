import { useSphere } from "@react-three/cannon";
import { useEffect } from "react";

export const Bullet = ({ position, shot }) => {
  const [ref, api] = useSphere(() => ({
    mass: 10,
    position: [position[0], position[1], position[2]],
    collisionFilterGroup: 1,
    collisionFilterMask: 2,
    allowSleep: false,
  }));

  useEffect(() => {
    if (ref.current) {
      shot(api);
    }
  }, [ref.current, shot, api]);

  return (
    <mesh
      name="bullet"
      ref={ref}
      position={[position[0], position[1], position[2]]}
    >
      <sphereGeometry attach="geometry" args={[0.5, 32, 32]} />
      <meshStandardMaterial attach="material" color="red" />
    </mesh>
  );
};

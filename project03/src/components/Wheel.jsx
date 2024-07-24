import { useGLTF } from "@react-three/drei";

export default function Wheel({ wheelRef, radius, leftSide }) {
  const { nodes, materials } = useGLTF("/assets/models/car_taxi.glb");

  return (
    <group ref={wheelRef} scale={radius * 10}>
      <group rotation={leftSide ? [0, -Math.PI, 0] : [0, 0, 0]}>
        <mesh
          geometry={nodes.Car01_2_WhBL002_0.geometry}
          material={materials.mt_PalleteBR}
          rotation={[-1.576, 0, 0]}
          scale={0.32}
        />
      </group>
    </group>
  );
}

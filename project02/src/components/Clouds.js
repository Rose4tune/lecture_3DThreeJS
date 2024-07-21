import { Cloud } from "@react-three/drei";

export default function Clouds() {
  return (
    <group position={[0, -1, 0]}>
      <Cloud
        position-x={-2}
        opacity={0.5}
        speed={0.4}
        width={0.02}
        depth={0.3}
        segments={2}
        color="white"
      />
      <Cloud
        position-x={2}
        opacity={0.4}
        speed={0.04}
        width={0.2}
        depth={0.2}
        segments={1}
        color="white"
      />
    </group>
  );
}

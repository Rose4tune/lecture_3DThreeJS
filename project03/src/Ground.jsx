import { usePlane } from "@react-three/cannon";
import DummyMovementArea from "./dummy/DummyMovementArea";
import DummyBox from "./dummy/DummyBox";
import DummyBall from "./dummy/DummyBall";
import DummyWall from "./dummy/DummyWall";

export function Ground(props) {
  const [meshRef] = usePlane(() => ({
    args: [15, 15],
    mass: 1,
    type: "Static",
    ...props,
  }));

  return (
    <group>
      <mesh {...props} ref={meshRef} receiveShadow>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="black" wireframe />
      </mesh>
      <DummyMovementArea position={[0, 0.1, -2]} />
      <DummyBox position={[1, 0.2, -2]} args={[1, 1, 1]} />
      <DummyBall position={[2, 0.2, 1]} args={[0.15]} />
      <DummyWall position={[5, 0.5, 0]} args={[1, 1, 10]} />
      <DummyWall position={[0, 0.5, 5]} args={[10, 1, 1]} />
      <DummyWall position={[0, 0.5, -5]} args={[10, 1, 1]} />
      <DummyWall position={[-5, 0.5, 0]} args={[1, 1, 10]} />
    </group>
  );
}

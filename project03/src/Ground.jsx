import { usePlane } from "@react-three/cannon";
import DummyWall from "./dummy/DummyWall";
import Tree from "./components/Tree";
import Ball from "./components/Ball";
import HowToPlay from "./components/HowToPlay";
import RoadSign from "./components/RoadSign";
import Banner from "./components/Banner";
import MotionStage from "./components/MotionStage";
import MotionStage2 from "./components/MotionStage2";

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
        <meshStandardMaterial color="white" opacity={0} transparent />
      </mesh>

      <Tree position={[1, 0.5, -1]} />
      <Tree position={[0, 0.5, -1]} />
      <Tree position={[-1, 0.5, -1]} />
      <Tree position={[-2, 0.5, -1]} />

      <Ball position={[2, 0.2, 1]} args={[0.15]} />

      {/* <DummyWall position={[5, 0.5, 0]} args={[1, 1, 10]} />
      <DummyWall position={[0, 0.5, 5]} args={[10, 1, 1]} />
      <DummyWall position={[0, 0.5, -5]} args={[10, 1, 1]} />
      <DummyWall position={[-5, 0.5, 0]} args={[1, 1, 10]} /> */}

      <HowToPlay />

      <RoadSign position={[0, 0.5, 3]} />
      <Banner position={[0, 1, -4.9]} />
      <MotionStage position={[3, 0.55, 4]} />
      <MotionStage2 position={[-4, 0.55, 5.5]} />
    </group>
  );
}

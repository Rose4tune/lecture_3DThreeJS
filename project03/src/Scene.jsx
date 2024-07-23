import { Canvas } from "@react-three/fiber";
import { Ground } from "./Ground";
import { Debug, Physics } from "@react-three/cannon";
import Car from "./Car";
import DummyMovementArea from "./dummy/DummyMovementArea";
import DummyBox from "./dummy/DummyBox";
import DummyBall from "./dummy/DummyBall";
import DummyWall from "./dummy/DummyWall";

function Scene() {
  return (
    <>
      <Canvas camera={{ fov: 45, position: [1.5, 2, 3] }}>
        <ambientLight />
        <directionalLight position={[0, 5, 5]} />
        <Physics gravity={[0, -2.6, 0]}>
          <Debug>
            <Car />
            <DummyMovementArea position={[0, 0.1, -2]} />
            <DummyBox position={[1, 0.2, -2]} args={[1, 1, 1]} />
            <DummyBall position={[0, 0.2, -2]} args={[0.15]} />
            <DummyWall position={[5, 0.5, 0]} args={[1, 1, 10]} />
            <DummyWall position={[0, 0.5, 5]} args={[10, 1, 1]} />
            <DummyWall position={[0, 0.5, -5]} args={[10, 1, 1]} />
            <DummyWall position={[-5, 0.5, 0]} args={[1, 1, 10]} />
            <Ground rotation={[-Math.PI / 2, 0, 0]} />
          </Debug>
        </Physics>
      </Canvas>
    </>
  );
}

export default Scene;

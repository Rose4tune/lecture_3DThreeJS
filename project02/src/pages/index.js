import { Canvas } from "@react-three/fiber";
import Lights from "../components/Lights";
import Scene from "../components/Scene";

export default function Home() {
  return (
    <Canvas camera={{ position: [0, 0, 2], fov: 45 }}>
      <color attach="background" args={["rgb(67, 127, 240) 100%)"]} />
      <Lights />
      <Scene />
    </Canvas>
  );
}

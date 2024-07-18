import { Canvas } from "@react-three/fiber";
import Lights from "../components/Lights";
// import Scene from "../components/Scene";
import { lazy, Suspense } from "react";

function Sphere() {
  return (
    <mesh>
      <sphereGeometry args={[1]} />
      <meshBasicMaterial color={"pink"} />
    </mesh>
  );
}

const Scene = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("../components/Scene")), 2000);
  });
});

export default function Home() {
  return (
    <Canvas camera={{ position: [0, 0, 2], fov: 45 }}>
      <color attach="background" args={["rgb(67, 127, 240) 100%)"]} />
      <Suspense fallback={<Sphere />}>
        <Lights />
        <Scene />
      </Suspense>
    </Canvas>
  );
}

import { Canvas } from "@react-three/fiber";
import Lights from "../components/Lights";
import { lazy, Suspense } from "react";

function Sphere() {
  return (
    <mesh>
      <sphereGeometry args={[0.6]} />
      <meshBasicMaterial color={"pink"} />
    </mesh>
  );
}

const Scene = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("../components/Scene")), 500);
  });
});

export default function Home() {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
      <Suspense fallback={<Sphere />}>
        <Lights />
        <Scene />
      </Suspense>
    </Canvas>
  );
}

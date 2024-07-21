import { Canvas } from "@react-three/fiber";
import Lights from "../components/Lights";
import { lazy, Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Outlet } from "react-router-dom";

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
    <>
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <Suspense fallback={<Sphere />}>
          <Lights />
          <Scene />
        </Suspense>
        <OrbitControls
          makeDefault //카메라 위치 변경 시 끊김현상 방지
          enablePan={false}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
          maxDistance={15}
          minDistance={2}
        />
      </Canvas>
      <Outlet />
    </>
  );
}

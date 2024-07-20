import { Canvas } from "@react-three/fiber";
import Lights from "../components/Lights";
// import Scene from "../components/Scene";
import { lazy, Suspense } from "react";
import { motion } from "framer-motion-3d";

function FrameworkModel() {
  return (
    <motion.mesh
      initial={{ rotateX: Math.PI / 2, rotateZ: 1, x: 0, y: 0, z: -3 }}
      animate={{
        rotateZ: [0, 1, 4, Math.PI],
        scale: [0.5, 1, 0.5],
        x: 0,
        y: 1,
        z: 0,
        transition: { duration: 2, delay: 1, type: "spring" },
      }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <cylinderGeometry args={[1, 1, 0.5, 8]} />
      <motion.meshBasicMaterial
        initial={{ opacity: 1 }}
        color={"hotpink"}
        animate={{
          opacity: [1, 0.5, 1],
          transition: {
            duration: 0.5,
            repeat: Infinity,
          },
        }}
      />
    </motion.mesh>
  );
}

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
        {/* <Scene /> */}
        <FrameworkModel />
      </Suspense>
    </Canvas>
  );
}

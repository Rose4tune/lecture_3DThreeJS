"use client";

import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

export default function IphoneModel() {
  return (
    <section className="bg-black px-10">
      <div className="bg-black max-w-[1260px] mx-auto w-full">
        <div className="bg-black">
          <motion.div
            className="text-[56px] text-[#86868b] opacity-40 w-full py-10 mx-auto max-w-screen-xl font-semibold"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
          >
            보다 자세히 들여다보기.
          </motion.div>
          <div className="relative h-[780px] bg-black">
            <Canvas id="canvas">
              <ambientLight intensity={0.1} />
              <OrbitControls enableZoom={false} enablePan={false} />
              <PerspectiveCamera makeDefault position={[0, 0, 10]}>
                <directionalLight color="white" position={[0, 0, 5]} />
              </PerspectiveCamera>
              <mesh>
                <boxGeometry />
                <meshStandardMaterial />
              </mesh>
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
}

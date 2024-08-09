"use client";

import { motion, useScroll } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Iphone from "../models/Iphone";
import { useEffect, useRef, useState } from "react";
import FloatingBtnForCanvas from "./buttons/FloatingBtnForCanvas";
import { Color } from "three";

const COLORS = [
  { hex: "#8f8a81" },
  { hex: "#202630" },
  { hex: "#c9c8c3" },
  { hex: "#242526" },
];
const COLOR_CHANGABLE_MATERIAL_NAMES = [
  "cam",
  "ant",
  "frame",
  "rglass",
  "back",
];

export default function CloserLook() {
  const scrollRef = useRef();
  const proRef = useRef();
  const proMaxRef = useRef();
  const cameraRef = useRef();

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  });

  const [color, setColor] = useState(COLORS[0].hex);

  const handleColor = () => {
    if (!proRef.current) return;
    proRef.current.children.map((child) => {
      if (!child.isMesh) return;
      const isChangable =
        COLOR_CHANGABLE_MATERIAL_NAMES.indexOf(child.material.name) > -1;

      if (!isChangable) return;
      child.material.color = new Color(color);
    });
  };

  useEffect(() => {
    handleColor();
  }, [color]);

  return (
    <section className="bg-black px-10">
      <div ref={scrollRef} className="bg-black max-w-[1260px] mx-auto w-full">
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
              <Iphone
                scrollYProgress={scrollYProgress}
                type={"pro"}
                ref={proRef}
              />
            </Canvas>
          </div>
        </div>
        <FloatingBtnForCanvas
          colors={COLORS}
          color={color}
          setColor={setColor}
        />
      </div>
    </section>
  );
}

"use client";

import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Iphone from "../models/Iphone";
import { useEffect, useRef, useState } from "react";
import FloatingBtnForCanvas from "./buttons/FloatingBtnForCanvas";
import { Color } from "three";
import gsap from "gsap";

const MODELS = ["pro", "pro-max"];
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
  const [model, setModel] = useState(MODELS[0]);
  const [isProLoading, setIsProLoading] = useState(true);
  const [isMaxLoading, setIsMaxLoading] = useState(true);

  const handleColor = () => {
    if (!proRef?.current || !proMaxRef?.current) return;
    [proRef, proMaxRef].map((_ref) => {
      _ref.current.children.map((_children) => {
        if (!_children?.isMesh) return;
        const isChangable =
          COLOR_CHANGABLE_MATERIAL_NAMES.indexOf(_children.material.name) > -1;
        if (!isChangable) return;
        _children.material.color = new Color(color);
      });
    });
  };

  const handleModel = () => {
    if (!cameraRef?.current || !proRef?.current || !proMaxRef?.current) return;
    gsap.to(cameraRef.current.position, { x: 0, y: 0, z: 10 });
    gsap.to(proRef.current.rotation, { y: 0 });

    proRef.current.visible = true;
    proMaxRef.current.visible = true;

    const isProModel = model === MODELS[0];

    gsap.to(proRef.current.rotation, { y: 0 });
    gsap.to(proRef.current.position, {
      x: isProModel ? 0 : -10,
      duration: 1,
      ease: "circ.inOut",
    });
    gsap.to(proMaxRef.current.position, {
      x: isProModel ? 10 : 0,
      duration: 1,
      ease: "circ.inOut",
    });

    setTimeout(() => {
      proRef.current.visible = isProModel;
      proMaxRef.current.visible = !isProModel;
    }, [1000]);
  };

  useEffect(() => {
    handleColor();
  }, [color]);

  useEffect(() => {
    handleModel();
  }, [model]);

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
              <PerspectiveCamera
                ref={cameraRef}
                makeDefault
                position={[0, 0, 10]}
              >
                <directionalLight color="white" position={[0, 0, 5]} />
              </PerspectiveCamera>
              <Iphone
                type={"pro"}
                scrollYProgress={scrollYProgress}
                setLoading={setIsProLoading}
                ref={proRef}
              />
              <Iphone
                type={"proMax"}
                scrollYProgress={scrollYProgress}
                setLoading={setIsMaxLoading}
                ref={proMaxRef}
              />
            </Canvas>
            <AnimatePresence>
              {(isProLoading || isMaxLoading) && (
                <motion.div
                  className="text-white absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center backdrop-blur gap-0 text-[28px]"
                  initial={{ opacity: 1, zIndex: 1 }}
                  exit={{ opacity: 0, zIndex: -1 }}
                >
                  <div>탭하고 돌려가며</div>
                  <div>iPhone을 자세히 살펴볼 수 있습니다</div>
                  <div>loading..</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <FloatingBtnForCanvas
          colors={COLORS}
          color={color}
          setColor={setColor}
          model={model}
          setModel={setModel}
        />
      </div>
    </section>
  );
}

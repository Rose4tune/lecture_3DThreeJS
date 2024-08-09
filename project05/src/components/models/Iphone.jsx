"use client";

import { useFBX } from "@react-three/drei";
import gsap from "gsap";
import { forwardRef, useEffect } from "react";
import { Box3, Vector3 } from "three";

export default forwardRef(function IphoneMesh({ type, scrollYProgress }, ref) {
  const iphoneModelFbx = useFBX(
    type === "pro" ? "/models/model_low.fbx" : "/models/model_high.fbx"
  );

  const THRESHOLD = 0.4;
  const ROUNDS = 2;

  useEffect(() => {
    if (!ref.current) return;
    const obj = ref.current;
    const newPosition = new Vector3();

    new Box3().setFromObject(obj).getCenter(newPosition);
    obj.position.setY(-newPosition.y);

    const unsubscribe = scrollYProgress.on("change", (_scrollYProgress) => {
      if (type === "pro-max") return;
      if (_scrollYProgress > THRESHOLD) {
        gsap.to(obj.rotation, { y: Math.PI / 4 });
        unsubscribe();
        return;
      }
      obj.rotation.y =
        -1 * ROUNDS * Math.PI * (1 - _scrollYProgress / THRESHOLD) +
        Math.PI / 4;
    });

    return () => {
      unsubscribe();
    };
  }, [ref]);

  return (
    <primitive
      ref={ref}
      position={[0, 0, 0]}
      object={iphoneModelFbx}
      scale={type === "pro" ? 1 / 2.5 : 1 / 2.25}
      visible={type === "pro"}
    />
  );
});

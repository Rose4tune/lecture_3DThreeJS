"use client";

import { useFBX } from "@react-three/drei";
import { forwardRef, useEffect } from "react";
import { Box3, Vector3 } from "three";

export default forwardRef(function IphoneMesh({ type }, ref) {
  const iphoneModelFbx = useFBX(
    type === "pro" ? "/models/model_low.fbx" : "/models/model_high.fbx"
  );

  useEffect(() => {
    if (!ref.current) return;
    const obj = ref.current;
    const newPosition = new Vector3();

    new Box3().setFromObject(obj).getCenter(newPosition);
    obj.position.setY(-newPosition.y);
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

import { Html, useGLTF } from "@react-three/drei";
import { useBox } from "@react-three/cannon";
import { motion } from "framer-motion-3d";
import { useEffect, useRef, useState } from "react";

export default function Tree({ position, model, material }) {
  const [info, setInfo] = useState(false);

  const [ref] = useBox(
    () => ({
      args: [0.12, 1, 0.12],
      type: "Static",
      onCollide: handleCollision,
      position,
    }),
    useRef(null)
  );

  const handleCollision = (e) => {
    if (e.collisionFilters.bodyFilterGroup === 5) {
      setInfo(true);
    }
  };

  useEffect(() => {
    let timeOut;
    if (info) {
      timeOut = setTimeout(() => setInfo(false), 800);
    }

    return () => clearTimeout(timeOut);
  }, [info]);

  return (
    <group ref={ref}>
      <motion.group
        scale={0.2}
        position={[0.015, 0, 0.02]}
        rotation={[-1.555, 0, 0]}
        animate={{
          scale: [0, 0.2],
          y: [-1, 0],
        }}
        transition={{
          delay: 1,
          duration: 0.3,
        }}
      >
        <model.TreeMesh material={material} />
      </motion.group>
      {info && (
        <Html center>
          <div className="information">This is a Tree</div>
        </Html>
      )}
    </group>
  );
}

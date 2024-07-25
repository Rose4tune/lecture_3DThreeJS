import { useCylinder } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion-3d";

export default function RoadSign({ position }) {
  const { nodes, materials } = useGLTF("/assets/models/road_sign.glb");
  const [active, setActive] = useState(false);

  const [ref] = useCylinder(
    () => ({
      args: [0.1, 0.1, 1, 8],
      type: "Static",
      mass: 1,
      position,
      onCollide: handleCollision,
    }),
    useRef(null)
  );

  const handleCollision = (e) => {
    if (e.body.name === "chssisbody") {
      setActive(true);
    }
  };

  useEffect(() => {
    let timeOut;
    if (active) {
      timeOut = setTimeout(() => setActive(false), 1000);
    }

    return () => clearTimeout(timeOut);
  }, [active]);

  return (
    <group ref={ref}>
      <mesh
        scale={0.2}
        position={[0, -0.48, 0]}
        geometry={nodes.Object_1_1.geometry}
        material={materials.Wood}
      />
      <motion.group
        scale={0.2}
        position={[0, -0.48, 0]}
        animate={active ? { rotateY: 4 } : { rotateY: -1 }}
        transition={{ duration: 0.4 }}
      >
        <mesh
          geometry={nodes.Object_1.geometry}
          material={materials["WoodLight.001"]}
        />
        <mesh
          geometry={nodes.Object_1_2.geometry}
          material={materials["WoodLight.002"]}
        />
        <mesh
          geometry={nodes.Object_1_3.geometry}
          material={materials["WoodLight.003"]}
        />
      </motion.group>
    </group>
  );
}

useGLTF.preload("/assets/models/road_sign.glb");

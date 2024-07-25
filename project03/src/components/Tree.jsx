import { Html, useGLTF } from "@react-three/drei";
import { useBox } from "@react-three/cannon";
import { motion } from "framer-motion-3d";
import { useEffect, useState } from "react";

export default function Tree(props) {
  const { nodes, materials } = useGLTF("/assets/models/tree.glb");
  const [info, setInfo] = useState(false);

  const [ref] = useBox(() => ({
    args: [0.12, 1, 0.12],
    type: "Static",
    onCollide: handleCollision,
    ...props,
  }));

  const handleCollision = (e) => {
    console.log(e);
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
    <group ref={ref} {...props}>
      <motion.mesh
        scale={0.2}
        geometry={nodes.tree.geometry}
        material={materials["Material.003"]}
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
      />
      {info && (
        <Html center>
          <div className="information">This is a Tree</div>
        </Html>
      )}
    </group>
  );
}

useGLTF.preload("/assets/models/tree.glb");

import { useGLTF } from "@react-three/drei";
import { useBox } from "@react-three/cannon";
import { motion } from "framer-motion-3d";

export default function Tree(props) {
  const { nodes, materials } = useGLTF("/assets/models/tree.glb");
  const [ref] = useBox(() => ({
    args: [0.12, 1, 0.12],
    type: "Static",
    ...props,
  }));

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
    </group>
  );
}

useGLTF.preload("/assets/models/tree.glb");

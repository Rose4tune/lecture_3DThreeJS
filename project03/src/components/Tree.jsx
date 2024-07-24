import { useGLTF } from "@react-three/drei";
import { useBox } from "@react-three/cannon";

export default function Tree(props) {
  const { nodes, materials } = useGLTF("/assets/models/tree.glb");
  const [ref] = useBox(() => ({
    args: [0.12, 1, 0.12],
    type: "Static",
    ...props,
  }));

  return (
    <group ref={ref} {...props}>
      <mesh
        scale={0.2}
        geometry={nodes.tree.geometry}
        material={materials["Material.003"]}
        position={[0.015, 0, 0.02]}
        rotation={[-1.555, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/assets/models/tree.glb");

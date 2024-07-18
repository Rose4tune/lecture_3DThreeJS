import { useGLTF } from "@react-three/drei";

export default function Earth(props) {
  const { scene } = useGLTF("/models/earth.glb");

  return (
    <mesh {...props}>
      <primitive object={scene} />
    </mesh>
  );
}

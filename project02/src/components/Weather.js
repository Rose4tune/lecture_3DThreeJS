import { useGLTF } from "@react-three/drei";

export default function Weather(props) {
  const { position, weather } = props;
  const { nodes } = useGLTF("/models/weather.glb");

  return (
    <>
      <mesh position={position}>
        <primitive object={nodes[weather]} />
      </mesh>
    </>
  );
}

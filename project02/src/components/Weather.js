import { useGLTF } from "@react-three/drei";

export default function Weather(props) {
  const { position, weather } = props;
  const { nodes } = useGLTF("/models/weather.glb");

  let weatherModel;
  if (nodes[weather]) {
    weatherModel = nodes[weather].clone();
  } else {
    weatherModel = nodes.cloud.clone();
  }

  return (
    <>
      <mesh position={position}>
        <primitive object={weatherModel} />
      </mesh>
    </>
  );
}

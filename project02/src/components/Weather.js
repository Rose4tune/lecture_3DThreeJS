import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";

export default function Weather(props) {
  const { position, weather } = props;
  const { nodes } = useGLTF("/models/weather.glb");

  const weatherModel = useMemo(() => {
    const cloneModel = nodes[weather] || nodes.cloud;
    return cloneModel.clone();
  }, [weather]);

  return (
    <>
      <mesh position={position}>
        <primitive object={weatherModel} />
      </mesh>
    </>
  );
}

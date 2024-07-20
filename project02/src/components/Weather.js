import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

export default function Weather(props) {
  const { position, weather, rotationY } = props;
  const { nodes } = useGLTF("/models/weather.glb");

  const weatherRef = useRef(null);

  const weatherModel = useMemo(() => {
    const cloneModel = nodes[weather] || nodes.cloud;
    return cloneModel.clone();
  }, [weather]);

  useFrame((_, delta) => {
    weatherRef.current.rotation.y += delta;
  });

  return (
    <>
      <mesh ref={weatherRef} position={position} rotation-y={rotationY}>
        <primitive object={weatherModel} />
      </mesh>
    </>
  );
}

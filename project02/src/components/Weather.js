import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { motion } from "framer-motion-3d";

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
      <motion.mesh
        ref={weatherRef}
        position={position}
        rotation-y={rotationY}
        whileHover={{ scale: 1.5, transition: 0.5 }}
      >
        <primitive object={weatherModel} />
      </motion.mesh>
    </>
  );
}

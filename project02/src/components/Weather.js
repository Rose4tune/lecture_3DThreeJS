import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion-3d";
import CityName from "./CityName";
import { useNavigate } from "react-router-dom";

export default function Weather(props) {
  const { position, weather, rotationY, cityName } = props;
  const { nodes } = useGLTF("/models/weather.glb");
  const weatherRef = useRef(null);
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();

  const weatherModel = useMemo(() => {
    const cloneModel = nodes[weather] || nodes.cloud;
    return cloneModel.clone();
  }, [weather]);

  useFrame((_, delta) => {
    weatherRef.current.rotation.y += delta;
  });

  const farmatCityName = (name) => {
    return name.replace(/\s/g, "").toLowerCase();
  };
  const onClick = () => {
    navigate(`/${farmatCityName(cityName)}`);
  };

  return (
    <group position={position} rotation-y={rotationY}>
      <motion.mesh
        ref={weatherRef}
        onPointerEnter={() => setIsHover(true)}
        onPointerLeave={() => setIsHover(false)}
        onClick={onClick}
        whileHover={{
          scale: 1.5,
          transition: 0.5,
        }}
      >
        <primitive object={weatherModel} />
      </motion.mesh>
      {isHover && <CityName cityName={cityName} />}
    </group>
  );
}

import { Html } from "@react-three/drei";
import { motion } from "framer-motion-3d";

export default function CityName(props) {
  const { cityName } = props;

  return (
    <motion.group initial={{ y: 0.15 }} animate={{ y: 0.3 }}>
      <Html center position-y={0.15}>
        <div className="cityName">{cityName}</div>
      </Html>
    </motion.group>
  );
}

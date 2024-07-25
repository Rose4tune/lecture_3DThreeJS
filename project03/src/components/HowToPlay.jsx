import { Text, Text3D } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useSetRecoilState } from "recoil";
import { isStartScene } from "../utils/atom";

export default function HowToPlay() {
  const fontUrl = "/assets/fonts/Pretendard.json";
  const setStart = useSetRecoilState(isStartScene);

  const fontStyle = {
    font: fontUrl,
    size: 0.15,
    letterSpacing: 0.01,
    height: 0.02,
    lineHeight: 1,
    fontSize: 1,
  };

  return (
    <motion.group
      position={[0.3, 0, 1]}
      rotation={[-Math.PI / 2, 0, 0]}
      animate={{
        scale: [0, 1],
        y: [-2, 0],
      }}
      transition={{
        delay: 1.5,
        duration: 0.3,
      }}
      onAnimationComplete={() => setStart(true)}
    >
      <Text3D {...fontStyle}>
        How to Play
        <meshNormalMaterial />
      </Text3D>
      <group position={[0.3, -0.5, 0]}>
        <Text3D position={[0.2, 0.1, 0]} {...fontStyle}>
          ↑
          <meshNormalMaterial />
        </Text3D>
        <Text3D position={[0, -0.1, 0]} {...fontStyle}>
          ←↓→
          <meshNormalMaterial />
        </Text3D>
      </group>
    </motion.group>
  );
}

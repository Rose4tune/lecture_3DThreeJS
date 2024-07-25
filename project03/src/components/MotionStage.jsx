import { Html, useGLTF, useTexture } from "@react-three/drei";
import Picture from "./Picture";
import { useRef } from "react";
import { useBox } from "@react-three/cannon";
import { motion } from "framer-motion-3d";
import { stage1 } from "../utils/atom";
import { useRecoilValue } from "recoil";

export default function MotionStage({ position }) {
  const { nodes, materials } = useGLTF("/assets/models/popup.glb");
  const texture = useTexture(`/assets/images/github.png`);
  const stage = useRecoilValue(stage1);

  const [ref] = useBox(
    () => ({
      args: [0.9, 0.9, 0.2],
      position,
      type: "Static",
      mass: 5,
    }),
    useRef()
  );

  const x = position[0];
  const y = position[1];
  const z = position[2];

  return (
    <group>
      <motion.mesh
        position={[x, y + 0.1, z + 1]}
        rotation-x={-Math.PI / 2}
        initial={{ scale: 0.5 }}
        animate={
          !stage
            ? {
                opacity: 0.5,
                y: [0.05, 0.5, 0.05],
                transition: {
                  duration: 2,
                  ease: "easeInOut",
                  delay: 0.3,
                  repeat: Infinity,
                },
              }
            : {
                opacity: 0.1,
                y: 0.05,
                transition: {
                  duration: 0.3,
                  ease: "easeInOut",
                },
              }
        }
      >
        <circleGeometry args={[1, 32]} />
        <meshBasicMaterial transparent color="white" opacity={0.3} />
      </motion.mesh>
      <mesh
        position={[x, y - 0.4, z + 1]}
        rotation-x={-Math.PI / 2}
        scale={0.5}
      >
        <circleGeometry args={[1, 32]} />
        <meshBasicMaterial transparent color="white" opacity={0.8} />
      </mesh>

      <group ref={ref} scale={0.3}>
        <mesh
          geometry={nodes.body.geometry}
          material={materials.Material}
          position={[0.004, 0.3, 0]}
          scale={[1.957, -1.036, 0.135]}
        />
        <Picture nodes={nodes} texture={texture} />
        {stage && (
          <Html center>
            <div className="information enter">
              <img src={`/assets/images/enter.png`} alt="enter" />
              <p>Enter</p>
            </div>
          </Html>
        )}
      </group>
    </group>
  );
}

useGLTF.preload("/assets/models/popup.glb");

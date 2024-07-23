import { Canvas } from "@react-three/fiber";
import { Ground } from "./Ground";
import { Debug, Physics } from "@react-three/cannon";
import { useControls } from "leva";
import Box from "./Box";
import Sphere from "./Sphere";
import Cylinder from "./Cylinder";

function Scene() {
  const bgValue = useControls({ bgColor: "#fff" });

  const gravity = useControls("Gravity", {
    x: { value: 0, min: -10, max: 10, step: 0.1 },
    y: { value: -9.8, min: -10, max: 10, step: 0.1 },
    z: { value: 0, min: -10, max: 10, step: 0.1 },
  });

  return (
    <>
      <Canvas camera={{ position: [0, 2, 4] }}>
        <color attach={"background"} args={[bgValue.bgColor]} />
        <Physics gravity={[gravity.x, gravity.y, gravity.z]}>
          <Debug>
            <ambientLight />
            <directionalLight position={[0, 5, 5]} />
            <Box position={[0, 1, 0]} />
            <Sphere position={[2, 1, 0]} />
            <Cylinder position={[-2, 1, 0]} />
            <Ground rotation={[-Math.PI / 2, 0, 0]} />
          </Debug>
        </Physics>
      </Canvas>
    </>
  );
}

export default Scene;
